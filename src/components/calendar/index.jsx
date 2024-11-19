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
import { getDepartmentCalendar } from './../../api/calendar';

const mockData = [
  {
    title: 'test1',
    startDay: new Date(2024, 9, 1),
    endDay: new Date(2024, 9, 3),
    color: '#5849ff',
  },
  {
    title: 'test2',
    startDay: new Date(2024, 9, 5),
    endDay: new Date(2024, 9, 7),
    color: '#ff4949',
  },
  {
    title: 'test3',
    startDay: new Date(2024, 9, 26),
    endDay: new Date(2024, 9, 26),
    color: '#2db400',
  },
  {
    title: 'test4',
    startDay: new Date(2024, 9, 2),
    endDay: new Date(2024, 9, 5),
    color: '#ff9b00',
  },
  {
    title: 'test1',
    startDay: new Date(2024, 9, 1),
    endDay: new Date(2024, 9, 3),
    color: '#5849ff',
  },
  {
    title: 'test1',
    startDay: new Date(2024, 9, 1),
    endDay: new Date(2024, 9, 3),
    color: '#5849ff',
  },
  {
    title: 'test1',
    startDay: new Date(2024, 9, 1),
    endDay: new Date(2024, 9, 3),
    color: '#5849ff',
  },
  {
    title: 'test1',
    startDay: new Date(2024, 9, 1),
    endDay: new Date(2024, 9, 3),
    color: '#5849ff',
  },
  {
    title: 'test1',
    startDay: new Date(2024, 9, 1),
    endDay: new Date(2024, 9, 3),
    color: '#5849ff',
  },
  {
    title: 'test3',
    startDay: new Date(2024, 9, 26),
    endDay: new Date(2024, 9, 26),
    color: '#2db400',
  },
  {
    title: 'test3',
    startDay: new Date(2024, 9, 26),
    endDay: new Date(2024, 9, 26),
    color: '#2db400',
  },
  {
    title: 'test3',
    startDay: new Date(2024, 9, 26),
    endDay: new Date(2024, 9, 26),
    color: '#2db400',
  },
];

function CustomCalendar({ id, usage }) {
  const [eventData, setEventData] = useState(mockData);
  const [selectedDate, setSelectedDate] = useState();
  const openModal = useinfoModalStore((state) => state.openInfoModal);
  const isOpen = useinfoModalStore((state) => state.isInfoModalOpen);
  const setYearMonth = useYearMonthStore((state) => state.setYearMonth);
  const { year, month } = useYearMonthStore();
  const handleClickCalendar = (date) => {
    setSelectedDate(date);
    openModal();
  };
  console.log(year, month);

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setYearMonth(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1);
  };

  useEffect(() => {
    if (usage === 'calendar') {
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
    }
  }, [id, usage]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventsForDay = eventData.filter(
        (event) => date >= event.startDay && date <= event.endDay
      );

      const isEventDay = eventsForDay.length > 0;
      const length = eventsForDay.length;
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
                    style={{ backgroundColor: event.color }}
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
      {isOpen && <InfoModal date={selectedDate} />}
    </>
  );
}

export default CustomCalendar;
