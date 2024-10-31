import { useEffect, useState } from 'react';
import PageLayout from '@/components/pagelayout';
import CustomCalendar from '@/components/calendar';
import addIcon from '@/assets/schedule/add.svg';
import addFriendIcon from '@/assets/schedule/addfriend.svg';
import upIcon from '@/assets/schedule/up.svg';
import downIcon from '@/assets/schedule/down.svg';
import plusIcon from '@/assets/schedule/plus.svg';

import styles from './page.module.css';
import ScheduleModal from '@/components/modal/schedulemodal';
import FriendModal from '@/components/modal/friendmodal';

const friendData = [
  { name: '김철수' },
  { name: '박영희' },
  { name: '이영수' },
  { name: '홍길동' },
  { name: '최준영' },
  { name: '김민수' },
  { name: '박민지' },
  { name: '이지훈' },
  { name: '김지수' },
  { name: '박지원' },
];

const requestFriendData = [
  { name: '김철수' },
  { name: '박영희' },
  { name: '이영수' },
  { name: '심유정' },
];

function Home() {
  const [friendAllData, setFriendAllData] = useState(friendData);
  const [friendList, setFriendList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState(requestFriendData);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const [isAddFriendClicked, setIsAddFriendClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isAddFriendListOpen, setIsAddFriendListOpen] = useState(false);

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onClickAddBtn = () => {
    setIsAddBtnClicked(true);
  };

  const onClickAddModalClose = () => {
    setIsAddBtnClicked(false);
  };

  const onClickAddFriend = () => {
    setIsAddFriendClicked(true);
  };
  const onClickAddFriendClose = () => {
    setIsAddFriendClicked(false);
  };

  const handleRequestFriendList = (name) => {
    const newRequestList = friendRequestList.filter(
      (data) => data.name !== name
    );
    setFriendRequestList(newRequestList);
    const updatedFriendList = [...friendList, { name }].sort((a, b) =>
      a.name.localeCompare(b.name, 'ko')
    );
    setFriendList(updatedFriendList);
  };

  const arrowImg = isAddFriendListOpen ? upIcon : downIcon;
  const addFriendListStyle = isAddFriendListOpen
    ? styles.friendListWrapper
    : styles.none;

  useEffect(() => {
    const handleFriendList = () => {
      if (!inputValue) {
        setFriendList(friendAllData);
        return;
      } else {
        const filteredData = friendAllData.filter((data) => {
          return data.name.includes(inputValue);
        });
        setFriendList(filteredData);
      }
    };
    handleFriendList();
  }, [inputValue]);

  return (
    <>
      <PageLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.menuWrapper}>
            <button className={styles.btn} onClick={onClickAddBtn}>
              <img src={addIcon} className={styles.icon} />
            </button>
          </div>
          {isAddBtnClicked && <ScheduleModal onClose={onClickAddModalClose} />}
          <CustomCalendar usage='schedule' />
          <div className={styles.friendList}>
            <div className={styles.inputWrapper}>
              <input
                type='text'
                className={styles.friendInput}
                placeholder='이름으로 친구를 검색하세요.'
                value={inputValue}
                onChange={onChangeInput}
              />
              <img
                src={addFriendIcon}
                className={styles.friendIcon}
                onClick={onClickAddFriend}
              />
              {isAddFriendClicked && (
                <FriendModal onClose={onClickAddFriendClose} />
              )}
            </div>
            <div className={styles.friendListWrapper}>
              {friendList.map((data) => (
                <div
                  className={styles.friendItem}
                  key={data.name}
                  style={{ cursor: 'pointer' }}
                >
                  {data.name}
                </div>
              ))}
            </div>
            <div
              className={styles.addFriend}
              onClick={() => setIsAddFriendListOpen(!isAddFriendListOpen)}
            >
              <span className={styles.addFriendTitle}>친구 요청</span>
              <img src={arrowImg} className={styles.arrowIcon} />
            </div>
            <div className={addFriendListStyle}>
              {friendRequestList.map((data) => (
                <div
                  className={`${styles.friendItem} ${styles.plusfriend}`}
                  key={data.name}
                >
                  {data.name}
                  <img
                    src={plusIcon}
                    className={styles.icon}
                    onClick={() => handleRequestFriendList(data.name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export default Home;
