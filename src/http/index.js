import axios from 'axios'
axios.defaults.baseURL = 'http://139.224.190.233:9012/'
// if (sessionStorage['token']) {
//     axios.defaults.headers.common['X-Auth-Token'] = JSON.parse(sessionStorage.getItem('token'))
// }
import config from './axios.config'
import { setInerceptors } from './axios.interceptors.config'

const axiosInstance = axios.create(config)
setInerceptors(axiosInstance)
export default axiosInstance
