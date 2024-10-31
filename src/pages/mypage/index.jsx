import PageLayout from '@/components/pagelayout';
import MyPage from '@/components/mypage';
import styles from './page.module.css';

function Home() {
  return (
    <>
      <PageLayout>
        <div className={styles.pageWrapper}>
          <MyPage />
        </div>
      </PageLayout>
    </>
  );
}

export default Home;
