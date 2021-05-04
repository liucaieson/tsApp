import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getUserInfo, userLogin, getUserBalance } from '@/api'
import useLocalStorageState from '@/hooks/useLocalStorage';
import { setStorage } from '@/utils/utils';

enum Currency {
  RMB = 'RMB',
  USD = 'USD',
  IDR = 'IDR',
  INR = 'INR',
  KRW = 'KRW',
  JPY = 'JPY',
  VND = 'VND',
  THB = 'THB'
}

enum Language {
  ZH = 'ZH',
  EN = 'EN',
  HI = 'HI',
  JA = 'JA',
  TH = 'TH',
  VI = 'VI',
  ZHT = 'ZHT',
  KO = 'KO',
  ID = 'ID'
}

export interface GlobalModelState {
  userName: string;
  currency: Currency,
  balance: number,
  language: Language,
  quickBetAmount: number,
  quickBetSwitchIsOpen: boolean,
  unsettledOrders: number
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchBalance: Effect;
    loginApp: Effect;
    installUserConfig: Effect
  };
  reducers: {
    save: Reducer<GlobalModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  }
}

const globalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    userName: '',
    currency: Currency.RMB,
    balance: 0.00,
    language: Language.ZH,
    quickBetAmount: 10,
    quickBetSwitchIsOpen: false,
    unsettledOrders: 0
  },

  effects: {
    *fetchBalance(_ , { call, put }) {
      const data  = yield call(getUserBalance)

      yield put({
        //put,必须发出action save，此action被reducer监听，从而达到更新state数据的目的
        type: 'save',
        payload: {
          balance: data.balance,
        }
      });
    },
    *loginApp({payload, callback} , { call, put }) {
      const data = yield call(userLogin, payload)
      if (data) {
        const {accessCode, userName, balance, currency, language} = data
        setStorage('token', accessCode)
        setStorage('lang', language)
        setStorage('currency', currency)
        yield put({
          //put,必须发出action save，此action被reducer监听，从而达到更新state数据的目的
          type: 'save',
          payload: {
            userName,
            balance,
            currency,
            language
          }
        });
      }
      if (callback) callback()
    },
    *installUserConfig({payload, callback} , { call, put }) {
      const data  = yield call(getUserInfo)
      if (data) {
        const {
          name,
          balance,
          currency,
          language,
          quickBetAmount,
          quickBetSwitchIsOpen,
          unsettledOrders
        } = data
        setStorage('lang', language)
        yield put({
          //put,必须发出action save，此action被reducer监听，从而达到更新state数据的目的
          type: 'save',
          payload: {
            userName: name,
            balance,
            currency,
            language,
            quickBetAmount,
            quickBetSwitchIsOpen,
            unsettledOrders
          }
        });
      }
      if (callback) callback()
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  }
};

export default globalModel;
