import { httpPost } from '@/utils/axios'

interface LiveListParams {
  currentTime: string,
  sportCategoryId: number
}
// 获取视频列表
export function queryLiveList (params: LiveListParams) {
  return httpPost({
    url: '/match/liveList',
    data: {
      ...params
    }
  })
}
