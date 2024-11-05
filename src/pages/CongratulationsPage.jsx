import React from 'react';
import { useNavigate } from 'react-router-dom';

const CongratulationsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <img src="Skku.png" alt="Congratulations Icon" className="congrats-icon" />
      <h1>회원가입을 축하드려요!</h1>
      <p>이제 함께 여행을 떠나볼까요?</p>
      <button className="login-button" onClick={() => navigate('/login')}>이메일로 로그인</button>
    </div>
  );
};

export default CongratulationsPage;
