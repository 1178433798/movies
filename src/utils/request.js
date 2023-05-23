import axios from 'axios'

export function request(config) {
  const ins = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
  })

  return ins(config)
}
