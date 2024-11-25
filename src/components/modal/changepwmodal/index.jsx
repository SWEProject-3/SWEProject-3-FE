import React, { useState } from 'react';
import styles from './ChangePWModal.module.css';
import { putPassword } from '@/api/authAPI';
import { useNavigate } from 'react-router-dom';

function ChangePWModal({ onClose }) {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isNewPasswordDifferent = (current, newPw) => {
    return current !== newPw;
  };

  const doNewPasswordsMatch = (newPw, confirmPw) => {
    return newPw === confirmPw;
  };

  const checkTokenValidity = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('로그인이 필요합니다.');
      return false;
    }
    console.log('현재 토큰:', token);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!checkTokenValidity()) {
      setIsLoading(false);
      return;
    }

    if (!isNewPasswordDifferent(currentPassword, newPassword)) {
      setError('새 비밀번호는 현재 비밀번호와 달라야 합니다.');
      setIsLoading(false);
      return;
    }

    if (!doNewPasswordsMatch(newPassword, confirmPassword)) {
      setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await putPassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      console.log('비밀번호 변경 성공:', response.data);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      localStorage.clear();
      navigate('/signin');
    } catch (error) {
      console.error('Error details:', error.response);

      if (error.response?.status === 403) {
        setError('현재 비밀번호가 올바르지 않습니다.');
      } else if (error.response?.status === 401) {
        setError('현재 비밀번호가 올바르지 않습니다.');
      } else {
        setError('비밀번호 변경 중 오류가 발생했습니다.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>비밀번호 변경</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              type='password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder='현재 비밀번호를 입력하세요.'
              className={styles.input}
              required
            />
            <input
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='새 비밀번호를 입력하세요.'
              className={styles.input}
              required
            />
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='새 비밀번호 확인'
              className={styles.input}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.btnWrapper}>
            <button type='button' onClick={onClose} className={styles.btn}>
              닫기
            </button>
            <button
              type='submit'
              className={`${styles.btn} ${styles.primaryBtn}`}
              disabled={isLoading}
            >
              {isLoading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePWModal;
