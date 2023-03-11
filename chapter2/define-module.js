// 加载本模块所依赖的另一个模块
const dependency = require('./anotherModule');

// 本模块私有函数
function log() {
  console.log(`Well done ${dependency.username}`)
}

// 导出本模块想要公布给外界的 API
module.exports.run = function() {
  log()
}