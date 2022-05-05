import axios from 'axios'
import qs from 'qs'
import { IURL } from '../interfaces'

const API_URL = process.env.YOURLS_API_URL

const UrlAPI: IURL = {}

UrlAPI.shorten = async (url: string, keyword?: string) => {
  const params = qs.stringify({
    signature: process.env.YOURLS_TOKEN,
    action: 'shorturl',
    format: 'json',
    keyword: keyword || null,
    url
  })

  return new Promise((resolve, _reject) => {
    const response = axios.get(`${API_URL}?${params}`)
    return resolve(response)
  })
}

export default UrlAPI
