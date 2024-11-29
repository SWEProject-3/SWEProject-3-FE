import React, { useState, useEffect, useRef, useCallback } from 'react';
import sortingIcon from '@/assets/feed/sorting.svg';
import styles from './feed.module.css';
import FeedSortingModal from '@/components/modal/feedsortingmodal';
import { getFeedSorting } from '@/api/feedsorting'; // API 호출 함수 가져오기
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

function FeedComponent() {
  const [notices, setNotices] = useState([]); // 서버에서 받은 데이터를 저장
  const [isSortingBtnClicked, setIsSortingBtnClicked] = useState(false); // 정렬 버튼 상태
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    number: 0,
  }); // 페이지 정보
  const [page, setPage] = useState(0); // 현재 페이지
  const [query, setQuery] = useState(''); // 검색어
  const [sort, setSort] = useState('latest'); // 정렬 기준
  const noticeBottom = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';

  // API 데이터 로드
  const loadNotices = useCallback(async () => {
    if (pageInfo.totalPages <= page) return;

    try {
      const response = await getFeedSorting(page, searchQuery, sort);
      const newNotices = response.data.data.content;
      const newPageInfo = response.data.data.page;
      setNotices((prevNotices) => [...prevNotices, ...newNotices]);
      setPageInfo(newPageInfo);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  }, [searchQuery, sort, pageInfo.totalPages, page]);
  useEffect(() => {
    loadNotices();
  }, [page, loadNotices]);

  // 초기 로드 및 정렬/검색 변경 시 데이터 갱신
  useEffect(() => {
    setQuery(searchQuery);
    const initNotices = async () => {
      try {
        const response = await getFeedSorting(page, searchQuery, sort);
        const newNotices = response.data.data.content;
        const newPageInfo = response.data.data.page;
        setNotices(newNotices);
        setPageInfo(newPageInfo);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      }
    };
    initNotices();
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (noticeBottom.current) {
        const { scrollTop, scrollHeight, clientHeight } = noticeBottom.current;

        if (scrollTop + clientHeight >= scrollHeight - 200) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 200);

    const currentElement = noticeBottom.current;

    if (currentElement) {
      currentElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentElement) {
        currentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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

  // 공지 클릭 시 최근본공지 local storage에 저장, 페이지 이동 핸들러
  const handleClickEvent = (id) => {
    const selectedNotice = notices.find(
      (notice) => notice.eventInfo.eventId === id
    );
    if (selectedNotice) {
      let recentNotices =
        JSON.parse(localStorage.getItem('recentNotices')) || [];
      recentNotices = recentNotices.filter(
        // 중복된 공지를 제거
        (notice) => notice.eventInfo.eventId !== id
      );
      // 새로운 공지를 맨 앞에 추가, 최대 10개 유지
      recentNotices = [selectedNotice, ...recentNotices].slice(0, 10);
      localStorage.setItem('recentNotices', JSON.stringify(recentNotices));
      // 검색어를 가지고 특정 페이지로 이동
      navigate(`/feeddetail/${id}`);
    }
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
      <div className={styles.feedContainer} ref={noticeBottom}>
        <ul className={styles.feedList}>
          {notices.map((noticeItem) => (
            <li
              key={noticeItem.eventInfo.eventId}
              className={styles.noticeItem}
            >
              <div
                className={styles.noticeItemContent}
                onClick={() => handleClickEvent(noticeItem.eventInfo.eventId)}
              >
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
      </div>
    </div>
  );
}

export default FeedComponent;
