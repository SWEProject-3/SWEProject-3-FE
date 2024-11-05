import React, { useContext } from 'react';
import LoginForm from '@LoginForm/components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '@authAPI/api/authAPI'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  

  
  const handleLogin = async (data) => {
    try {
      
      const response = await postLogin(data.email, data.password);
      login(response.data);  
      navigate('/');  
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>이메일로 로그인</h1>
      <LoginForm onSubmit={handleLogin} />  {}
    </div>
  );
};

export default LoginPage;
