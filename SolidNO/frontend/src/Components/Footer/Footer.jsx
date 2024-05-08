import React, { useState } from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import pintester_icon from '../Assets/pintester_icon.png'
import watsapp_icon from '../Assets/whatsapp_icon.png'
import instagram_icon from '../Assets/instagram_icon.png'
import { Link } from 'react-router-dom'

export const Footer = () => {

    const [menu,setmenu] = useState("shop");

  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SolidNo</p>
        </div>
        <ul className="footer-links">
            <li onClick={()=>alert("SolidNo - интернет-магазин одежды, разработанный для успешной сдачи дисциплины)")}>О компании</li>
            <Link className='a' style={{textDecoration:'none'}} to='/'><li onClick={()=>{setmenu("shop")}}>Товары</li></Link>{menu==="shop"?<hr/>:<></>}         
            <li onClick={()=>alert("Единственный офис - в Подмосковье, в однушке")}>Наши офисы</li>
            <li onClick={()=>alert("Мы каменщики, работаем три дня без зарплаты")}>О нас</li>
            <li onClick={()=> alert("https://t.me/DisappearedVictory")}>Контакты</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={watsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>SolidNo @ 2024 - Все права защищены.</p>
        </div>
    </div>
  )
}
