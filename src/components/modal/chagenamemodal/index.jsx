import React, { useState } from 'react';
import styles from './changenamemodal.module.css';
import { editName } from '@/api/userAPI';

export default function ChangeNameModal({ onClose, onConfirm }) {
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await editName(newName);
      console.log('새로운 이름:', newName);
      onConfirm(newName);
      onClose();
    } catch (error) {
      console.error('이름 변경 실패:', error);
      if (error.response) {
        // 서버가 응답을 반환한 경우
        if (error.response.status === 403) {
          setError('로그인이 만료되었습니다. 다시 로그인해주세요.');
        } else {
          setError(
            `이름 변경 실패: ${error.response.data.message || '알 수 없는 오류가 발생했습니다.'}`
          );
        }
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        setError('서버와의 통신에 실패했습니다.');
      } else {
        // 요청 설정 중에 문제가 발생한 경우
        setError('요청 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>프로필 이름 변경</h2>
        </div>
        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <input
                type='text'
                value={newName}
                onChange={handleNameChange}
                placeholder='새로운 이름을 입력해주세요.'
                className={styles.input}
                maxLength={20}
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
                className={`${styles.btn} ${styles.primaryBtn}`}
                disabled={isLoading}
              >
                {isLoading ? '처리 중...' : '변경 완료'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
