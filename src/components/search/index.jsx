import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useScrollHandlers from '@/hooks/useScrollHandlers';
import styles from './search.module.css';
import backarrowIcon from '@/assets/search/backarrow.svg';
import clickbackarrowIcon from '@/assets/search/clickbackarrow.svg';
import searchIcon from '@/assets/search/search.svg';
import clicksearchIcon from '@/assets/search/clicksearch.svg';
import sampleimage from '@/assets/search/sampleimage.svg';
import { useForm } from 'react-hook-form';

function SearchComponent() {
  const { handleSubmit, register, getValues } = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [recentSearchTerm, setRecentSearchTerm] = useState([]);

  const recentSearchRef = useRef(null);
  const scrollRecentSearchHandler = useScrollHandlers(recentSearchRef);

  const [recentNotices, setRecentNotices] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const backarrowimg = url === '/' ? clickbackarrowIcon : backarrowIcon;

  // 검색어 입력 핸들러
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 이미지 클릭 시 페이지 이동 핸들러
  const handleSearchClick = (e) => {
    e.preventDefault();
    if (searchTerm) {
      let recentSearchTerms =
        JSON.parse(localStorage.getItem('recentSearchTerms')) || [];
      recentSearchTerms = [
        searchTerm, // 검색어를 맨 앞에 추가
        ...recentSearchTerms.filter((term) => term !== searchTerm), // 기존 배열에서 중복 제거
      ].slice(0, 10);

      localStorage.setItem(
        'recentSearchTerms',
        JSON.stringify(recentSearchTerms)
      );
      setIsSearchClicked(true);

      // 검색어를 가지고 특정 페이지로 이동
      navigate(`/feed?query=${searchTerm}`);
    } else {
      alert('검색어를 입력하세요.');
    }
  };

  const handleRecentSearchClick = (term) => {
    let recentSearchTerms =
      JSON.parse(localStorage.getItem('recentSearchTerms')) || [];

    // 클릭된 검색어를 맨 앞으로 이동
    recentSearchTerms = [
      term, // 클릭된 검색어를 맨 앞에 추가
      ...recentSearchTerms.filter((t) => t !== term), // 중복 제거
    ].slice(0, 10); // 최대 10개 유지

    // 업데이트된 검색어 목록 저장
    localStorage.setItem(
      'recentSearchTerms',
      JSON.stringify(recentSearchTerms)
    );

    // 검색어를 가지고 특정 페이지로 이동
    navigate(`/feed?query=${term}`);
  };

  const onSubmit = () => {
    handleSearchClick();
  };
  const savedTerm = JSON.parse(localStorage.getItem('recentSearchTerms')) || [];

  const searchimg = isSearchClicked ? clicksearchIcon : searchIcon;

  useEffect(() => {
    if (savedTerm.length > 0) {
      setRecentSearchTerm(savedTerm);
    }
  }, []);

  const handleRecentNoticeClick = (id) => {
    let recentNotices = JSON.parse(localStorage.getItem('recentNotices')) || [];
    const notice = recentNotices.find(
      (notice) => notice.eventInfo.eventId === id
    );
    recentNotices = recentNotices.filter(
      // 중복된 공지를 제거
      (notice) => notice.eventInfo.eventId !== id
    );
    // 새로운 공지를 맨 앞에 추가, 최대 10개 유지
    recentNotices = [notice, ...recentNotices].slice(0, 10);
    localStorage.setItem('recentNotices', JSON.stringify(recentNotices));
    // 검색어를 가지고 특정 페이지로 이동
    navigate(`/feeddetail/${id}`);
  };

  useEffect(() => {
    const savedNotices =
      JSON.parse(localStorage.getItem('recentNotices')) || [];
    setRecentNotices(savedNotices);
  }, []);

  return (
    <div className={styles.searchPageWrapper}>
      {/* 검색어 입력 */}
      <div className={styles.searchHeader}>
        <div onClick={() => navigate(-1)} className={styles.searchBack}>
          <img className={styles.icon} src={backarrowimg} alt='back'></img>
        </div>
        <form
          className={styles.searchContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type='text'
            value={searchTerm}
            onChange={handleInputChange}
            placeholder='검색어를 입력하세요'
            className={styles.searchInput}
          />
          <button
            onClick={handleSearchClick}
            className={styles.searchButtonContainer}
          >
            <img className={styles.icon} src={searchimg} alt='searchIcon' />
          </button>
        </form>
      </div>

      {/* 최근 검색어 */}
      <div className={styles.recentSearchContainer}>
        <h3 className={styles.recentSearchTitle}>최근 검색어</h3>
        <ul
          className={styles.recentSearchList}
          ref={recentSearchRef}
          {...scrollRecentSearchHandler}
        >
          {recentSearchTerm?.map((term, index) => (
            <li
              key={index}
              className={styles.searchItem}
              onClick={() => handleRecentSearchClick(term)}
            >
              {term}
            </li>
          ))}
        </ul>
      </div>

      {/* 최근 본 공지 */}
      <div className={styles.recentNoticeContainer}>
        <h3 className={styles.recentNoticeTitle}>최근 본 일정</h3>
        <ul className={styles.recentNoticeList}>
          {recentNotices.map((notice) => (
            <li
              key={notice.eventInfo.eventId}
              className={styles.noticeItem}
              onClick={() => handleRecentNoticeClick(notice.eventInfo.eventId)}
            >
              <div className={styles.noticeItemContent}>
                <div className={styles.noticeItemInfo}>
                  <div className={styles.noticeItemInfo2}>
                    <p className={styles.noticeItemTitle}>
                      {notice.eventInfo.title}
                    </p>
                    <p className={styles.noticeItemDate}>
                      {notice.eventInfo.startDateTime} ~
                      {notice.eventInfo.endDateTime}
                    </p>
                  </div>
                  <div className={styles.noticeItemStats}>
                    <p className={styles.likes}>
                      ❤️ {notice.eventInfo.likeCount}
                    </p>
                    <p className={styles.comments}>
                      💬 {notice.eventInfo.commentCount}
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

export default SearchComponent;
