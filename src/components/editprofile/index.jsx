import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backIcon from '@/assets/editprofile/back.svg';
import editIcon from '@/assets/editprofile/edit.svg';
import arrowIcon from '@/assets/editprofile/arrow.svg';
import deletionIcon from '@/assets/editprofile/deletion.svg';
import styles from './editprofile.module.css';
import ChangePWModal from '@/components/modal/changepwmodal/index.jsx';
import DeleteAccountModal from '@/components/modal/deleteaccountmodal/index.jsx';

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeModal, setActiveModal] = useState(null);

  const { user } = location.state;

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleDeleteAccount = () => {
    // TODO: 회원 탈퇴 API 연동
    closeModal();
    // 임시: 로그인 페이지로 리다이렉트
    //navigate('/login');
  };

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
            </div>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
          </div>

          <div className={styles.menuList}>
            <a
              className={styles.menuItem}
              onClick={() => openModal('changePW')}
            >
              <span>비밀번호 재설정</span>
              <img src={arrowIcon} alt='Arrow' />
            </a>
            <a className={styles.menuItem}>
              <span>로그아웃</span>
              <img src={arrowIcon} alt='Arrow' />
            </a>
          </div>
        </div>

        <button
          className={styles.deleteAccount}
          onClick={() => openModal('deleteAccount')}
        >
          <span className={styles.deleteitem}>회원탈퇴</span>
          <img
            src={deletionIcon}
            alt='Delete Account'
            className={styles.deleteitem}
          />
        </button>
      </main>

      {activeModal === 'changePW' && <ChangePWModal onClose={closeModal} />}
      {activeModal === 'deleteAccount' && (
        <DeleteAccountModal
          onClose={closeModal}
          onConfirm={handleDeleteAccount}
        />
      )}
    </div>
  );
}

export default EditProfile;
