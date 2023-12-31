import axios from 'axios'
import cookie from 'js-cookie'

let downloadLoadingInstance;
// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: "http://localhost:8080",
  // 超时
  timeout: 10000
})
service.interceptors.request.use(
  config =>{
    // debugger
    // 判断cookie是否有token  如果有的话 把值取出来放到headers中
    if(cookie.get('token')) {
      config.headers['Authorization'] = 'Bearer '+ cookie.get('token');
    }
    return config
  },
  err =>{
    return Promise.reject(err);
  }
)

export default service
