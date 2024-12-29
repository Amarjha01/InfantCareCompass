import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice.jsx';
import storage from 'redux-persist/lib/storage'; // Default storage is localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Persist Configuration
const persistConfig = {
  key: 'root', // The key for the persisted state
  storage, // Use localStorage
};

// Combine Reducers
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable checks for non-serializable values in middleware
    }),
});

// Create Persistor
export const persistor = persistStore(store);
