import { httpGet, httpPost } from '@/utils/axios'

import  { GlobalQueryParams }  from './index'
import { MatchCategoryType, SportCategoryIdType,  MarketGroupIdType  } from '@/types/sports'
import { OddsType } from '@/types/oddsTypes';

interface TournamentsParams {
  marketGroupId: number,
  highlight: boolean,
  sportCategoryId: number,
  matchCategory: MatchCategoryType
}

interface MatchListParamsType {
  dateOffset?: number,
  highlight: boolean,
  marketGroupId:  MarketGroupIdType
  matchCategory: MatchCategoryType,
  oddsType: OddsType
  sportCategoryId: SportCategoryIdType
}

interface TotalMarketListParamsType {
  matchId: string,
  sportCategoryId: SportCategoryIdType,
  oddsType: OddsType
}

// 请求联赛
export function tournaments (params: TournamentsParams) {
  return httpGet({
    url: '/tournament/tournaments',
    data: {
      ...params
    }
  })
}

// 获取比赛主要展示接口
export function matchOdds (params: MatchListParamsType, query:GlobalQueryParams) {
  return httpPost({
    url: '/match/todayMatchList',
    data: {
      ...params
    },
    params: query,
    routeChangeCancel: true
  })
}

// 获取早盘比赛主要展示接口
export function earlyMatchOdds (params: MatchListParamsType, query:GlobalQueryParams) {
  return httpPost({
    url: '/match/earlyMatchList',
    data: {
      ...params
    },
    params: query,
    routeChangeCancel: true
  })
}

// 获取滚球比赛主要展示接口
export function inPlayMatchOdds (params: MatchListParamsType, query:GlobalQueryParams) {
  return httpPost({
    url: '/match/inPlayMatchList',
    data: {
      ...params
    },
    params: query,
    routeChangeCancel: true
  })
}

// 获取综合过关比赛主要展示接口
export function parlayMatchOdds (params: MatchListParamsType, query:GlobalQueryParams) {
  return httpPost({
    url: '/match/parlayMatchList',
    data: {
      ...params
    },
    params: query,
    // 确认切换路由可以取消的请求
    routeChangeCancel: true
  })
}

// 获取这场比赛的所有盘口
export function matchAllMarket (params: TotalMarketListParamsType) {
  return httpGet({
    url: '/match/totalMarketList',
    data: {
      ...params
    }
  })
}

// 直播表盘口接口
export function liveBetList (params: TotalMarketListParamsType) {
  return httpPost({
    url: '/match/liveBetList',
    data: {
      ...params
    }
  })
}
