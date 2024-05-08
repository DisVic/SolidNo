import React, { useState } from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png' 
import { Link } from 'react-router-dom'
export const Hero = () => {

  const [menu,setmenu] = useState("shop");

  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>Приветствуем в SolidNo!</h2>
        
            <div>
            <div className="hero-hand-icon">
                <p>Новые</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>коллекции</p>
            <p>для каждого"</p>
            </div>
            <Link style={{textDecoration:'none'}} to='/mens'><div className="hero-latest-button" onClick={()=>{setmenu("shop")}}>
            <div>Новинки</div>
            <img src={arrow_icon} alt="" />
           </div>
          </Link>{menu==="mens"?<hr/>:<></>}
          </div>
        <div className="hero-right">
        <img src={hero_image} alt="" />
        </div>
    </div>
  )
}
