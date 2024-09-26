import styles from './layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
}

export default Layout;
