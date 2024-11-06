import React from 'react';
import SignupForm from '@SignupForm/components/SignupForm';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '@authAPI/api/authAPI';

const SignupPage = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSignup = async (data) => {
    try {
      // Call postRegister with email, password, and name from the form
      await postRegister(data.email, data.password, data.name);
      navigate('/login');  // Redirect to the login page on success
    } catch (error) {
      console.error("Signup failed:", error);
      alert("An error occurred during signup. Please try again.");  // Show error message on failure
    }
  };

  return (
    <div className="container">
      <h1>이메일로 회원가입</h1>
      <SignupForm onSubmit={handleSignup} />  {/* Pass handleSignup as the form's submit handler */}
    </div>
  );
};

export default SignupPage;
