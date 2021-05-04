// 比赛类型
export enum MatchCategoryType {
  inplay = 'inplay',
  today = 'today',
  early = 'early',
  parlay = 'parlay'
}

// 体育类型id
export enum SportCategoryIdType {
  soccer= '1',
  basketball= '2',
  tennis= '3',
  volleyball= '4',
  badminton= '5',
  tableTennis= '6',
  baseball= '7',
  snooker= '8',
  iceHockey= '100'
}

// 选择比赛的参数
export enum SortMatchModeType {
  sortByTime = 1,
  sortByLeague = 2
}

// 体育玩法类型是单注还是综合过关
export enum SportsPlayType {
  single = 1,
  parlay = 2
}

// 体育比赛玩法组的id
export enum MarketGroupIdType {
  soccerHdp = '100',
  soccerCorrectScore = '110',
  soccerTotal = '120',
  soccerHt = '130',
  basketballHdp = '200',
  basketballCorrectScore = '210',
  tennisHdp = '300',
  tennisCorrectScore = '310',
  volleyballHdp = '400',
  volleyballCorrectScore = '410',
  badmintonHdp = '500',
  badmintonCorrectScore = '510',
  tableTennisHdp = '600',
  tableTennisCorrectScore = '610',
  baseballHdp = '700',
  baseballCorrectScore = '710',
  otherHdp = '10000',
  otherCorrectScore = '10010'
}



