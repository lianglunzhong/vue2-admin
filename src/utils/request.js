import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('error' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
