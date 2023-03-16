// import fs from 'fs'
import { promises as fsPromises } from 'fs'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { promisify } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import { getPageLinks, urlToFilename } from './utils.js'
import { TaskQueue } from './TaskQueue.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const mkdirpPromises = promisify(mkdirp)

function download(url, filename) {
  console.log(`Downloading ${url} into ${filename}`)
  let content
  return superagent.get(url)
    .then(res => {
      content = res.text
      return mkdirpPromises(dirname(filename))
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`)
      return content
    })
}

function spiderLinks(currentUrl, content, nesting, queue) {
  if (nesting === 0) {
    return Promise.resolve()
  }

  const links = getPageLinks(currentUrl, content)
  const promises = links.map(link => spiderTask(link, nesting - 1, queue))

  return Promise.all(promises)
}

const spidering = new Set()
function spiderTask(url, nesting, queue) {
  if (spidering.has(url)) {
    return Promise.resolve();
  }
  spidering.add(url)

  const filename = `${__dirname}/${urlToFilename(url)}`
  return queue
    .runTask(() => {
      return fsPromises.readFile(filename, 'utf8')
        .catch((err) => {
          if (err.code !== 'ENOENT') {
            throw err
          }

          // 文件不存在，开始下载
          return download(url, filename)
        })
    })
    .then((content) => spiderLinks(url, content, nesting, queue))
}

export function spider(url, nesting, concurrency) {
  const queue = new TaskQueue(concurrency)
  return spiderTask(url, nesting, queue)
}

// 1 读取该文件是否存在，如果不存在就开始下载，如果存在就继续查看其内容
// 2 下载内容并保存，首先是下载，然后创建文件夹，写入内容，写入保存完毕
// 3 读取文件内容，获取里面所有的链接，继续重复上述过程（注意：这里是平行执行）
// 所有链接均已下载完毕，即是完成
