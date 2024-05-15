import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Actions for async operations
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch('http://localhost:4000/getcart', {
    method: 'POST',
    headers: {
      'auth-token': token,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (itemId, { getState }) => {
  const token = getState().auth.token;
  await fetch('http://localhost:4000/addtocart', {
    method: 'POST',
    headers: {
      'auth-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemId }),
  });
  return itemId;
});

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (itemId, { getState }) => {
  const token = getState().auth.token;
  await fetch('http://localhost:4000/removefromcart', {
    method: 'POST',
    headers: {
      'auth-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemId }),
  });
  return itemId;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items[action.payload] = (state.items[action.payload]) + 1;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items[action.payload] = (state.items[action.payload]) - 1;
      });
  },
});

export default cartSlice.reducer;