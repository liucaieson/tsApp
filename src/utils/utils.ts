
import { LANG_MAP } from './constant'

export const isTruth = (value: any) => value === 0 ? true : !!value

export const generateId = function () {
  return Math.floor(Math.random() * 10000)
}


// 生成uuid
export const uuid = () => {
  const tempUrl = URL.createObjectURL(new Blob())
  const uuid = tempUrl.toString()
  URL.revokeObjectURL(tempUrl)
  return uuid.substr(uuid.lastIndexOf('/') + 1)
}

/* // 获取浏览器默认语言
export const getBrowserLang = function () {
  const browserLang = navigator.language ? navigator.language : navigator.browserLanguage
  let defaultBrowserLang = ''
  if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'ZH-cn') {
    defaultBrowserLang = 'zh'
  } else {
    defaultBrowserLang = 'en'
  }
  return defaultBrowserLang
} */

// 设置localStorage
export const setStorage = function (key: string, value: any) {
  try {
    isDef(value) && window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn(e)
  }
}

// 获取localStorage
export const getStorage = function (key: string) {
  try {
    const v = window.localStorage.getItem(key)
    return v ? JSON.parse(v) : v
  } catch (e) {
    console.warn(e)
  }
}

// 移除localStorage
export const removeStorage = function (key: string) {
  localStorage.removeItem(key)
}

export const getNumberId = function (stringId: string) {
  if (stringId) {
    return stringId.replace(/[^0-9]/ig, '')
  }
  return null
}

// 根据语言转换为外部地址所需要的语言

export const langTransferToStandard = function () {
  let lang = getStorage('lang')
  switch (lang) {
    case LANG_MAP.chinese:
      lang = 'zh'
      break
    case LANG_MAP.english:
      lang = 'en'
      break
    case LANG_MAP.vietnamese:
      lang = 'vi'
      break
    case LANG_MAP.thai:
      lang = 'th'
      break
    case LANG_MAP.indonesian:
      lang = 'id'
      break
    case LANG_MAP.traditional:
      lang = 'zht'
      break
    case LANG_MAP.korean:
      lang = 'ko'
      break
    case LANG_MAP.hindi:
      lang = 'en'
      break
    case LANG_MAP.japanese:
      lang = 'ja'
      break
    default:
      lang = 'en'
  }
  return lang
}

// 负赔率输入值算下注额

/*export const calcNegativeOddsInputToBetAmount = (input: string, odds: number) => {
  const transOdds = abs(odds)
  const transNumber = +input
  return ceil(bignumber(transNumber) * bignumber(transOdds), 2)
}

// 负赔率通过最大下注算出可输入金额
export const calcNegativeOddsBetAmountToWinMoney = (maxAmount: string, odds: number) => {
  const transOdds = abs(odds)
  let transMaxAmount = 0
  transMaxAmount = +maxAmount
  return floor(divide(bignumber(transMaxAmount), transOdds)).toNumber()
}*/

export const emptyObject = Object.freeze({})

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
export function isUndef (v: any) {
  return v === undefined || v === null
}

export function isDef (v: any) {
  return v !== undefined && v !== null
}

export function isTrue (v: any) {
  return v === true
}

export function isFalse (v: any) {
  return v === false
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject (obj: any) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject (obj: any) {
  return _toString.call(obj) === '[object Object]'
}

export function isRegExp (v: any) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
export function toString (val: any) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber (val: any) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * Remove an item from an array
 */
export function remove (arr: any[], item: any) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function toArray (list: any, start: number) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

// 获取url的查询参数
export const getQueryString = (name: string) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg)
  // 获取url中"?"符后的字符串并正则匹配
  let context = ''
  if (r != null) { context = r[2] }
  return (context === null || context === '' || context === undefined) ? undefined : context
}
