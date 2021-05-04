import { useState, FC, useEffect } from 'react'
import { useIntl, History } from 'umi';
import { GlobalModelState, ConnectRC, Loading, connect, ConnectProps, Dispatch } from 'umi';
import styles from './UserProfiles.less'

interface PageProps{
  global: GlobalModelState;
  loading: boolean;
  dispatch: Dispatch;
}

const UserProfile: FC<PageProps> = ({ global, loading, dispatch }) => {
  const { userName, balance, currency  } = global
  const [listVisible, setListVisible] = useState(false)
  const [balanceVisible, setBalanceVisible ] = useState(true)
  const intl = useIntl();
  const toggleList = () => {
    setListVisible(!listVisible)
  }
  const toggleBalanceVisible = () => {
    setBalanceVisible(!balanceVisible)
  }

  const logout = () => {
    dispatch({
      type: 'global/getUserInfo'
    })
  }

  const getBalance = () => {
    dispatch({
      type: 'global/fetchUserInfo'
    })
  }
  return (
    <div className={styles.user}>
      <svg  className={styles['user-icon'] + ' icon'} onClick={toggleList} aria-hidden="true">
        <use xlinkHref="#custom-icon-gerenzhongxin">
        </use>
      </svg>
      {
        listVisible &&  <div className={styles['select-list']} >
          <div className={styles.item} onClick={toggleBalanceVisible}>
            {
              balanceVisible ?
                intl.formatMessage({
                  id: 'header.hideBalance'
                }) :
                intl.formatMessage({
                  id: 'header.showBalance'
                })
            }
          </div>
          <div className={styles.item} onClick={logout}>
            {
              intl.formatMessage({
                id: 'header.logout'
              })
            }
          </div>
        </div>
      }
    <div className={styles.userInfo}>
      <div className={styles.name}>
        {userName}
      </div>
      {
        balanceVisible &&
        <div className={styles.balance}>
        <span className={styles.currency}>
          {currency}
        </span>
          {balance}
          <svg className={styles.refresh + ' icon'} onClick={getBalance} aria-hidden="true">
            <use xlinkHref="#custom-icon-shuaxin">
            </use>
          </svg>
        </div>
      }
  </div>
</div>
  );
}

export default connect(
  ({ global, loading }: { global: GlobalModelState; loading: Loading }) => ({
    global,
    loading: loading.models.global,
  }),
)(UserProfile);
