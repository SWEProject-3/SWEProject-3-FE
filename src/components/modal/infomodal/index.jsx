import styles from './infomodal.module.css';
import infoModalStore from '@/store/infoModalStore';
import closeIcon from '@/assets/modal/close.svg';
import example from '@/assets/example1.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDepartmentCalendar, getUserCalendar } from '@/api/calendar';

function InfoModal({ date, departmentId }) {
  const location = useLocation();
  const url = location.pathname;
  const [eventData, setEventData] = useState();
  const navigate = useNavigate();
  const closeModal = infoModalStore((state) => state.closeInfoModal);
  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return date?.toLocaleDateString('ko-KR', options);
  };

  const handleClickEvent = (id) => {
    navigate(`/feeddetail/${id}`);
    closeModal();
  };

  useEffect(() => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    if (url === '/calendar') {
      const getDepartmentCalendarData = async () => {
        const res = await getDepartmentCalendar(
          departmentId,
          true,
          formattedDate,
          formattedDate,
          null
        );
        setEventData(res.data.data);
      };
      getDepartmentCalendarData();
    } else if (url === '/schedule') {
      const getCustomCalendarData = async () => {
        const res = await getUserCalendar(
          localStorage.getItem('userId'),
          true,
          formattedDate,
          formattedDate,
          null
        );
        setEventData(res.data.data);
      };
      getCustomCalendarData();
    }
  }, []);
  // console.log(eventData);

  return (
    <div className={styles.modal}>
      <div className={styles.modalTitle}>{formatDate(date)} 행사 정보</div>
      <img
        src={closeIcon}
        onClick={closeModal}
        className={styles.closeIcon}
        alt='close'
      />
      <div className={styles.infoList}>
        {eventData &&
          eventData?.map((info, i) => (
            <div key={info.eventId} className={styles.info}>
              <div
                className={styles.infoWrapper}
                onClick={() => handleClickEvent(info.eventId)}
              >
                <div className={styles.title}>{info.title}</div>
                <div className={styles.description}>
                  {info.startDateTime} ~ {info.endDateTime}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default InfoModal;
