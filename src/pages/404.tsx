import styles from './401.less';

export default function Page404() {
  return (
    <div className={styles.noAuthPage}>
      <div className={styles.noBox}>
        <div className={styles.noAuthPageIcon} />
        <div className={styles.textH2}>
          404
        </div>
      </div>
    </div>
  );
}
