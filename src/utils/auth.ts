import { getStorage, setStorage } from './utils'

const TOKEN_KEY = 'token'

export function setToken (token: string) {
  return setStorage(TOKEN_KEY, token)
}

export function getToken () {
  return getStorage(TOKEN_KEY)
}

export function removeToken () {
  return window.localStorage.removeItem(TOKEN_KEY)
}
