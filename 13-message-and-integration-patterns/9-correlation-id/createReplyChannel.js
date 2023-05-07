export function createReplyChannel(channel) {
  return function registrReplyHandler(handler) {
    channel.on('message', async (message) => {
      if (message.type !== 'request') {
        return
      }

      const replyData = await handler(message.data)
      channel.send({
        type: 'response',
        data: replyData,
        inReplyTo: message.id
      })
    })
  }
}