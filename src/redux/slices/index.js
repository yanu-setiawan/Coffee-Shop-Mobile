/* eslint-disable prettier/prettier */
import {combineReducers} from '@reduxjs/toolkit';

import authSlice from './auth';
import cartSlice from './cart';
import profileSlice from './profile';

const reducers = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  profile: profileSlice,
});

export default reducers;
