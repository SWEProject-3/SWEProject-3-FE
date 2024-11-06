import { useState } from 'react';
import EditProfile from '@/components/editprofile';
import styles from './page.module.css';
import Footer from '@/components/footer';
import ChangePWModal from '@/components/modal/changepwmodal';

function Home() {
  const [isChangePWClicked, setIsChangePWClicked] = useState(false);

  const onClickChangePWClose = () => {
    setIsChangePWClicked(false);
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <EditProfile onOpenChangePWModal={() => setIsChangePWClicked(true)} />
        {isChangePWClicked && <ChangePWModal onClose={onClickChangePWClose} />}
      </div>
      <Footer />
    </>
  );
}

export default Home;
