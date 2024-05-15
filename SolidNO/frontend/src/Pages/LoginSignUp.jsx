import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../Redux/AuthSlice';
import './CSS/LoginSignUp.css';

export const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigateToRoot =()=>{
  }
  const handleSubmit = () => {
    if (state === "Login") {
      dispatch(loginUser(formData));
      //
    } else {
      dispatch(signupUser(formData));
      //window.location.replace("/");
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {authError && <p className="error-message">{authError}</p>}
        <div className='loginsignup-fields'>
          {state === "Sign Up" && (
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Your Name'
            />
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Email'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Password'
          />
        </div>
        <button onClick={handleSubmit} >Continue</button>
        {state === "Sign Up" ?
          <p className="loginsignup-login">
            Already have an account? <span onClick={() => setState("Login")}>Login Here</span>
          </p> :
          <p className="loginsignup-login">
            Haven't an account? <span onClick={() => setState("Sign Up")}>Sign Up here</span>
          </p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};