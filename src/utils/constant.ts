
// 运动项目的名字对应的相应id
export const SPORTS_NAME_MAP = {
  soccer: '1',
  basketball: '2',
  tennis: '3',
  volleyball: '4',
  badminton: '5',
  tableTennis: '6',
  baseball: '7',
  snooker: '8',
  iceHockey: '100',
  other: '100'
}

// 参训比赛排序的参数，1代表时间 2代表联赛查询

export const SORT_MATCH_MODE = {
  sortByTime: 1,
  sortByLeague: 2
}


// 前端自定义赔率变化错误码
// 赔率变化
export const ERROR_ODDS_CHANGE_CODE = 'errorOddsChange'
// 超过最大下注数量
export const ERROR_OVER_PARLAY_NUM_CODE = 'errorOverParlayNum'
// 余额不足
export const ERROR_NO_BALANCE_CODE = 'errorNoBalance'
// 超过最大下注额
export const ERROR_OVER_MAX_BET_AMOUNT_CODE = 'errorMaxBetAmountLimit'
// 低于下注限额
export const ERROR_UNDER_AMOUNT_CODE = 'errorUnderAmount'
// 低于下注限额
export const ERROR_UNDER_MIN_AND_MAX_AMOUNT_CODE = '-232220'
// 超过最大返奖额
export const ERROR_OVER_MAX_REBATE_AMOUNT_CODE = '-232200'

// 超过最大下注金额的mts状态码
export const MTS_CODE_OVER_MAX_BET_AMOUNT = [
  -701,
  -702,
  -703,
  -711,
  -712,
  -713,
  -721,
  -722,
  -723,
  -511,
  -512,
  -318
]

// 运动id对应的运动
export const SPORTS_ID_MAP = {
  1: 'soccer',
  2: 'basketball',
  3: 'tennis',
  4: 'volleyball',
  5: 'badminton',
  6: 'tableTennis',
  7: 'baseball',
  8: 'snooker',
  100: 'other'
}

// 盘口组id对应的玩法，用来做路由
export const MARKET_TYPE_MAP = {
  100: 'hdp',
  110: 'correctScore',
  120: 'total',
  130: 'ht',
  140: 'outright',
  200: 'hdp',
  210: 'correctScore',
  240: 'outright',
  300: 'hdp',
  310: 'correctScore',
  340: 'outright',
  400: 'hdp',
  410: 'correctScore',
  440: 'outright',
  500: 'hdp',
  510: 'correctScore',
  540: 'outright',
  600: 'hdp',
  610: 'correctScore',
  640: 'outright',
  700: 'hdp',
  710: 'correctScore',
  740: 'outright',
  800: 'hdp',
  810: 'correctScore',
  840: 'outright',
  10000: 'hdp',
  10010: 'correctScore',
  10040: 'outright'
}

// 自定义购物车注单状态
// 下注结束显示弹层, 1代表成功订单， 2代表失败订单，3代表待确认订单， 4代表预校验失败， 5代表投注确认中, 0正常状态不展示
export const CUSTOM_ORDER_STATUS = {
  success: 1,
  fail: 2,
  confirmed: 3,
  preCheckFail: 4,
  opening: 5,
  normal: 0
}

// 盘口组id对应的玩法，用来做路由
export const SPORTS_MARKET_MAP = {
  soccer: '100',
  basketball: '200',
  tennis: '300',
  volleyball: '400',
  badminton: '500',
  tableTennis: '600',
  baseball: '700',
  snooker: '800',
  other: '10000'
}

// 所有的角球和反派的盘口id
export const CORNER_AND_BOOKING_MARKET_ID_GROUP = [
  '162', '163', '164', '165', '166', '167', '168', '169', '170', '171', '172', '173', '174',
  '175', '176', '177', '178', '179', '180', '181', '182', '183', '565', '566', '567', '568',
  '569', '570', '571', '572', '573', '574', '575', '576', '577', '578', '579', '580', '581',
  '582', '583', '584', '585', '601', '602', '755', '884',
  '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '149', '150', '151',
  '152', '153', '154', '155', '156', '157', '158', '586', '587', '591', '592', '596', '597',
  '885'
]

// 所有的让球盘id
export const HANDICAP_MARKET_ID_GROUP = ['14', '16', '65', '66', '87', '88', '117', '120', '165', '176', '187', '188', '203',
  '223', '224', '231', '237', '246', '254', '256', '257', '275', '280', '303', '309', '317',
  '326', '327', '331', '365', '366', '371', '383', '408', '410', '411', '445', '460', '476',
  '477', '485', '486', '493', '500', '527', '555', '567', '574', '581', '614', '627', '717',
  '729', '730', '744', '746', '1007', '1024', '1029', '1036', '1117']

// 投注历史中的输赢结果的颜色
export const WIN_LOSE_COLOR_MAP = {
  1: '#EE9E00', // 待确认
  2: '#269042', // 确认
  3: '#6f6f6f', // 未结算
  4: '#232323', // 注单取消
  5: '#EA5139', // 注单失败
  11: '#269042', // 赢
  12: '#EA5139', // 输
  13: '#269042', // 半赢
  14: '#ea5139', // 半输
  15: '#6f6f6f' // 注单平局
}

// 盘口类型是单注还是综合过关
export const MARKET_TYPE_IS_SINGLE_OR_PARLAY = {
  single: 1,
  parlay: 2
}

// 菜单中的iconmap
export const SPORT_ICON_MAP = {
  1: '#custom-icon-zuqiu1',
  2: '#custom-icon-lanqiu1',
  3: '#custom-icon-wangqiu',
  4: '#custom-icon-paiqiu2',
  5: '#custom-icon-yumaoqiu1',
  6: '#custom-icon-PingPong',
  7: '#custom-icon-bangqiu1',
  100: '#custom-icon-xianxingjiangpaitubiao1'
}
// 全局常用的map
export const COMMON_ICON_MAP = {
  clock: '#custom-icon-shijian',
  champion: '#custom-icon-trophy'
}

// 语言map = {
export const LANG_MAP = {
  chinese: 'ZH',
  english: 'EN',
  // 印尼语
  indonesian: 'ID',
  // 越南语
  vietnamese: 'VI',
  // 泰语
  thai: 'TH',
  // 印地语
  hindi: 'HI',
  // 韩语
  korean: 'KO',
  // 日语
  japanese: 'JA',
  // 繁体中文
  traditional: 'ZHT'
}
