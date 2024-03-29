export function levelSubscribe(db) {
  db.subscribe = function(pattern, listener) {
    db.on('put', (key, val) => {
      const match = Object.keys(pattern).every((k) => pattern[k] === val[k])
      if (match) {
        listener(key, val)
      }
    })
  }
}