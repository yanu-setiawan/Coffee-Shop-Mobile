/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {login} from '../../utils/https/auth';

const initialState = {
  data: {
    msg: '',
    id: 0,
    role_id: 0,
    image: '',
    token: '',
  },
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: false,
};

const doLogin = createAsyncThunk(
  'user/post',
  async (body, {rejectWithValue, fulfillWithValue}) => {
    console.log('dataaa', body);
    try {
      const response = await login(body);
      //   console.log('resss', response);
      return fulfillWithValue(response.data);
    } catch (err) {
      //   console.log('errredux', err.response.data.msg);
      return rejectWithValue(err.response.data.msg);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(doLogin.pending, prevState => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      })
      .addCase(doLogin.fulfilled, (prevState, action) => {
        // console.log('pppp', action.payload);
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(doLogin.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const usersAction = {
  ...authSlice.actions,
  doLogin,
};

export default authSlice.reducer;
