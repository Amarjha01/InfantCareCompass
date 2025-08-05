import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice.jsx';
import { doctorSlice } from './slices/doctorSlice.jsx';
import storage from 'redux-persist/lib/storage'; // Default storage is localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Persist Configuration
const persistConfig = {
  key: 'root',
  storage,
};

// ✅ Use the correct reducer variables
const appReducer = combineReducers({
  user: userSlice,
  doctor: doctorSlice.reducer,
});

// Resettable root reducer
const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
