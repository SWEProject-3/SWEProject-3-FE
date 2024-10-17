import EditProfile from '@/components/editprofile';
import styles from './page.module.css';
import Footer from '@/components/footer';

function Home() {
  return (
    <>
      <div className={styles.pageWrapper}>
        <EditProfile />
      </div>
      <Footer />
    </>
  );
}

export default Home;
