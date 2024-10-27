import { useEffect, useState } from 'react';
import PageLayout from '@/components/pagelayout';
import CustomCalendar from '@/components/calendar';
import addIcon from '@/assets/schedule/add.svg';
import addFriendIcon from '@/assets/schedule/addfriend.svg';

import styles from './page.module.css';
import ScheduleModal from '@/components/modal/schedulemodal';

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

function Home() {
  const [friendAllData, setFriendAllData] = useState(friendData);
  const [friendList, setFriendList] = useState([]);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const [isAddFriendClicked, setIsAddFriendClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onClickAddBtn = () => {
    setIsAddBtnClicked(true);
  };

  const onClickAddModalClose = () => {
    setIsAddBtnClicked(false);
  };

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
              <img src={addFriendIcon} className={styles.friendIcon} />
            </div>
            <div className={styles.friendListWrapper}>
              {friendList.map((data) => (
                <div className={styles.friendItem} key={data.name}>
                  {data.name}
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
