import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './calendar.module.css';
import './calendarcustom.css';

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
];

function CustomCalendar({ usage, data }) {
  const [eventData, setEventData] = useState(mockData);
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventsForDay = eventData.filter(
        (event) => date >= event.startDay && date <= event.endDay
      );

      const isEventDay = eventsForDay.length > 0;

      return (
        <div className={styles.tile}>
          {isEventDay && (
            <div className={styles.eventMarker}>
              {eventsForDay.map((event, index) => (
                <div
                  key={index}
                  className={styles.eventBtn}
                  style={{ backgroundColor: event.color }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.calendarWrapper}>
      <Calendar tileContent={tileContent} />
    </div>
  );
}

export default CustomCalendar;
