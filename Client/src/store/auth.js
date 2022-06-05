import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuth: false, user: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.user = '';
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;