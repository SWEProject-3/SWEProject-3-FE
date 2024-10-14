import { useNavigate, useLocation } from 'react-router-dom';

import styles from './header.module.css';
import alarmIcon from '@/assets/header/alarm.svg';
import searchIcon from '@/assets/header/search.svg';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  return (
    <header className={styles.header}>
      <div>
        <h1 onClick={() => navigate('/')} className={styles.text}>
          SKKUdular
        </h1>
      </div>
      <div className={styles['menu-container']}>
        <div onClick={() => navigate('/search')} className={styles.menu}>
          <img className={styles.icon} src={searchIcon} alt='search' />
        </div>
        <div onClick={() => navigate('/alarm')} className={styles.menu}>
          <img className={styles.icon} src={alarmIcon} alt='alarmpage' />
        </div>
      </div>
    </header>
  );
}

export default Header;
