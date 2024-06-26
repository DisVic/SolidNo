import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import {Link} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/arrow-down-sign-to-navigate.png'

export const Navbar = () => {

  const [menu,setmenu] = useState("shop");
  const {getTotalCartItems}=useContext(ShopContext);
  const menuRef=useRef();  

  const dropdown_toggle = (e)=>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

return (
    <div className='navbar'>
      <Link style={{textDecoration:'none'}} to='/'><div className="nav-logo" onClick={()=>{setmenu("shop")}}>
        <img src={logo} alt=""/>
        <p>SolidNo</p>
      </div>
      </Link>{menu==="shop"?<hr/>:<></>}
      <img className='navd' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setmenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Главная</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>Мужское</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>Женское</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Детское</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button className='login' onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Выйти</button>
        :<Link to='/login'><button className='login'>Вход</button></Link>}
        <Link to='/cart'><img className='cart' src={cart_icon} alt=""/></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}
