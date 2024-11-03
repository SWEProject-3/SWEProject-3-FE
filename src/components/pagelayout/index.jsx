import Header from '@/components/header';
import Footer from '@/components/footer';
import styles from './pagelayout.module.css';

function PageLayout({ children}) {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}

export default PageLayout;
