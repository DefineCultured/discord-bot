import axios from 'axios'
import { IStock } from '../interfaces'
import 'dotenv/config'

const API_URL = 'https://finnhub.io/api/v1/'

const StockAPI: IStock = {}

StockAPI.get = async (symbol: string) => {
  return new Promise((resolve, _reject) => {
    const response = axios.get(`${API_URL}quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`)
    return resolve(response)
  })
}

export default StockAPI
