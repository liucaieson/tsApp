import { httpPost, httpGet } from '@/utils/axios'
import { GlobalQueryParams } from '@/api/index';


// 账变记录
export function getStatement (params:any) {
  return httpPost({
    url: '/client/account/flows',
    data: {
      ...params
    }
  })
}

// 查询账户历史列表
export function accountHistory (params:any, query: GlobalQueryParams) {
  return httpPost({
    url: '/order/accountHistory',
    data: {
      ...params
    },
    params: query
  })
}

// 查询账户历史统计列表
export function accountHistoryStat (params: {createDay: string, endDay: string}, query: GlobalQueryParams) {
  return httpPost({
    url: '/order/accountHistoryStatistics',
    data: {
      ...params
    },
    params: query
  })
}

// 查询账户历史统计列表
export function transactionStatus (params: {offset:number, orderStatus:null | string[]}, query: GlobalQueryParams) {
  return httpPost({
    url: '/order/transactionStatus',
    data: {
      ...params
    },
    params: query
  })
}

// 查询已结算注单列表
export function settledBet () {
  return httpPost({
    url: '/order/settledBet'
  })
}

// 查询未结算注单列表
export function unsettledBet () {
  return httpPost({
    url: '/order/unsettledBet'
  })
}
