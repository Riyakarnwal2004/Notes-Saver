// src/store.js
import { configureStore } from '@reduxjs/toolkit';

// Import your slice reducers
import  pasteReducer from './features/pasteSlice';

const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});

export default store;
