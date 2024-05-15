import React from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/AuthSlice';
import jwtService from '../Redux/JWTService';

export const LoginSignUp = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    const fakeToken = 'fake-jwt-token'; // Replace with actual token retrieval logic
    jwtService.saveToken(fakeToken);
    dispatch(loginSuccess(fakeToken));
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
