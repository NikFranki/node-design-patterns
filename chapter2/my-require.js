const fs = require('fs');

// 模拟加载模块的功能，通过 eval 求值
function loadModule(filename, module, require) {
  const wrappedSrc = 
  `function(module, exports, require) {
    ${fs.readFileSync(filename, 'utf8')}
  }(module, module.exports, require)`

  eval(wrappedSrc)
}

// 模拟实现 require 函数
function require(moduleName) {
  console.log(`Required invoked for module: ${moduleName}`)
  const id = require.solve(moduleName)

  if (require.cache[id]) {
    return require.cache[id].exports
  }

  // 模块的元数据
  const module = {
    exports: {},
    id
  }

  // 更新缓存
  require.cache[id] = module

  // 载入模块
  loadModule(id, module, require)

  // 返回导出的变量
  return module.exports
}

require.cache = {}

require.resolve = (moduleName) => {
  /* 根据 moduleName 解析出完整的模块 */
}

/**
 * 代码解析
 * 1）接受用户输入的 moduleName，解析出模块的完整路径，把解析结果存放到名叫 id 的缓存变量中，解析过程依赖 require.resolve 方法
 * 2）如果模块加载过，下载读取的话，直接读取缓存的结果
 * 3）模块第一次加载，创建一个 module 对象，里面包含了路径 id，exports 作为属性，初始化为空的对象字面量，并在后续的模块导出的 API 去赋值
 * 4）缓存 module 模块
 * 5）通过 loadModule 函数从源文件中读取源代码，利用 eval 执行代码，接受刚才创建的 module 和 require 变量，可以修改或替换 module.exports 对象，从而导出自己想要的内容
 * 6）返回 module.exports
 */