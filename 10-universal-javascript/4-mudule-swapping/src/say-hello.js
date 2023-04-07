import chalk from 'chalk'

console.log(11)

export function sayHello(name) {
  return `Hello ${chalk.green(name)}`
}