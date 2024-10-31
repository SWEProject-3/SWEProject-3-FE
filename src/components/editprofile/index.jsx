import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backIcon from '@/assets/editprofile/back.svg';
import editIcon from '@/assets/editprofile/edit.svg';
import arrowIcon from '@/assets/editprofile/arrow.svg';
import deletionIcon from '@/assets/editprofile/deletion.svg';
import styles from './editprofile.module.css';

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = location.state;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          onClick={() => navigate('/my')}
          src={backIcon}
          className={styles.icon}
          alt='Go Back'
        />
        <h1 className={styles.title}>내 정보 수정</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.profileSection}>
            <div className={styles.imageContainer}>
              <img src={user.profileImage} alt='Profile' />
              <button className={styles.editButton}>
                <img src={editIcon} />
              </button>
            </div>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
          </div>

          <div className={styles.menuList}>
            <a
              onClick={() => navigate('/reset-password')}
              className={styles.menuItem}
            >
              <span>비밀번호 재설정</span>
              <img src={arrowIcon} alt='Arrow' />
            </a>
            <a onClick={() => navigate('/log-out')} className={styles.menuItem}>
              <span>로그아웃</span>
              <img src={arrowIcon} alt='Arrow' />
            </a>
          </div>
        </div>

        <button className={styles.deleteAccount}>
          <span className={styles.deleteitem}>회원탈퇴</span>
          <img
            src={deletionIcon}
            alt='Delete Account'
            className={styles.deleteitem}
          />
        </button>
      </main>
    </div>
  );
}

export default EditProfile;
