import axios from 'axios'
import { ICrypto } from '../interfaces'

const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'

const CryptoAPI: ICrypto = {}

CryptoAPI.get = async (symbol: string) => {
  return new Promise((resolve, _reject) => {
    const response = axios.get(`${API_URL}?symbol=${symbol}`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
      }
    })
    return resolve(response)
  })
}

export const get = (symbol: string): any => {
  return new Promise((resolve, _reject) => {
    const response = axios.get(`${API_URL}?symbol=${symbol}`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
      }
    })
    return resolve(response)
  })
}

export default CryptoAPI
