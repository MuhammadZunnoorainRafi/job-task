import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

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
  user: Cookie.get('user') ? JSON.parse(Cookie.get('user')!) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      Cookie.set('user', JSON.stringify(action.payload));
    },
    signInUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      Cookie.set('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      Cookie.remove('user');
    },
  },
});

export const { signUpUser, signInUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
