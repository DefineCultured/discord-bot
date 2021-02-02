import NodeCache, { Key, Data } from 'node-cache'
import { ICache } from '../interfaces'

const myCache = new NodeCache({ stdTTL: 1800 })

const cache: ICache = {}

cache.get = (key: Key) => {
  return new Promise((resolve, _reject) => {
    const value = myCache.get(key)
    return resolve(value)
  })
}

cache.set = (key: Key, val: Data, ttl?: Key) => {
  return new Promise((resolve, _reject) => {
    const value = myCache.set(key, val, ttl)
    return resolve(value)
  })
}

cache.del = (key: Key) => {
  return new Promise((resolve, _reject) => {
    const value = myCache.del(key)
    return resolve(value)
  })
}

export default cache
