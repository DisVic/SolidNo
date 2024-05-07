import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

export const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1> 
            <h1>Offers for YOU!</h1>
            <p>Only on BEST SELLERS products</p>
            <button>Check now!</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}
