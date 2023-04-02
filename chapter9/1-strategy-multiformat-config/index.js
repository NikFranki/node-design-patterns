import { fileURLToPath } from 'url'
import { dirname } from 'path'

import { Config } from './config.js'
import { jsonStrategy, iniStrategy } from './strategies.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
  const iniConfig = new Config(iniStrategy)
  await iniConfig.load(__dirname + '/samples/conf.ini')
  iniConfig.set('book.nodejs', 'design patterns')
  await iniConfig.save(__dirname + '/samples/conf_mod.ini')

  const jsonConfig = new Config(jsonStrategy)
  await jsonConfig.load(__dirname + '/samples/conf.json')
  jsonConfig.set('book.nodejs', 'design patterns')
  await jsonConfig.save(__dirname + '/samples/conf_mod.json')
}

main()