import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import i18next from '../../../i18n.config';
import {getLocales} from 'react-native-localize';

const initialState = 'en';

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action) => {
      const newLang = action.payload;
      AsyncStorage.setItem('userLang', newLang);
      i18next.changeLanguage(newLang);
      return newLang;
    },
  },
});

export const initializeLang = () => async dispatch => {
  try {
    const savedLang = await AsyncStorage.getItem('userLang');
    if (savedLang) {
      dispatch(setLang(savedLang));
    } else {
      const locales = getLocales();
      dispatch(setLang(locales[0].languageCode));
    }
  } catch (error) {
    console.error('Error loading lang from storage:', error);
  }
};

export const {setLang} = langSlice.actions;
export default langSlice.reducer;
