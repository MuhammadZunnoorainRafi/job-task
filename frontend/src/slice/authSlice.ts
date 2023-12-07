import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface IInitialState {
  user: IUser | null;
}

const initialState: IInitialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    signInUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { signUpUser, signInUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
