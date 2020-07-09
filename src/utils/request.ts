// @ts-nocheck
import axios from 'axios'
import { sToken } from '@/utils/storage'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 120000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = sToken.get()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // if the custom code is not 20000, it is judged as an error.
    if (response.status === 200) {
      if (response.request.responseURL.includes('/api/')) {
        if (response.data.code === 20000) return response.data.data
        else throw new Error(response.data.msg)
      } else {
        return response.data
      }
    } else {
      return Promise.reject(new Error(response.data.msg || 'Error'))
    }
  },
  error => Promise.reject(error)
)

export default service
