import { useEffect, useState } from 'react';
import PageLayout from '@/components/pagelayout';
import CustomCalendar from '@/components/calendar';
import addIcon from '@/assets/schedule/add.svg';
import addFriendIcon from '@/assets/schedule/addfriend.svg';
import upIcon from '@/assets/schedule/up.svg';
import downIcon from '@/assets/schedule/down.svg';
import plusIcon from '@/assets/schedule/plus.svg';
import minusIcon from '@/assets/schedule/minus.svg';

import styles from './page.module.css';
import ScheduleModal from '@/components/modal/schedulemodal';
import FriendModal from '@/components/modal/friendmodal';
import {
  deleteFriend,
  getFriend,
  getFriendRequestReceived,
  putFriendAccept,
} from '@/api/friendAPI';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button';

function Home() {
  const navigate = useNavigate();
  const [friendAllData, setFriendAllData] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const [isAddFriendClicked, setIsAddFriendClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isAddFriendListOpen, setIsAddFriendListOpen] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const getFriendList = async () => {
    const res = await getFriend();
    setFriendAllData(res.data.data);
    setFriendList(res.data.data);
  };
  const getFriendRequestList = async () => {
    const res = await getFriendRequestReceived();
    setFriendRequestList(res.data.data);
  };
  useEffect(() => {
    if (accessToken) {
      getFriendList();
      getFriendRequestList();
    }
  }, [accessToken]);

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

  const handleFriendDelete = async (friendShipId) => {
    await deleteFriend(friendShipId);
    await getFriendList();
  };

  const handleAcceptFriend = async (friendShipId) => {
    await putFriendAccept(friendShipId, true);
    await getFriendList();
    await getFriendRequestList();
  };

  const handleRejectFriend = async (friendShipId) => {
    await putFriendAccept(friendShipId, false);
    await getFriendRequestList();
    await getFriendRequestList();
  };

  const navigateToFriendList = (friendId, friendName) => {
    navigate(`/sharecalendar/${friendId}/${friendName}`);
  };

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
          <CustomCalendar usage='schedule' isAddBtnClicked={isAddBtnClicked} />
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
              {friendList &&
                friendList.map((data, i) => (
                  <div
                    className={`${styles.friendItem} ${styles.plusfriend}`}
                    key={i}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      navigateToFriendList(data.friendUserId, data.friendName)
                    }
                  >
                    {data.friendName}
                    <img
                      src={minusIcon}
                      className={styles.deleteIcon}
                      onClick={() => handleFriendDelete(data.friendshipId)}
                    />
                  </div>
                ))}
            </div>
            <div
              className={styles.addFriend}
              onClick={() => setIsAddFriendListOpen(!isAddFriendListOpen)}
            >
              <span className={styles.addFriendTitle}>
                친구 요청 ({friendRequestList?.length})
              </span>
              <img src={arrowImg} className={styles.arrowIcon} />
            </div>
            <div className={addFriendListStyle}>
              {friendRequestList?.map((data, i) => (
                <div
                  className={`${styles.friendItem} ${styles.plusfriend}`}
                  key={i}
                >
                  {data.friendName}
                  <div className={styles.btnWrapper}>
                    <Button
                      color='red'
                      onClick={() => handleRejectFriend(data.friendshipId)}
                    >
                      거절
                    </Button>
                    <Button
                      color='blue'
                      onClick={() => handleAcceptFriend(data.friendshipId)}
                    >
                      수락
                    </Button>
                  </div>
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
