import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  theme: 'LightTheme',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
      AsyncStorage.setItem('userTheme', action.payload.theme);
    },
  },
});


export const initializeTheme = () => async dispatch => {
  try {
    const savedTheme = await AsyncStorage.getItem('userTheme');
    if (savedTheme) {
      dispatch(setTheme({theme: savedTheme}));
    }
  } catch (error) {
    console.error('Error loading theme from storage:', error);
  }
};

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
