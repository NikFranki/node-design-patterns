import { ConfigTemplate } from './configTemplate.js'

export class JsonConfig extends ConfigTemplate {
  _deserialize(data) {
    // 反序列化
    return JSON.parse(data)
  }

  _serialize(data) {
    // 序列化
    return JSON.stringify(data)
  }
}