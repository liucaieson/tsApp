import UserProfile from './components/UserProfile';
import React, { FC } from 'react';
import styles from './index.less'
import { connect } from 'umi';
import { GlobalModelState } from '@/models/global';
import { Dispatch, Loading } from '@@/plugin-dva/connect';

interface PageProps{
  global: GlobalModelState;
  loading: boolean;
  dispatch: Dispatch;
}

const Header: FC<PageProps> = () => {

  return (
    <header className={styles.header}>
      <UserProfile
      />
      <h1>header 没错q ass
      q</h1>
    </header>
  );
}

export default connect(
  ({ global, loading }: { global: GlobalModelState; loading: Loading }) => ({
    global,
    loading: loading.models.global,
  }),
)(Header);

