export function jsonMiddleware() {
  return {
    inbound(message) {
      // 反序列化
      return JSON.parse(message.toString())
    },
    outbound(message) {
      // 序列化
      return Buffer.from(JSON.stringify(message))
    }
  }
}