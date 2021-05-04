import axios, {AxiosRequestConfig, Canceler} from 'axios'
import { getToken } from '@/utils/auth'
import { getStorage } from './utils'
import { DEV_URL } from '@/utils/config'
import qs from 'qs'

interface pangingRequestType {
  name:string,
  cancel: Canceler,
  routeChangeCancel?: boolean
}

// 用于存储目前状态为pending的请求标识信息
const pendingRequest:Array<pangingRequestType> = []
// 需要弹窗的错误码
const serviceCommonCode: number[] = [
  -100, -1100, -254110, -254130
]

const baseURL:string = DEV_URL

const errorHandle = (status: number) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // window.location.href = '/exception/401'
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      setTimeout(() => {
        // store().dispatch('user/logout')
      }, 1000)
      break
    case 503:
      // store().dispatch('global/changeError', '503')
      break
    // 404请求不存在
    case 404:
      break
  }
}

/**
 * 请求的拦截处理
 * @param config - 请求的配置项
 */
const handleRequestIntercept = (config: AxiosRequestConfig) => {
  // 区别请求的唯一标识，这里用方法名+请求路径
  // 如果一个项目里有多个不同baseURL的请求
  const requestMark = `${config.method} ${config.url}`
  // 找当前请求的标识是否存在pendingRequest中，即是否重复请求了
  const markIndex = pendingRequest.findIndex(item => {
    return item.name === requestMark
  })
  // 存在，即重复了
  if (markIndex > -1) {
    // 取消上个重复的请求
    pendingRequest[markIndex].cancel()
    // 删掉在pendingRequest中的请求标识
    pendingRequest.splice(markIndex, 1)
  }
  // （重新）新建针对这次请求的axios的cancelToken标识
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  config.cancelToken = source.token
  // 设置自定义配置requestMark项，主要用于响应拦截中
  config.requestMark = requestMark
  // 记录本次请求的标识
  pendingRequest.push({
    name: requestMark,
    cancel: source.cancel,
    routeChangeCancel: config.routeChangeCancel // 可能会有优先级高于默认设置的routeChangeCancel项值
  })
  if (config.method === 'get') {
    config.paramsSerializer = function(params) {
      return qs.stringify(params, { arrayFormat: 'indices' })
    }
  }
  const token = getToken()
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`
    config.headers.accessCode = `${token}`
    config.headers.lang = getStorage('lang') || 'ZH'
  }
  return config
}

/**
 * 响应的拦截处理
 * @param config - 请求的配置项
 */
const handleResponseIntercept = (config: AxiosRequestConfig) => {
  // 根据请求拦截里设置的requestMark配置来寻找对应pendingRequest里对应的请求标识
  const markIndex = pendingRequest.findIndex(item => {
    return item.name === config.requestMark
  })
  // 找到了就删除该标识
  markIndex > -1 && pendingRequest.splice(markIndex, 1)
  return config
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 默认把请求视为切换路由就会把pending状态的请求不取消
axiosInstance.defaults.routeChangeCancel = false

axiosInstance.interceptors.request.use(handleRequestIntercept,
  error => {
    return Promise.reject(error)
  })

axiosInstance.interceptors.response.use(response => {
  handleResponseIntercept(response.config)
  const code = response.data.code
  if (response.status >= 200 && response.status < 300 && response.data && code === 0) {
    return response.data
  } else if (code) {
    // 如果code包含在服务错码里面则打印出错误，不包含则是正常错误
    if (serviceCommonCode.includes(code)) {
      // store().dispatch('global/changeError', code)
      console.log('URL:' + response.request.responseURL + '\nMESSAGE:  ' +
        response.data.message + '\nCODE:   ' + response.data.code)
    } else if (code === -254131) {
      // 非白名单用户跳转维护页面
      // store().dispatch('user/systemMaintenance', response.data.requestUrl)
    } else {
      // console.log('URL:' + response.request.responseURL + '\nMESSAGE:  ' + response.data.message + '\nCODE:   ' + response.data.code)
    }
    return response.data
  } else {
    // console.log('URL:' + response.request.responseURL + '\nMESSAGE:  ' + response.data.message + '\nCODE:   ' + response.data.code)
    return response.data
  }
}, error => {
  const { response } = error
  const errorFormat = {}
  if (response) {
    // 请求已发出，但是不在2xx的范围
    handleResponseIntercept(response.config)
    errorHandle(response.status)
    return Promise.reject(response)
  } else {
    // 如果是主动取消了请求，做个标识
    if (axios.isCancel(error)) {
      // errorFormat.selfCancel = true
      // console.log(errorFormat)
      return Promise.reject(errorFormat)
    }
    // 处理断网的情况
    if (!window.navigator.onLine) {
      // store().dispatch('global/changeError', 'netError')
    } else {
      // 其他错误处理
      return Promise.reject(error)
    }
  }
})


export function httpGet ({
                           url,
                           data = {},
                           routeChangeCancel = false
}: AxiosRequestConfig) {
  const newUrl =  url ? url : ''
  return new Promise((resolve, reject) => {
    axiosInstance.get(newUrl, {
      params: data,
      // 确认切换路由可以取消的请求
      routeChangeCancel
    }).then((res) => {
      if (res) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

// post请求
export function httpPost ({
  url,
  data = {},
  params = {},
  // 确认切换路由可以取消的请求
  routeChangeCancel = false
}: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: 'post',
      /*  transformRequest: [function(data) {
         let ret = ''
         for (let it in data) {
           ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
         }
         return ret
       }], */
      // 发送的数据
      data,
      // url参数
      params,
      routeChangeCancel
    }).then(res => {
      if (res) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

// put请求
export function httpPut ({
  url,
  data = {},
  params = {},
  // 确认切换路由可以取消的请求
  routeChangeCancel = false
}:AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: 'put',
      /*  transformRequest: [function(data) {
         let ret = ''
         for (let it in data) {
           ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
         }
         return ret
       }], */
      // 发送的数据
      data,
      // url参数
      params,
      routeChangeCancel
    }).then(res => {
      if (res) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export {
  pendingRequest
}
