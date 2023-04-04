import { inflateRaw, deflateRaw } from 'zlib'
import { promisify } from 'util'

const inflatRawAsync = promisify(inflateRaw)
const deflatRawAsync = promisify(deflateRaw)

export const zlibMiddleware = function() {
  return {
    inbound(message) {
      // 反序列化
      return inflatRawAsync(Buffer.from(message))
    },
    outbound(message) {
      // 序列化
      return deflatRawAsync(message)
    }
  }
}