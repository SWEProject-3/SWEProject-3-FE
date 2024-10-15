import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import infoModalStore from '@/store/infoModalStore';
import 'react-calendar/dist/Calendar.css';
import './calendarcustom.css';
import styles from './calendar.module.css';
import InfoModal from '../modal/infomodal';
import kebabIcon from '@/assets/calendar/kebab.svg';

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

function CustomCalendar({ usage, data }) {
  const [eventData, setEventData] = useState(mockData);
  const [selectedDate, setSelectedDate] = useState();
  const openModal = infoModalStore((state) => state.openInfoModal);
  const isOpen = infoModalStore((state) => state.isInfoModalOpen);
  const handleClickCalendar = (date) => {
    setSelectedDate(date);
    openModal();
  };

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
        <Calendar tileContent={tileContent} />
      </div>
      {isOpen && <InfoModal date={selectedDate} />}
    </>
  );
}

export default CustomCalendar;
