import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

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
    } else {
      const colorScheme = Appearance.getColorScheme();
      const schemeTheme = colorScheme === 'dark' ? 'DarkTheme' : 'LightTheme';
      dispatch(setTheme({theme: schemeTheme}));
    }
  } catch (error) {
    console.error('Error loading theme from storage:', error);
  }
};

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
