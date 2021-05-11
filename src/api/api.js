import axios from 'axios'
import apiUrl from './url'
import Vue from 'vue'
import store from '../store'

axios.defaults.baseURL = apiUrl.apiUrl
axios.defaults.timeout = 6000
axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

Vue.prototype.$cancle_axios = []
axios.interceptors.request.use(config => {
  config.cancelToken = new axios.cancelToken(cancle => {
    Vue.prototype.$cancle_axios.push(cancle)
  })
})

// 触发axios取消事件
Vue.prototype.$cancelAxios = () => {
  Vue.prototype.$cancle_axios.forEach((element, index) => {
    element('cancel');
    delete Vue.prototype.$cancle_axios[index];
  });
};

// 请求方法
const request = (method, params, api, tokenBasic = false) => {
  let sendMethod
  if (store.state.TOKEN) { // token
    axios.defaults.headers.Authorization = store.state.TOKEN;
  }
  switch (method) {
    case 'get' || 'GET': // GET请求方式
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      break;
    case 'file': // 文件上传请求
      axios.defaults.headers['Content-Type'] = 'multipart/form-data';
      break;
    default: // 其他请求方式
      axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
      break;
  }
  method = method.toLowerCase()
  if (/^get$/i.test(method)) {
    sendMethod = axios[method](api, {
      params: params
    })
  } else if (/^delete$/i.test(method)) {
    sendMethod = axios.delete(api, {params})
  } else if (/^(post|file)$/i.test(method)) {
    sendMethod = axios.post(api, params)
  } else if (/^put$/i.test(method)) {
    sendMethod = axios[method](api, params)
  }

  return new Promise ((resolve, reject) => {
    sendMethod.then(res => {
      if (res.data.code === 200) {
        resolve(res.data)
      } else {
        //
      }
    }).catch((res) => {
      if (res.message === 'cancel') {
        resolve('cancel');
        return;
      }
      resolve('error');
      if (res.toString().includes('500')) {
        message('服务器错误：500');
      }
      if (res.toString().includes('503')) {
        message('服务器错误：503');
      }
      if (res.toString().includes('401')) {
        resolve('error');
        loginOutDataClear();
      }
      if (res.toString().includes('timeout')) {
        message('请求超时，请检查网络...');
      } else if (res.toString().includes('Network Error')) {
        message('连接服务器失败，请重试...');
      } else {
        reject(res);
      }
    });
  })
}

export default request

