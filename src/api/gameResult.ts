import { httpPost, httpGet } from '@/utils/axios'
import { GlobalQueryParams } from '@/api/index';
import { SportCategoryIdType } from '@/types/sports';
// 赛果

interface MatchResultListParamsType {
  endTime: string;
  limit: number;
  // 盘口类型(1-赛事/2-冠军)
  marketType: number;
  page: number;
  sportCategoryId: SportCategoryIdType
}

// 查询消息
export function queryResult (params: MatchResultListParamsType, query:GlobalQueryParams) {
  return httpPost({
    url: '/match/matchResultList',
    data: {
      ...params
    },
    params: query
  })
}

export function queryAllMatchResult (params:{ matchId: string }) {
  return httpGet({
    url: '/match/allMatchResult',
    data: {
      ...params
    }
  })
}
