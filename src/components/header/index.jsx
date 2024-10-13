import { useNavigate, useLocation } from 'react-router-dom';

import styles from './header.module.css';
import searchIcon from '@/assets/header/alarm.svg';

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
      <div onClick={() => navigate('/alarm')} className={styles.menu}>
        <img className={styles.icon} src={searchIcon} alt='alarmpage' />
      </div>
    </header>
  );
}

export default Header;
