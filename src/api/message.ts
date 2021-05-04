import { httpGet, httpPost, httpPut } from '@/utils/axios'
import { GlobalQueryParams } from '@/api/index';
import { AnnounceType } from '@/types/announceType';

interface AnnouncePageListParamsType {
  announceType: AnnounceType,
  content:string,
  endTime: string,
  startTime: string
}

// 查询未读消息数
export function queryUnReadMessagesNumber () {
  return httpGet({
    url: '/user/unreadMessagesNumber'
  })
}

// 查询个人重要未读消息数
export function queryUnReadMessagesWith () {
  return httpGet({
    url: '/user/unReadAnnounceStatics'
  })
}

// 查询跑马灯
export function queryMarquee (params: { timeZone: string }) {
  return httpGet({
    url: '/user/marqueeAnnounce',
    data: {
      ...params
    }
  })
}

// 查询消息
export function queryMessagesList (params: AnnouncePageListParamsType, query:GlobalQueryParams) {
  return httpPost({
    url: '/user/announcePageList',
    data: {
      ...params
    },
    params: query
  })
}

