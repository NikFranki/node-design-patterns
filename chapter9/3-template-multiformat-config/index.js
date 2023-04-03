import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { JsonConfig } from './jsonConfig.js'
import { IniConfig } from './iniConfig.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
  const jsonConfig = new JsonConfig()
  await jsonConfig.load(__dirname + '/samples/conf.json')
  jsonConfig.set('nodejs', 'design patterns')
  await jsonConfig.save(__dirname + '/samples/conf_mod.json')

  const iniConfig = new IniConfig()
  await iniConfig.load(__dirname + '/samples/conf.ini')
  iniConfig.set('nodejs', 'design patterns')
  await iniConfig.save(__dirname + '/samples/conf_mod.ini')
}

main()