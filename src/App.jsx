import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmitRegister = (data) => {
    console.log("Registered data:", data);
    setPage("congrats"); // Redirect to the "Congrats" page
    reset();
  };

  const onSubmitLogin = (data) => {
    console.log("Login data:", data);
    reset();
  };

  const renderLandingPage = () => (
    <div className="container">
      <h1>로그인</h1>
      <button className="email-register-button" onClick={() => setPage("register")}>이메일로 가입하기</button>
      <div className="social-buttons">
        <button className="naver-button">N</button>
        <button className="google-button">G</button>
      </div>
      <div className="footer-links">
        <span>이메일</span> | <span>비밀번호 찾기</span> | <span onClick={() => setPage("login")}>이메일로 로그인</span>
      </div>
    </div>
  );

  const renderRegisterPage = () => (
    <div className="container">
      <h1>이메일로 회원가입</h1>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <label>이름</label>
        <input type="text" placeholder="이름을 입력해주세요." {...register("name", { required: "이름을 입력해주세요." })} />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label>이메일</label>
        <input type="email" placeholder="이메일을 입력해주세요." {...register("email", { required: "이메일을 입력해주세요." })} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>비밀번호</label>
        <div className="pass-wrapper">
          <input type={passwordShown ? "text" : "password"} placeholder="비밀번호를 입력해주세요." {...register("password", { required: "비밀번호를 입력해주세요." })} />
          <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="eye-icon" />
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}

        <label>비밀번호 확인</label>
        <div className="pass-wrapper">
          <input type={passwordShown ? "text" : "password"} placeholder="비밀번호를 다시 입력해주세요." {...register("passwordConfirm", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) => value === document.getElementsByName("password")[0].value || "비밀번호가 일치하지 않습니다."
          })} />
          <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="eye-icon" />
        </div>
        {errors.passwordConfirm && <p className="error">{errors.passwordConfirm.message}</p>}

        <button type="submit" className="submit-button">회원 가입</button>
      </form>
      <button onClick={() => setPage("landing")} className="back-button">뒤로 가기</button>
    </div>
  );

  const renderCongratsPage = () => (
    <div className="container">
      <img src="congrats-icon.png" alt="Congratulations Icon" className="congrats-icon" />
      <h1>회원가입을 축하드려요!</h1>
      <button className="login-button" onClick={() => setPage("login")}>이메일로 로그인</button>
    </div>
  );

  const renderLoginPage = () => (
    <div className="container">
      <h1>이메일로 로그인</h1>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
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
      <button onClick={() => setPage("landing")} className="back-button">뒤로 가기</button>
    </div>
  );

  return (
    <div className="App">
      {page === "landing" && renderLandingPage()}
      {page === "register" && renderRegisterPage()}
      {page === "congrats" && renderCongratsPage()}
      {page === "login" && renderLoginPage()}
    </div>
  );
}
