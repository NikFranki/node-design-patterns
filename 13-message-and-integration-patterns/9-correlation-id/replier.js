import { createReplyChannel } from './createReplyChannel.js'

const registrReplyHandler = createReplyChannel(process)

registrReplyHandler(req => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ sum: req.a + req.b })
    }, req.delay)
  })
})

process.send('reply')