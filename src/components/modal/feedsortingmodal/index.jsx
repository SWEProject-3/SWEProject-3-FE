import React, { useState, useRef, useEffect } from 'react';
import styles from './feedsortingmodal.module.css';

function FeedSortingModal({ onClose }) {
  const sortingTypes = ['최신순', '오래된 순', '인기 순'];
  const [activeSorting, setActiveSorting] = useState(sortingTypes[0]);

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // 모달 닫기 함수 호출
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.modal} ref={modalRef}>
      <div className={styles.modalHeader}>
        <span className={styles.title}>정렬 순서 선택</span>
      </div>
      <div className={styles.inputWrapper}>
        {sortingTypes.map((type) => (
          <div
            key={type}
            onClick={() => setActiveSorting(type)}
            className={`${styles.sortingTypeWrapper} ${activeSorting === type ? styles.active : ''}`}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedSortingModal;
