import React from 'react';
import { useLocation } from 'react-router-dom';
import EditProfile from '@/components/editprofile';
import styles from './page.module.css';
import Footer from '@/components/footer';

function Home() {
  const location = useLocation();
  const profileData = location.state?.profileData || {
    name: '기본 사용자',
    email: 'default@example.com',
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <EditProfile user={profileData} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
