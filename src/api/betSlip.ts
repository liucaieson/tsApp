import { httpPost } from '@/utils/axios'
import { OddsType } from '@/types/oddsTypes';
import { SportsPlayType } from '@/types/sports';

interface BetSlipPollType {
  outcomeList: {oddsType: OddsType, outcomeId: string}
}

interface BetPayloadItem {
  isLive: boolean;
  oddsType: OddsType;
  odds: number;
  outcomeId: string
}

interface BetPayload {
  acceptBetterOdds: boolean;
  betAmount: number;
  betId: string;
  betType: SportsPlayType;
  browserFingerprintId: string;
  selections: Array<BetPayloadItem>
}

// 下注
export function submitOrder (params: BetPayload) {
  return httpPost({
    url: '/bet/submit',
    data: {
      ...params
    }
  })
}

// 购物车轮询
export function betSlipPoll (params: BetSlipPollType) {
  return httpPost({
    url: '/bet/shoppingCartPoll',
    data: {
      ...params
    },
    routeChangeCancel: true
  })
}
