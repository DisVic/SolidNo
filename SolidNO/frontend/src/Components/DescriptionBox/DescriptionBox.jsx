import React from 'react'
import './DescriptionBox.css'


export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Описание товара</div>
            <div className="descriptionbox-nav-box fade">Отзывы</div>
        </div>
        <div className="descriptionbox-description">
            <p>Описательное описание</p>
            <p>
                Какой-то текст, да-да
            </p>
        </div>
    </div>
  )
}
