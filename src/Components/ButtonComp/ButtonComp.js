import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './ButtonComp.style';

import {Enums} from '../../Constants/Enums';

const ButtonComp = ({theme, onPress, buttonText}) => {
  const currentStyle = styles[theme] || styles[Enums.BUTTON_TYPES.Primary];
  return (
    <View style={currentStyle.Container}>
      <TouchableOpacity style={currentStyle.Button} onPress={onPress}>
        <Text style={currentStyle.ButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComp;
