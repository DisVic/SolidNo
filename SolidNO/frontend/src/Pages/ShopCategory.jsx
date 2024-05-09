import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import {Item} from '../Components/Item/Item'

export const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  return (
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
          <p>
            <span>Показано 1-12 </span>из 36 товаров
          </p>
          <div onClick={()=>alert("Функция сортировки")} className="shopcategory-sort">
            Сортировать <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {all_product.map((item,i)=>{
            if(props.category ===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
              return null;
            }
          })}
        </div>
    </div>
  )
}
