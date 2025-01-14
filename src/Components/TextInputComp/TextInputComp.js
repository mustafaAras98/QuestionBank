import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './TextInputComp.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Enums } from '../../Constants/Enums';

const TextInputComp = ({
  label,
  leftLogoName = 'None',
  rightLogoName = 'None',
  placeholder,
  value,
  onChangeValue,
  maxLength,
  theme,
  isPassword = false,
  iconStyle = 'solid',
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const currentStyle = styles[theme] || styles[Enums.TEXTINPUT_TYPES.Primary];

  return (
    <View style={currentStyle.TextInputContainer}>
      <Text style={currentStyle.Label}>{label}</Text>
      {leftLogoName !== 'None' && (
        <FontAwesome6
          style={currentStyle.leftIcon}
          name={leftLogoName}
          iconStyle={iconStyle}
        />
      )}
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeValue}
        value={value}
        maxLength={maxLength}
        style={currentStyle.InputComp}
        secureTextEntry={isPassword && !showPassword}
      />
      {rightLogoName !== 'None' && (
        <FontAwesome6
          style={currentStyle.rightIcon}
          iconStyle={iconStyle}
          name={rightLogoName}
        />
      )}
      {isPassword && (
        <FontAwesome6
          style={currentStyle.rightIcon}
          iconStyle={iconStyle}
          name={showPassword ? 'eye-slash' : 'eye'}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    </View>
  );
};

export default TextInputComp;
