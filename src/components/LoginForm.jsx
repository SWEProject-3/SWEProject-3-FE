import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ onSubmit }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>이메일</label>
      <input type="email" placeholder="이메일을 입력해주세요." {...register("email", { required: "이메일을 입력해주세요." })} />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <label>비밀번호</label>
      <div className="pass-wrapper">
        <input type={passwordShown ? "text" : "password"} placeholder="비밀번호를 입력해주세요." {...register("password", { required: "비밀번호를 입력해주세요." })} />
        <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="eye-icon" />
      </div>
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit" className="submit-button">로그인</button>
    </form>
  );
};

export default LoginForm;
