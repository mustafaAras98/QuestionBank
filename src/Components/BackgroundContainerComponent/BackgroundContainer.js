import React from 'react';
import {ImageBackground, View} from 'react-native';

import {styles} from './BackgroundContainer.style';
import BackgroundImage from '../../Assets/BackgroundImage.png';
import BackgroundImageDark from '../../Assets/BackgroundDark.jpeg';
import {useSelector} from 'react-redux';
import {Enums} from '../../Constants/Enums';
const BackgroundContainer = ({children}) => {
  const theme = useSelector(state => state.theme.theme);

  return (
    <View style={styles.Container}>
      <ImageBackground
        source={
          theme === Enums.Themes.DarkTheme
            ? BackgroundImageDark
            : BackgroundImage
        }
        resizeMode="cover"
        style={styles.ImageBackground}>
        <View style={styles.ChildrenContainer}>{children}</View>
      </ImageBackground>
    </View>
  );
};

export default React.memo(BackgroundContainer);
