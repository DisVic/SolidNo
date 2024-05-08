import React, { useState } from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
import { Link } from 'react-router-dom';

export const Offers = () => {
  const [menu,setmenu] = useState("shop");

  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Эксклюзивно</h1> 
            <h1>Предложения для ВАС!</h1>
            <p>Только ЛУЧШИЕ товары!</p>
            <Link style={{textDecoration:'none'}} to='/kids'><button onClick={()=>{setmenu("kids")}}>Смотреть сейчас!</button></Link>{menu==="kids"?<hr/>:<></>}
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}
