const myModule = (() => {
  const privateFoo = () => {}
  const privateBar = []

  const exported = {
    publicFoo: () => {},
    publicBar: () => {}
  }

  return exported
})();

console.log(myModule)
console.log(myModule.privateFoo, myModule.privateBar)

// 利用自执行函数(Immediately Invoked Function Expression)，这样的函数简称 IIFE，可以创建一个私有作用域，同时又可以公布一部分的变量给到外部环境。