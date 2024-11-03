import React, { useState } from 'react';
import sortingIcon from '@/assets/feed/sorting.svg';
import styles from './feed.module.css';
import FeedSortingModal from '@/components/modal/feedsortingmodal';


function FeedComponent() {

    const notices = [
        {
          title: '공지1',
          date: '2024-10-23',
          likes: 50,
          comments: 10,
        },
        {
          title: '공지2',
          date: '2024-10-24',
          likes: 75,
          comments: 22,
        },
        {
          title: '공지3',
          date: '2024-10-26',
          likes: 12,
          comments: 34,
        },
        {
            title: '공지4',
            date: '2024-10-27',
            likes: 12,
            comments: 34,
          },
    ];

    const sortingimg = sortingIcon;
    const [isSortingBtnClicked, setIsSortingBtnClicked] = useState(false);

    
    const onClickSortingBtn = () => {
        setIsSortingBtnClicked(true);
    };
    const onClickSortingBtnClose = () => {
        setIsSortingBtnClicked(false);
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.feedHeader}>
                <div className={styles.feedHeaderContent}>
                    <h3 className={styles.feedHeaderTitle}>공지사항</h3>
                    <h3 className={styles.feedHeaderCount}>100개</h3>
                </div>
                <div className={styles.feedSorting}>
                    <h3 className={styles.feedSortingName}>최신순</h3>
                    <button
                        onClick={onClickSortingBtn}
                        className={styles.sortingButtonContainer}
                    >
                        <img className={styles.icon} src={sortingimg} alt='sortingIcon' />
                    </button>
                    {isSortingBtnClicked && (<FeedSortingModal onClose={onClickSortingBtnClose} />)}
                </div>
            </div>
            <div className={styles.feedContainer}>
                <ul className={styles.feedList}>
                    {notices.map((noticeItem, index) => (
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

export default FeedComponent;