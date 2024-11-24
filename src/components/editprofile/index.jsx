import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backIcon from '@/assets/editprofile/back.svg';
import editIcon from '@/assets/editprofile/edit.svg';
import exampleProfile from '@/assets/mypage/exampleprofile.svg';
import arrowIcon from '@/assets/editprofile/arrow.svg';
import deletionIcon from '@/assets/editprofile/deletion.svg';
import styles from './editprofile.module.css';
import ChangePWModal from '@/components/modal/changepwmodal/index.jsx';
import ChangeNameModal from '@/components/modal/chagenamemodal/index.jsx';
import DeleteAccountModal from '@/components/modal/deleteaccountmodal/index.jsx';

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeModal, setActiveModal] = useState(null);
  const [name, setName] = useState(location.state.name);
  const [email] = useState(location.state.email);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleDeleteAccount = () => {
    closeModal();
    localStorage.clear();
    navigate('/signin');
  };

  const handleChangeName = (newName) => {
    setName(newName);
    alert('이름이 성공적으로 변경되었습니다.');
    closeModal();
  };

  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
    localStorage.clear();
    navigate('/signin');
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
              <img src={exampleProfile} alt='Profile' />
            </div>
            <div className={styles.nameContainer}>
              <h2 className={styles.userName}>{name}</h2>
              <img
                src={editIcon}
                alt='Edit'
                className={styles.editIcon}
                onClick={() => openModal('changeName')}
              />
            </div>
            <p className={styles.userEmail}>{email}</p>
          </div>

          <div className={styles.menuList}>
            <div
              className={styles.menuItem}
              onClick={() => openModal('changePW')}
            >
              <span>비밀번호 재설정</span>
              <img src={arrowIcon} alt='Arrow' />
            </div>
            <div className={styles.menuItem} onClick={handleLogout}>
              <span>로그아웃</span>
              <img src={arrowIcon} alt='Arrow' />
            </div>
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
      {activeModal === 'changeName' && (
        <ChangeNameModal onClose={closeModal} onConfirm={handleChangeName} />
      )}
    </div>
  );
}

export default EditProfile;
