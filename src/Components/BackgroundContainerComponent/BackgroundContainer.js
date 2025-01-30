import React from 'react';
import {ImageBackground, View} from 'react-native';

import {styles} from './BackgroundContainer.style';
import BackgroundImage from '../../Assets/BackgroundImage.png';

const BackgroundContainer = ({children}) => {
  return (
    <View style={styles.Container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.ImageBackground}>
        <View style={styles.ChildrenContainer}>{children}</View>
      </ImageBackground>
    </View>
  );
};

export default React.memo(BackgroundContainer);
