import CustomCalendar from '@/components/calendar';
import styles from './page.module.css';
import backIcon from '@/assets/editprofile/back.svg';
import { useNavigate, useParams } from 'react-router-dom';

function Home() {
  const { id, name } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <header className={styles.header}>
        <img
          src={backIcon}
          alt='back'
          className={styles.back}
          onClick={() => navigate(-1)}
        />
        <h1 className={styles.title}>{name}의 일정</h1>
      </header>
      <CustomCalendar id={id} usage='share' />
    </>
  );
}

export default Home;
