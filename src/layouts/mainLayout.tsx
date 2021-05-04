import Header from '@/components/Header';
import { ReactNode, useEffect, useState } from 'react';
import useLocalStorageState from '@/hooks/useLocalStorage';
import useMount from '@/hooks/useMount';
import { getQueryString } from '@/utils/utils';
import { Dispatch, GlobalModelState, Loading } from '@@/plugin-dva/connect';
import { connect } from 'umi';

const MainLayout = (props: {children: ReactNode, dispatch: Dispatch}) => {
  const [lang, setLang] = useLocalStorageState('lang')
  const [token, setToken] = useLocalStorageState('token')
  const [oddsType, setOddsType] = useLocalStorageState('oddsType')
  const [loading, setLoading] = useState(true)

  useMount(() => {
    const accessCode = getQueryString('code')
    if (accessCode) {
      props.dispatch({
        type: 'global/loginApp',
        payload: accessCode,
        callback: (res) => {
          if (res) {
            installPage()
            window.history.pushState({}, '', '/')
            setLoading(true)
          }
        }
      })
    } else if (token) {
      installPage()
      setLoading(false)
    } else {

    }
  })

  const installPage = () => {
    if (!oddsType) {
      // 1 为欧洲赔率
      setOddsType(1)
    }
    // 没有语言默认中文
    if (!lang) {
      setLang('zh')
    }
    props.dispatch({
      type: 'global/installUserConfig'
    })
  }


  return (
    <div id="body-bg">
      {
        loading ? <div>loading</div>:
          <>
            <Header />
            <div className={'main'}>
              {
                props.children
              }
            </div>
          </>
      }
    </div>
  );
}

export default connect()(MainLayout);
