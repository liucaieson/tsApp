import { httpGet } from '@/utils/axios'

// 持久化快捷下注金额
export function  modifyQuickBetAmount (params: { isOpen: boolean }) {
  return httpGet({
    url: '/user/modifyQuickBetAmount',
    data: {
      ...params
    }
  })
}

// 持久化快捷下注状态
export function modifyQuickBetSwitchStatus (params: { amount: number }) {
  return httpGet({
    url: '/user/modifyQuickBetSwitchStatus',
    data: {
      ...params
    }
  })
}
