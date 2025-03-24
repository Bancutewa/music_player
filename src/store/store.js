import { configureStore } from '@reduxjs/toolkit';;
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const commonConfig = {
  key: 'music/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token'],
}
export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userSlice)
  },
});
export const persistor = persistStore(store);
