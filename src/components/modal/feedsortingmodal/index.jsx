import React, { useState, useRef, useEffect } from 'react';
import styles from './feedsortingmodal.module.css';

function FeedSortingModal({ onClose }) {
  const sortingTypes = [
    { label: '최신순', value: 'latest' },
    { label: '좋아요 순', value: 'likes' },
    { label: '댓글 많은 순', value: 'comments' },
  ];

  const [activeSorting, setActiveSorting] = useState(sortingTypes[0].value);

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

  // 정렬 타입 선택 시
  const handleSelectSorting = (type) => {
    setActiveSorting(type.value); // 선택한 정렬 옵션 상태 업데이트
    onClose(type.value); // 부모 컴포넌트로 정렬 값 전달 후 닫기
  };

  return (
    <div className={styles.modal} ref={modalRef}>
      <div className={styles.modalHeader}>
        <span className={styles.title}>정렬 순서 선택</span>
      </div>
      <div className={styles.inputWrapper}>
        {sortingTypes.map((type) => (
          <div
            key={type.value}
            onClick={() => handleSelectSorting(type)}
            className={`${styles.sortingTypeWrapper} ${activeSorting === type.value ? styles.active : ''}`}
          >
            {type.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedSortingModal;
