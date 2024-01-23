import axios from 'axios'
let axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    "Accept": 'application/json',
  }
});
axiosInstance.interceptors.request.use(function (config) {
  console.log('-----------------request-----------')
  console.log('Route', config.url)
  console.log('data', config.data)
  console.log('params', config.params)
  console.log('statusCode', config.statusCode)
  console.log('------------------------------------')
  return config
}, function (err) {
  return Promise.reject(err)
})
axiosInstance.interceptors.response.use(function (config) {
  console.log('-----------------response-----------')
  console.log('Route', config.url)
  console.log('data', config.data)
  console.log('statusCode', config.statusCode)
  console.log('------------------------------------')
  return config
})
export default axiosInstance