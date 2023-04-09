export function asyncRoutine(label) {
  console.log(`Starting async routine ${label}`)
  return new Promise((resolve, reject) => {
    console.log(`Async routine ${label} completed`)
    setTimeout(resolve(`Async routine ${label} result`), 100)
  })
}