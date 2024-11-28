import styles from './schedulemodal.module.css';
import { useForm } from 'react-hook-form';
import closeIcon from '@/assets/modal/close.svg';
import { postUserCalendar } from '@/api/calendar';

function ScheduleModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data) => {
    const {
      name,
      description,
      color,
      date,
      enddate,
      startTime,
      endTime,
      photo,
    } = data;
    const transformedData = {
      title: name,
      content: description,
      colorCode: color,
      startDateTime: `${date} ${startTime}`,
      endDateTime: `${enddate} ${endTime}`,
      imageFile: photo && photo.length > 0 ? photo[0] : null,
    };
    const postMySchedule = async () => {
      try {
        await postUserCalendar(transformedData);
      } catch (error) {
        alert('일정 추가에 실패했습니다.');
      }
    };
    postMySchedule();
    onClose();
  };

  const btnClass =
    errors.name ||
    errors.date ||
    errors.startTime ||
    errors.endTime ||
    errors.description
      ? `${styles.btn} ${styles.disabled}`
      : styles.btn;

  return (
    <div className={styles.modal}>
      <button className={styles.closeBtn} onClick={onClose}>
        <img src={closeIcon} className={styles.icon} alt='close' />
      </button>
      <div className={styles.modalHeader}>
        <span className={styles.title}>일정 추가</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.schedule}>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTitle}>일정명</span>
          <input
            type='text'
            className={styles.scheduleInput}
            {...register('name', { required: '일정명을 입력하세요.' })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTitle}>시작 날짜</span>
          <input
            type='date'
            className={styles.scheduleInput}
            {...register('date', { required: '일정 날짜를 선택하세요.' })}
          />
          {errors.date && <p className={styles.error}>{errors.date.message}</p>}
        </div>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTitle}>시작 시간</span>
          <input
            type='time'
            className={styles.scheduleInput}
            {...register('startTime', { required: '시작 시간을 입력하세요.' })}
          />
          {errors.startTime && (
            <p className={styles.error}>{errors.startTime.message}</p>
          )}
        </div>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTitle}>종료 날짜</span>
          <input
            type='date'
            className={styles.scheduleInput}
            {...register('enddate', { required: '일정 날짜를 선택하세요.' })}
          />
          {errors.enddate && (
            <p className={styles.error}>{errors.enddate.message}</p>
          )}
        </div>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTitle}>종료 시간</span>
          <input
            type='time'
            className={styles.scheduleInput}
            {...register('endTime', { required: '종료 시간을 입력하세요.' })}
          />
          {errors.endTime && (
            <p className={styles.error}>{errors.endTime.message}</p>
          )}
        </div>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTitle}>일정 색</span>
          <input
            type='color'
            className={styles.scheduleInput}
            {...register('color')}
          />
        </div>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTitle}>일정 설명</span>
          <textarea
            className={`${styles.scheduleInput} ${styles.description}`}
            {...register('description', {
              required: '일정 설명을 입력하세요.',
            })}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTitle}>사진추가</span>
          <input
            type='file'
            accept='image/*'
            className={styles.scheduleInput}
            {...register('photo')}
          />
        </div>
        <div className={styles.btnWrapper}>
          <button className={btnClass}>일정 추가</button>
        </div>
      </form>
    </div>
  );
}

export default ScheduleModal;
