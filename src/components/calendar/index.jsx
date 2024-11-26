import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import useinfoModalStore from '@/store/infoModalStore';
import useYearMonthStore from '@/store/yearMonthStore';
import 'react-calendar/dist/Calendar.css';
import './calendarcustom.css';
import styles from './calendar.module.css';
import InfoModal from '../modal/infomodal';
import kebabIcon from '@/assets/calendar/kebab.svg';
import { getDepartmentCalendar, getUserCalendar } from '@/api/calendar';
import { getFriend, getFriendRequestReceived } from '@/api/friendAPI';

function CustomCalendar({ id, usage }) {
  const [eventData, setEventData] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const openModal = useinfoModalStore((state) => state.openInfoModal);
  const isOpen = useinfoModalStore((state) => state.isInfoModalOpen);
  const setYearMonth = useYearMonthStore((state) => state.setYearMonth);
  const { year, month } = useYearMonthStore();
  const handleClickCalendar = (date) => {
    setSelectedDate(date);
    openModal();
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setYearMonth(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1);
  };
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (usage === 'calendar' && id && accessToken) {
      const getDepartmentCalendarData = async () => {
        const res = await getDepartmentCalendar(
          id,
          false,
          null,
          null,
          `${year}-${month}`
        );
        setEventData(res.data.data);
      };
      getDepartmentCalendarData();
    }
    if (usage === 'schedule') {
      const getUserCalendarData = async () => {
        const res = await getUserCalendar(
          localStorage.getItem('userId'),
          false,
          null,
          null,
          `${year}-${month}`
        );
        setEventData(res.data.data);
      };
      getUserCalendarData();
    }
    if (usage === 'share') {
      const getUserShareCalendarData = async () => {
        const res = await getUserCalendar(
          id,
          false,
          null,
          null,
          `${year}-${month}`
        );
        setEventData(res.data.data);
      };
      getUserShareCalendarData();
    }
  }, [id, usage, year, month, accessToken]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventsForDay = eventData?.filter((event) => {
        const start = event?.startDateTime
          ? new Date(event.startDateTime.replace(' ', 'T'))
          : new Date();

        const end = event?.endDateTime
          ? new Date(event.endDateTime.replace(' ', 'T'))
          : new Date();
        const currentDate = new Date(date);
        return currentDate >= start && currentDate <= end;
      });

      const isEventDay = eventsForDay?.length > 0;
      const length = eventsForDay?.length;
      return (
        <div className={styles.tile}>
          {isEventDay && (
            <div className={styles.eventMarker}>
              {eventsForDay.map((event, index) =>
                index > 2 && length > 4 ? (
                  <img
                    key={index}
                    className={styles.icon}
                    src={kebabIcon}
                    alt='kebab'
                  />
                ) : (
                  <div
                    key={index}
                    className={styles.eventBtn}
                    style={{ backgroundColor: event.colorCode }}
                    onClick={() => handleClickCalendar(date)}
                  >
                    {event.title}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles.calendarWrapper}>
        <Calendar
          tileContent={tileContent}
          onActiveStartDateChange={handleActiveStartDateChange}
        />
      </div>
      {isOpen && <InfoModal date={selectedDate} departmentId={id} />}
    </>
  );
}

export default CustomCalendar;
