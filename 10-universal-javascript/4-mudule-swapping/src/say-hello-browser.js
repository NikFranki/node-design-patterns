import nunjucks from 'nunjucks'

console.log(22)

const template = '<h1>Hello <i>{{name}}</i></h1>'
export function sayHello(name) {
  return nunjucks.renderString(template, { name })
}