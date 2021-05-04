import { httpGet, httpPost } from '@/utils/axios'
export * from './order'
export * from './message'
export * from './gameResult'
export * from './betSlip'
export * from './market'
export * from './live'
export * from './quciklyBet'

export interface GlobalQueryParams {
  limit?: number,
  page?: number,
  sort?: number,
}

interface SportMenuParams {
  dateTime: string
}

export function getUserInfo () {
  return httpGet({
    url: '/user/userInfo'
  })
}

// 用户余额
export function getUserBalance () {
  return httpGet({
    url: '/user/balance'
  })
}

// 用户登录
export function userLogin (params: string) {
  return httpPost({
    url: '/user/logIn',
    data: {
      accessCode: params
    }
  })
}

// 用户登录
export function userLogout (params: string) {
  return httpPost({
    url: '/user/logOut',
    data: {
      accessCode: params
    }
  })
}

export function getAllSportsMenu (params: SportMenuParams) {
  return httpGet({
    url: '/sport/allSport',
    data: {
      ...params
    }
  })
}

// 获取美东时间
export function getBetDate () {
  return httpGet({
    url: '/sport/pc/betDate'
  })
}
