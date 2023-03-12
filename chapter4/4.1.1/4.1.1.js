import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename } from './utils.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function spider(url, cb) {
  const filename = urlToFilename(url)
  fs.access(filename, err => { // (1)
    if (err && err.code === 'ENOENT') {
      console.log(`Downloading ${url} into ${filename}`)
      superagent.get(url).end((err, res) => { // (2)
        if (err) {
          cb(err)
        } else {
          mkdirp(path.dirname(filename), err => { // (3)
            if (err) {
              cb(err)
            } else {
              fs.writeFile(__dirname + filename, res.text, err => { // (4)
                if (err) {
                  cb(err)
                } else {
                  cb(null, filename, true)
                }
              })
            }
          })
        }
      })
    } else {
      cb(null, filename, false)
    }
  })
}

// (1) 检查这个网址所对应的内容是不是已经下载过了。code 的属性是 ENOENT，意味着文件不存在，可以创建一个新的文件
// (2) 如果找不到这个文件，把 url 所表示的网页下载下来
// (3) 确保响应的目录用来承接下载下来的内容
// (4) 把 HTTP 响应消息的主体内容写入文件系统