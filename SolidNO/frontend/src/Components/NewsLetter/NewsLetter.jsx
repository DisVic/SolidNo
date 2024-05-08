import React from 'react'
import './NewsLetter.css'
export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Специальные предложения только для вас!</h1>
        <p>Подпишитесь на рассылку и получайте самые выгодные предложения!</p>
        <div>
            <input type="email" placeholder='Ваша электронная почта'/>
            <button onClick={()=>alert("Вы подписались на новости!")}>Подписаться</button>
        </div>
    </div>
  )
}
