import eyeon from '@/assets/login/eyeon.svg';
import eyeoff from '@/assets/login/eyeoff.svg';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import styles from './page.module.css';
import { postLogin, postRegister } from '@/api/authAPI';

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const handleClickEye = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleClickConfirmEye = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };

  const passwordType = passwordVisible ? 'text' : 'password';
  const passwordConfirmType = passwordConfirmVisible ? 'text' : 'password';
  const eyeIcon = passwordVisible ? eyeon : eyeoff;
  const eyeConfirmIcon = passwordConfirmVisible ? eyeon : eyeoff;
  const onSubmit = async (data) => {
    try {
      const res = await postRegister(data.email, data.password, data.name);
      alert('회원가입에 성공했습니다.');
      navigate('/signin');
    } catch (e) {
      alert('회원가입에 실패했습니다.');
    }
  };

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const nameRegex = /^(?:[가-힣]+|[a-zA-Z\s]+)$/;
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

  return (
    <div className={styles.pageWrapper}>
      <form className={styles.loginWrapper}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>Skkuduler 로그인</span>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='text'>이름</label>
          <input
            type='text'
            className={styles.input}
            {...register('name', {
              required: '이름을 입력해주세요.',
              pattern: {
                value: nameRegex,
                message:
                  '한글 또는 영문으로 입력해주세요.(한글은 띄워쓰기 불가)',
              },
            })}
            placeholder='이름을 입력해주세요'
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='text'>이메일</label>
          <input
            type='email'
            className={styles.input}
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: emailRegex,
                message: '이메일 형식에 맞게 입력해주세요',
              },
            })}
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
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value: passwordRegex,
                message: '비밀번호는 8~16자리의 영문, 숫자 조합이어야 합니다.',
              },
            })}
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
        <div className={styles.inputWrapper}>
          <label htmlFor='text'>비밀번호 확인</label>
          <input
            type={passwordConfirmType}
            className={styles.input}
            {...register('passwordConfirm', {
              required: '비밀번호를 한번 더 입력해주세요.',
              validate: (value) =>
                value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
            placeholder='비밀번호를 한번더 입력해주세요'
          />
          {errors.passwordConfirm && (
            <span className={styles.error}>
              {errors.passwordConfirm.message}
            </span>
          )}
          <img
            src={eyeConfirmIcon}
            alt='eye'
            className={styles.eyeIcon}
            onClick={handleClickConfirmEye}
          />
        </div>
        <button className={styles.button} onClick={handleSubmit(onSubmit)}>
          회원가입
        </button>
        <div className={styles.titleWrapper}>
          <span className={styles.info}>아이디가 있다면</span>
          <a href='/signin' className={`${styles.link} ${styles.info}`}>
            &nbsp;&nbsp;&nbsp; 로그인하러 가기
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
