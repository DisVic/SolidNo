import React, { useState } from 'react'
import './CSS/LoginSignUp.css'

export const LoginSignUp = () => {
  
  const [state,setState] = useState("Login");
  
const [formData,setFormData] = useState({
  username:"",
  password:"",
  email:""
})

const changeHandler = (e)=>{
  setFormData({...formData,[e.target.name]:e.target.value})
}

  const login = async () =>{
    console.log("Функция входа включена",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }
  const signup = async () =>{
    console.log("Функция регистрации включена",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }
  
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Имя'/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Электронная почта'/>
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Пароль'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Продолжить</button>
        {state==="Sign Up"
        ?<p className="loginsignup-login">У вас уже есть аккаунт? <span onClick={()=>{setState("Login")}}>Войти</span></p>
        :<p className="loginsignup-login">Нет аккаунта? <span onClick={()=>{setState("Sign Up")}}>Регистрация</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>Вы соглашаетесь с политикой сервиса и его правилами.</p>
        </div>
      </div>
    </div>
  )
}
