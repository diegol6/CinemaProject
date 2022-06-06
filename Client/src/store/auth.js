import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuth: false, user: '', permisos: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.user = action.payload;
      state.permisos = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.user = '';
      state.permisos = '';
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;