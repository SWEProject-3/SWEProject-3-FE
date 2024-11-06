import eyeon from '@/assets/login/eyeon.svg';
import eyeoff from '@/assets/login/eyeoff.svg';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import styles from './page.module.css';
import { postLogin } from '@/api/authAPI';

function Signin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleClickEye = () => {
    setPasswordVisible(!passwordVisible);
  };
  const eyeIcon = passwordVisible ? eyeon : eyeoff;
  const passwordType = passwordVisible ? 'text' : 'password';

  const onSubmit = async (data) => {
    try {
      const res = await postLogin(data.email, data.password);
      localStorage.setItem('accessToken', res.data.data.accessToken);
      localStorage.setItem('userId', res.data.data.userId);
      navigate('/calendar');
    } catch (e) {
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <form className={styles.loginWrapper}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>Skkuduler 로그인</span>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='text'>이메일</label>
          <input
            type='email'
            className={styles.input}
            {...register('email', { required: '이메일을 입력해주세요.' })}
            placeholder='이메일을 입력해주세요'
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='text'>비밀번호</label>
          <input
            type={passwordType}
            className={styles.input}
            {...register('password', { required: '비밀번호를 입력해주세요.' })}
            placeholder='비밀번호를 입력해주세요'
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
          <img
            src={eyeIcon}
            alt='eye'
            className={styles.eyeIcon}
            onClick={handleClickEye}
          />
        </div>
        <button className={styles.button} onClick={handleSubmit(onSubmit)}>
          로그인
        </button>
        <div className={styles.titleWrapper}>
          <span className={styles.info}>아이디가 없다면?</span>
          <a href='/signup' className={`${styles.link} ${styles.info}`}>
            &nbsp;&nbsp;&nbsp;회원가입
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signin;
