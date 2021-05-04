import styles from './401.less';

export default function Page401() {
  return (
    <div className={styles.noAuthPage}>
      <div className={styles.noBox}>
        <div className={styles.noAuthPageIcon} />
        <div className={styles.textH2}>
          认证已经过期，请从平台重新登录
        </div>
      </div>
    </div>
  );
}
