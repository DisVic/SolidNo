import React, { useContext, useEffect, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const {product}=props;
    const {addToCart} = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState(null);
    const [number, setNumber] = useState(0);

    const handleSizeSelect = (size) => {
        setSelectedSize(size === selectedSize ? null : size);
      }

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 1000);
        setNumber(randomNumber);
      }, []);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>({number})</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                Какое-то описание товара, посмотрите на товар и придумайте сами
            </div>
            <div className="productdisplay-right-size">
                <h1>Размеры</h1>
                <div className='productdisplay-right-sizes'>
                  <div
                    className={selectedSize === 'S' ? 'selected-size' : 'unselected-size'}
                    onClick={() => handleSizeSelect('S')}>S</div>
                  <div
                    className={selectedSize === 'M' ? 'selected-size' : 'unselected-size'}
                    onClick={() => handleSizeSelect('M')}>M</div>
                  <div
                    className={selectedSize === 'L' ? 'selected-size' : 'unselected-size'}
                    onClick={() => handleSizeSelect('L')}>L</div>
                  <div
                    className={selectedSize === 'XL' ? 'selected-size' : 'unselected-size'}
                    onClick={() => handleSizeSelect('XL')}>XL</div>
                  <div
                    className={selectedSize === 'XXL' ? 'selected-size' : 'unselected-size'}
                    onClick={() => handleSizeSelect('XXL')}>XXL</div>
                </div>
            </div>
            <button className='add-button' onClick={()=>{addToCart(product.id)}}>Добавить в корзину</button>
            <p className='productdisplay-right-category'><span>Категории: </span>{product.category}</p>
            <p className='productdisplay-right-category'><span>Тэги: </span>Мода, новинки</p>

        </div>
    </div>
  )
}
