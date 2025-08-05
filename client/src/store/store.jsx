import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.jsx';
import doctorReducer from './slices/doctorSlice.jsx'; // assumes default export
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Persist Configuration
const persistConfig = {
  key: 'root',
  storage,
};

// ✅ Use the correct reducer variables
const appReducer = combineReducers({
  user: userReducer,
  doctor: doctorReducer,
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
