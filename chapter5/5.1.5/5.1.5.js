function promisify(callbackBasedAPI) {
  return function promises(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        (err, res) => {
          if (err) {
            return reject(err)
          }

          resolve(res)
        }
      ]
      callbackBasedAPI(...newArgs)
    })
  }
}
