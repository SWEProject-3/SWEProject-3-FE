import React, { useState, useEffect } from 'react';
import sortingIcon from '@/assets/feed/sorting.svg';
import styles from './feed.module.css';
import FeedSortingModal from '@/components/modal/feedsortingmodal';
import { getFeedSorting } from '@/api/feedsorting'; // API 호출 함수 가져오기

function FeedComponent() {
  const [notices, setNotices] = useState([]); // 서버에서 받은 데이터를 저장
  const [isSortingBtnClicked, setIsSortingBtnClicked] = useState(false); // 정렬 버튼 상태
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    number: 0,
  }); // 페이지 정보
  const [query, setQuery] = useState(''); // 검색어
  const [sort, setSort] = useState('latest'); // 정렬 기준

  // API 데이터 로드
  const loadNotices = async (page = 0) => {
    try {
      const response = await getFeedSorting(page, query, sort);
      console.log(response);
      setNotices(response.data.data.content); // 공지 데이터 업데이트
      setPageInfo(response.data.data.page); // 페이지 정보 업데이트
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  };

  // 초기 로드 및 정렬/검색 변경 시 데이터 갱신
  useEffect(() => {
    loadNotices();
  }, [query, sort]);

  // 정렬 모달 오픈/클로즈
  const onClickSortingBtn = () => {
    setIsSortingBtnClicked(true);
  };
  const onClickSortingBtnClose = (selectedSort) => {
    if (selectedSort) {
      setSort(selectedSort); // 모달에서 선택한 정렬 기준 적용
    }
    setIsSortingBtnClicked(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.feedHeader}>
        <div className={styles.feedHeaderContent}>
          <h3 className={styles.feedHeaderTitle}>일정</h3>
          <h3 className={styles.feedHeaderCount}>{pageInfo.totalElements}개</h3>
        </div>
        <div className={styles.feedSorting}>
          <h3 className={styles.feedSortingName}>
            {sort === 'latest'
              ? '최신순'
              : sort === 'likes'
                ? '좋아요 순'
                : '댓글 많은 순'}
          </h3>
          <button
            onClick={onClickSortingBtn}
            className={styles.sortingButtonContainer}
          >
            <img className={styles.icon} src={sortingIcon} alt='sortingIcon' />
          </button>
          {isSortingBtnClicked && (
            <FeedSortingModal onClose={onClickSortingBtnClose} />
          )}
        </div>
      </div>
      <div className={styles.feedContainer}>
        <ul className={styles.feedList}>
          {notices.map((noticeItem) => (
            <li
              key={noticeItem.eventInfo.eventId}
              className={styles.noticeItem}
            >
              <div className={styles.noticeItemContent}>
                <div className={styles.noticeItemInfo}>
                  <div className={styles.noticeItemInfo2}>
                    <p className={styles.noticeItemTitle}>
                      {noticeItem.eventInfo.title}
                    </p>
                    <p className={styles.noticeItemDate}>
                      {noticeItem.eventInfo.startDateTime} ~
                      {noticeItem.eventInfo.endDateTime}
                    </p>
                  </div>
                  <div className={styles.noticeItemStats}>
                    <p className={styles.likes}>
                      ❤️ {noticeItem.eventInfo.likeCount}
                    </p>
                    <p className={styles.comments}>
                      💬 {noticeItem.eventInfo.commentCount}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* 페이지네이션 버튼 */}
        <div className={styles.pagination}>
          {pageInfo.number > 0 && (
            <button onClick={() => loadNotices(pageInfo.number - 1)}>
              Previous
            </button>
          )}
          {pageInfo.number < pageInfo.totalPages - 1 && (
            <button onClick={() => loadNotices(pageInfo.number + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedComponent;
