/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './slices';

const persistConfig = {
  key: 'coffee-shop',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
  // middleware: defaultMiddleware => {
  //   return defaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, FLUSH],
  //     },
  //   });
  // },
});

export const persistor = persistStore(store);
export default store;
