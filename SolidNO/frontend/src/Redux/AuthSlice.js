import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронные экшены для логина и регистрации
export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData) => {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors);
    }
    return data.token;
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (formData) => {
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors);
    }
    return data.token;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    error: null,
    status: 'idle',
  },
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('auth-token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        localStorage.setItem('auth-token', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        localStorage.setItem('auth-token', action.payload);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;