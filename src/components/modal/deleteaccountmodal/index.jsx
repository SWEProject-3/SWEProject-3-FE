import React, { useState } from 'react';
import styles from './DeleteAccountModal.module.css';
import { deleteUser } from '@/api/userAPI';

function DeleteAccountModal({ onClose, onConfirm }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await deleteUser(password);
      if (response.status === 200) {
        onConfirm();
        alert('회원 탈퇴 되었습니다.');
      } else if (response.status === 404) {
        setError('해당 유저를 찾을 수 없습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      setError('회원 탈퇴 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <input
                type='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='비밀번호를 입력하세요'
                className={styles.input}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.btnWrapper}>
              <button type='button' onClick={onClose} className={styles.btn}>
                취소
              </button>
              <button
                type='submit'
                className={`${styles.btn} ${styles.dangerBtn}`}
                disabled={isLoading}
              >
                {isLoading ? '처리 중...' : '회원 탈퇴'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
