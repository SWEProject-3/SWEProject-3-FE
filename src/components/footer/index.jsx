import { useNavigate, useLocation } from 'react-router-dom';

import styles from './footer.module.css';
import searchIcon from '@/assets/footer/search.svg';
import profileIcon from '@/assets/footer/profile.svg';
import feedIcon from '@/assets/footer/feed.svg';
import calendarIcon from '@/assets/footer/calendar.svg';
import mycalendarIcon from '@/assets/footer/mycalendar.svg';
import clicksearchIcon from '@/assets/footer/clicksearch.svg';
import clickprofileIcon from '@/assets/footer/clickprofile.svg';
import clickfeedIcon from '@/assets/footer/clickfeed.svg';
import clickcalendarIcon from '@/assets/footer/clickcalendar.svg';
import clickmycalendarIcon from '@/assets/footer/clickmycalendar.svg';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const calendarimg = url === '/calendar' ? clickcalendarIcon : calendarIcon;
  const feedimg = url === '/feed' ? clickfeedIcon : feedIcon;
  const mycalendarimg =
    url === '/schedule' ? clickmycalendarIcon : mycalendarIcon;
  const profileimg = url === '/my' ? clickprofileIcon : profileIcon;

  return (
    <footer className={styles.footer}>
      <div onClick={() => navigate('/calendar')} className={styles.menu}>
        <img className={styles.icon} src={calendarimg} alt='calendarpage' />
        <span className={styles.menutxt}>일정</span>
      </div>
      <div onClick={() => navigate('/feed')} className={styles.menu}>
        <img className={styles.icon} src={feedimg} alt='feedpage' />
        <span className={styles.menutxt}>피드</span>
      </div>
      <div onClick={() => navigate('/schedule')} className={styles.menu}>
        <img className={styles.icon} src={mycalendarimg} alt='search' />
        <span className={styles.menutxt}>내 일정</span>
      </div>
      <div onClick={() => navigate('/my')} className={styles.menu}>
        <img className={styles.icon} src={profileimg} alt='mypage' />
        <span className={styles.menutxt}>My</span>
      </div>
    </footer>
  );
}

export default Footer;
