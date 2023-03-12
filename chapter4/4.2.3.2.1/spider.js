import fs from 'fs'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { getPageLinks, urlToFilename } from './utils.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function saveFile(filename, contents, cb) {
  const dirname = filename.slice(0, filename.lastIndexOf('/'))
  mkdirp(dirname, err => { // (3)
    if (err) {
      return cb(err)
    }
    fs.writeFile(filename, contents, cb)
  })
}

function download(url, filename, cb) {
  console.log(`Downloading ${url} into ${filename}`)
  superagent.get(url).end((err, res) => { // (2)
    if (err) {
      return cb(err)
    }
    saveFile(filename, res.text, err => {
      if (err) {
        return cb(err)
      }
      console.log(`Downloaded and saved: ${url}`)
      cb(null, res.text)
    })
  })
}

function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    return process.nextTick(cb)
  }

  const links = getPageLinks(currentUrl, body) // (1)
  if (links.length === 0) {
    return process.nextTick(cb)
  }

  function iterate(index) { // (2)
    if (index === links.length) {
      return cb()
    }

    spider(links[index], nesting - 1, function(err) { // (3)
      if (err) {
        return cb(err)
      }

      iterate(index + 1)
    })
  }

  iterate(0) // (4)
}

export function spider(url, nesting, cb) {
  const filename = `${__dirname}/${urlToFilename(url)}`
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err)
      }

      // 文件不存在，开始下载
      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err)
        }
        
        spiderLinks(url, requestContent, nesting, cb)
      })
    }

    // 文件存在，处理其中的链接
    spiderLinks(url, fileContent, nesting, cb)
  })
}

// (1) 用 getPageLinks() 函数获取页面的所有链接，并把它们放到一份列表里面
// (2) iterate() 函数来迭代这些链接，接受 index 参数，判断是不是已经跟 links 数组的长度相等，如果是的话，就触发 cb() 函数，因为这意味着我们已经把 links 的所有条目处理完了
// (3) 如果 index 与数组的长度不等，那么就开始处理它表示的这条链接，调用 spider() 函数，减少嵌套深度
// (4) iterate() 写好之后，通过 iterate(0) 开始迭代

// - spider
//   - fs.readFile
//     - isExist
//       - download
//         - spiderLinks
//           - iterate
//             - spider (递归执行)
//     - notExist
//       - spiderLinks
//         - iterate
//           - spider (递归执行)
