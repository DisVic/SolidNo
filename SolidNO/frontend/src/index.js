import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import ShopContextProvider from './Context/ShopContext';
import { Provider } from "react-redux";
import store from './Redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ShopContextProvider>
     <App />
  </ShopContextProvider>
  </Provider>
);

