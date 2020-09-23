const transRes = data => data
const transReq = data => data
const config = {
  transformRequire: [transReq],
  transformResponse: [transRes],
  timeout: 5000,
  // 跨域携带cookie
  withCredentials: true,
  responseType: 'json'
}
export default config
