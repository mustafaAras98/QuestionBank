import {configureStore} from '@reduxjs/toolkit';

import userReducer from './Slices/userSlice';
import themeReducer from './Slices/themeSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
