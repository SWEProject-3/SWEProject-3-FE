import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onSubmit }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    navigate('/login'); // Redirect to login page after successful signup
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>성함</label>
      <input
        type="text"
        placeholder="이름을 입력해주세요."
        {...register("name", { required: "이름을 입력해주세요." })}
        className={errors.name ? 'invalid' : ''}
      />
      {errors.name && <p className="error">{errors.name.message}</p>}

      <label>이메일</label>
      <input
        type="email"
        placeholder="이메일을 입력해주세요."
        {...register("email", {
          required: "이메일을 입력해주세요.",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "유효한 이메일 주소를 입력해주세요."
          }
        })}
        className={errors.email ? 'invalid' : ''}
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <label>비밀번호</label>
      <div className="pass-wrapper">
        <input
          type={passwordShown ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요."
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
              message: "비밀번호는 대문자, 특수문자 및 숫자를 포함해야 합니다."
            }
          })}
          className={errors.password ? 'invalid' : ''}
        />
        <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="eye-icon" />
      </div>
      {errors.password && <p className="error">{errors.password.message}</p>}

      <label>비밀번호 확인</label>
      <div className="pass-wrapper">
        <input
          type={passwordShown ? "text" : "password"}
          placeholder="비밀번호를 다시 입력해주세요."
          {...register("passwordConfirm", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) => value === password || "비밀번호가 일치하지 않습니다."
          })}
          className={errors.passwordConfirm ? 'invalid' : ''}
        />
        <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="eye-icon" />
      </div>
      {errors.passwordConfirm && <p className="error">{errors.passwordConfirm.message}</p>}

      <button type="submit" className="submit-button">회원 가입</button>
    </form>
  );
};

export default SignupForm;
