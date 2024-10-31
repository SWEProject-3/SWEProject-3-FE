import styles from './friendmodal.module.css';

function FriendModal({ onClose }) {
  const handleClickAddFriend = () => {
    onClose();
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
        />
      </div>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={onClose}>
          닫기
        </button>
        <button className={styles.btn}>친구 추가</button>
      </div>
    </div>
  );
}

export default FriendModal;
