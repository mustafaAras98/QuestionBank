import {configureStore} from '@reduxjs/toolkit';

import userReducer from './Slices/userSlice';
import themeReducer from './Slices/themeSlice';
import langReducer from './Slices/langSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    lang: langReducer,
  },
});
