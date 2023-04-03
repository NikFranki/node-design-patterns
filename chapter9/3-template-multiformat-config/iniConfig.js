import ini from 'ini'
import { ConfigTemplate } from './configTemplate.js'

export class IniConfig extends ConfigTemplate {
  _deserialize(data) {
    // 反序列化
    return ini.parse(data)
  }

  _serialize(data) {
    // 序列化
    return ini.stringify(data)
  }
}