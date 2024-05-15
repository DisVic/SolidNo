import { createSlice } from '@reduxjs/toolkit';
import jwtService from './JWTService';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: jwtService.getToken() || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      jwtService.saveToken(action.payload);
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      jwtService.destroyToken();
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;