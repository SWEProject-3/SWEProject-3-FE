import styles from './splash.module.css';

function Splash() {
  return (
    <div className={styles.splash}>
      <div className={styles.splashWrapper}>
        <p className={styles.sub}>학과 일정을 편하게 관리하는</p>
        <p className={styles.main}>Skkuduler</p>
      </div>
    </div>
  );
}

export default Splash;
