import { useState } from 'react';
import styles from './friendmodal.module.css';
import { postFriendRequest } from '@/api/friendAPI';

function FriendModal({ onClose }) {
  const [email, setEmail] = useState('');
  const handleClickAddFriend = async () => {
    if (!email) alert('이메일을 입력해주세요.');
    else {
      try {
        await postFriendRequest(email);
        onClose();
      } catch (error) {
        if (error.response.data.code === '400_009') {
          alert(error.response.data.msg);
        } else {
          alert('친구 추가에 실패했습니다.');
        }
      }
    }
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <span className={styles.title}>친구 요청</span>
      </div>
      <div className={styles.inputWrapper}>
        <input
          type='email'
          placeholder='이메일을 입력하세요.'
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={onClose}>
          닫기
        </button>
        <button className={styles.btn} onClick={() => handleClickAddFriend()}>
          친구 추가
        </button>
      </div>
    </div>
  );
}

export default FriendModal;
