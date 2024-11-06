import React from 'react';
import styles from './DeleteAccountModal.module.css';

function DeleteAccountModal({ onClose, onConfirm }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>회원 탈퇴 확인</h2>
        </div>
        <div className={styles.modalContent}>
          <p>
            정말로 회원 탈퇴를 진행하시겠습니까? <br></br>이 작업은 되돌릴 수
            없습니다.
          </p>
        </div>
        <div className={styles.btnWrapper}>
          <button onClick={onClose} className={styles.btn}>
            취소
          </button>
          <button
            onClick={onConfirm}
            className={`${styles.btn} ${styles.dangerBtn}`}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
