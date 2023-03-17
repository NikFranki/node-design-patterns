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

async function download(url, filename) {
  console.log(`Downloading ${url} into ${filename}`)
  const { text: content } = await superagent.get(url)
  await mkdirpPromises(dirname(filename))
  await fsPromises.writeFile(filename, content)
  console.log(`Downloaded and saved: ${url}`)
  return content
}

async function spiderLinks(currentUrl, content, nesting) {
  if (nesting === 0) {
    return
  }

  const links = getPageLinks(currentUrl, content)
  const promises = links.map((link) => spider(link, nesting - 1))

  return Promise.all(promises)
}

const spidering = new Set()

export async function spider(url, nesting) {
  if (spidering.has(url)) {
    return Promise.resolve();
  }
  spidering.add(url)

  const filename = `${__dirname}/${urlToFilename(url)}`
  let content
  try {
    content = await fsPromises.readFile(filename, 'utf8')
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    // 文件不存在，开始下载
    content = await download(url, filename)
  }
  return spiderLinks(url, content, nesting)
}

// 使用 async awati 重构顺序执行的逻辑（不限制平行数）

