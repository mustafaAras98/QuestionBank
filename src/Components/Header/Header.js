import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Enums} from '../../Constants/Enums';
import LottieView from 'lottie-react-native';
import {createStyles} from './Header.style';

import {setTheme} from '../../Redux/Slices/themeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <Text adjustsFontSizeToFit style={styles.Title}>
          Question Bank
        </Text>
      </View>
      <TouchableOpacity
        style={styles.SwitchContainer}
        onPress={() => {
          dispatch(
            setTheme({
              theme:
                theme === Enums.Themes.DarkTheme
                  ? Enums.Themes.LightTheme
                  : Enums.Themes.DarkTheme,
            }),
          );
        }}>
        <LottieView
          style={styles.ThemeSwitchAnimation}
          source={require('../../Assets/ThemeSwitchAnimation.json')}
          progress={theme === Enums.Themes.DarkTheme ? 1 : 0.5}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
