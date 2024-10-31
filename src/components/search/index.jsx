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
  const recentSearches = [
    '최근검색어1',
    '최근검색어2',
    '최근검색어3',
    '최근검색어4',
    '최근검색어5',
    '최근검색어6',
    '최근검색어7',
    '최근검색어8',
    '최근검색어9',
    '최근검색어10',
  ];
  const recentNotices = [
    {
      title: '최근 본 공지1',
      date: '2024-10-23',
      photo: sampleimage,
      likes: 50,
      comments: 10,
    },
    {
      title: '최근 본 공지2',
      date: '2024-10-24',
      photo: sampleimage,
      likes: 75,
      comments: 22,
    },
    {
      title: '최근 본 공지3',
      date: '2024-10-26',
      photo: sampleimage,
      likes: 12,
      comments: 34,
    },
  ];

  const recentSearchRef = useRef(null);
  const scrollRecentSearchHandler = useScrollHandlers(recentSearchRef);

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
      // 클릭 상태를 true로 설정 (아이콘 변경)
      let recentSearchTerms =
        JSON.parse(localStorage.getItem('recentSearchTerms')) || [];
      if (!recentSearchTerms.includes(searchTerm)) {
        recentSearchTerms = [searchTerm, ...recentSearchTerms].slice(0, 10);
      }
      localStorage.setItem(
        'recentSearchTerms',
        JSON.stringify(recentSearchTerms)
      );
      setIsSearchClicked(true);

      // 검색어를 가지고 특정 페이지로 이동
      navigate(`/search-results?query=${searchTerm}`);
    } else {
      alert('검색어를 입력하세요.');
    }
  };

  const handleRecentSearchClick = (term) => {
    navigate(`/search-results?query=${term}`);
  };

  const onSubmit = () => {
    handleSearchClick();
  };
  const savedTerm = JSON.parse(localStorage.getItem('recentSearchTerms')) || [];

  const searchimg = isSearchClicked ? clicksearchIcon : searchIcon;

  useEffect(() => {
    setRecentSearchTerm(savedTerm);
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
        <h3 className={styles.recentNoticeTitle}>최근 본 공지</h3>
        <ul className={styles.recentNoticeList}>
          {recentNotices.map((noticeItem, index) => (
            <li key={index} className={styles.noticeItem}>
              <div className={styles.noticeItemContent}>
                <div className={styles.noticeItemInfo}>
                  <div className={styles.noticeItemInfo2}>
                    <p className={styles.noticeItemTitle}>{noticeItem.title}</p>
                    <p className={styles.noticeItemDate}>{noticeItem.date}</p>
                  </div>
                  <div className={styles.noticeItemStats}>
                    <p className={styles.likes}>❤️ {noticeItem.likes}</p>
                    <p className={styles.comments}>💬 {noticeItem.comments}</p>
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
