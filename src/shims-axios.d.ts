import axios from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    requestMark?: string,
    routeChangeCancel?: boolean
  }
}
