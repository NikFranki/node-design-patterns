import { totalSales as totalSalesRaw } from './totalSales.js'

const CANCEL_TTL = 30 * 1000
const cache = new Map()

export function totalSales(product) {
  if (cache.has(product)) {
    console.log('Cache hit')
    return cache.get(product)
  }

  const resultPromise = totalSalesRaw(product)
  cache.set(product, resultPromise)
  resultPromise.then(() => {
    setTimeout(() => {
      cache.delete(product)
    }, CANCEL_TTL)
  }).catch(() => {
    cache.delete(product)
  })

  return resultPromise
}