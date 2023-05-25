/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getProfile} from '../../utils/https/profile';

const initialState = {
  data: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

export const getProfileThunk = createAsyncThunk(
  'profile/get',
  async ({id, controllerProfile, token}) => {
    try {
      const response = await getProfile(id, controllerProfile, token);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    filter: prevState => {
      return {
        ...prevState,
        data: [],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfileThunk.pending, prevState => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getProfileThunk.fulfilled, (prevState, action) => {
        console.log(action.payload.data[0]);
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload.data[0],
        };
      })
      .addCase(getProfileThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.error.message,
        };
      });
  },
});

export const profileAction = {
  ...profileSlice.actions,
  getProfileThunk,
};

export default profileSlice.reducer;
