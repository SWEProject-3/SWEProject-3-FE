import React from 'react';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '@/assets/skku.jpg';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>로그인</h1>
      <img src={placeholderImage} alt="Illustration" className="landing-image" /> {/* Replace with actual image if available */}
      
      <button
        className="email-register-button"
        onClick={() => navigate('/signup')}
      >
        이메일로 가입하기
      </button>

      <div className="social-buttons">
        <button className="naver-button" onClick={() => {}}>N</button>
        <button className="google-button" onClick={() => {}}>G</button>
      </div>

      <div className="footer-links">
        <span>이메일</span> | <span>비밀번호 찾기</span> | <span onClick={() => navigate('/login')}>이메일로 로그인</span>
      </div>
    </div>
  );
};

export default StartPage;
