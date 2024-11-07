import styles from './infomodal.module.css';
import infoModalStore from '@/store/infoModalStore';
import closeIcon from '@/assets/modal/close.svg';
import example from '@/assets/example1.jpg';
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    title: 'test1',
    description: 'description1',
    img: example,
  },
  {
    title: 'test2',
    description: 'description2',
    img: example,
  },
  {
    title: 'test3',
    description: 'description3',
    img: example,
  },
  {
    title: 'test4',
    description: 'description4',
    img: example,
  },
  {
    title: 'test5',
    description: 'description5',
    img: example,
  },
  {
    title: 'test6',
    description: 'description6',
    img: example,
  },
  {
    title: 'test7',
    description: 'description7',
    img: example,
  },
  {
    title: 'test8',
    description: 'description8',
    img: example,
  },
  {
    title: 'test9',
    description: 'description9',
    img: example,
  },
];

function InfoModal({ date, data = mockData }) {
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
        {mockData.map((info, i) => (
          <div key={i} className={styles.info}>
            {/* <div className={styles.eventImgWrapper}>
              <img src={info.img} className={styles.eventImg} alt='event' />
            </div> */}
            <div
              className={styles.infoWrapper}
              onClick={() => handleClickEvent(i)}
            >
              <div className={styles.title}>{info.title}</div>
              <div className={styles.description}>{info.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default InfoModal;
