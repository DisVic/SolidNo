import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, addItemToCart, removeItemFromCart } from '../Redux/CartSlice';
export const ShopContext = createContext(null);
const getDefaultCart = () =>{
    let cart={};
    for (let index = 0; index < 300+1; index++) {
        cart[index]= 0;
    }
    return cart;
}
const ShopContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);
  const [all_product, setAll_product] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setAll_product(data));

    if (token) {
      dispatch(fetchCartItems());
    }
  }, [token, dispatch]);

  const addToCart = (itemId) => {
    dispatch(addItemToCart(itemId));
  };

  const removeFromCart = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;