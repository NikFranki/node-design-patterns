// import fs from 'fs'
import { promises as fsPromises } from 'fs'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { promisify } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import { getPageLinks, urlToFilename } from './utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const mkdirpPromises = promisify(mkdirp)

function download(url, filename, cb) {
  console.log(`Downloading ${url} into ${filename}`)
  let content
  return superagent.get(url)
    .then(res => { // (2)
      content = res.text
      return mkdirpPromises(dirname(filename))
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`)
      return content
    })
}

function spiderLinks(currentUrl, content, nesting) {
  let promise = Promise.resolve()
  if (nesting === 0) {
    return promise
  }

  const links = getPageLinks(currentUrl, content)
  for (const link of links) { // (3)
    promise = promise.then(() => spider(link, nesting - 1))
  }

  return promise
}

const spidering = new Set()
export function spider(url, nesting) {
  if (spidering.has(url)) {
    return Promise.resolve();
  }

  spidering.add(url)
  const filename = `${__dirname}/${urlToFilename(url)}`
  return fsPromises.readFile(filename, 'utf8')
    .catch((err) => { // (1)
      if (err.code !== 'ENOENT') {
        throw err
      }

      // 文件不存在，开始下载
      return download(url, filename)
    })
    .then((content) => spiderLinks(url, content, nesting))
}

// 1 读取该文件是否存在，如果不存在就开始下载，如果存在就继续查看其内容
// 2 下载内容并保存，首先是下载，然后创建文件夹，写入内容，写入保存完毕
// 3 读取文件内容，获取里面所有的链接，继续重复上述过程
// 所有链接均已下载完毕，即是完成
