import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Товары</p>
            <p>Наименование</p>
            <p>Цена</p>
            <p>Кол-во</p>
            <p>Общая стоимость</p>
            <p>Удалить</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                return <div>
                            <div className="cartitems-format-main cartitems-format">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price*cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                            </div>
                            <hr />
                        </div>
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Стоимость заказа</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Промежуточная стоимость</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                   <div className="cartitems-total-item">
                    <p>Доставка</p>
                    <p>Бесплатно</p>
                    </div> 
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Итоговый счёт</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button onClick={()=>alert("Переход на страницу оплаты")}>Перейти к оплате</button>
            </div>
            <div className="cartitems-promocode">
                <p>Если у вас есть промокод, введите его здесь!</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Промо' />
                    <button onClick={()=>alert("Промокод активирован!")}>Подтвердить</button>
                </div>
            </div>
        </div>
    </div>
  )
}
