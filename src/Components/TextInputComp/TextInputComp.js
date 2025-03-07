import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import styles from './TextInputComp.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {Enums} from '../../Constants/Enums';
import {Colors} from '../../Constants/Colors';

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
  rightLogoOnPress,
  multiline = false,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const currentStyle = styles[theme] || styles[Enums.Themes.LightTheme];
  const hasRightLogo = rightLogoName !== 'None' && !isPassword;
  const flexValue = hasRightLogo || isPassword ? 4 : 5;

  return (
    <View style={currentStyle.TextInputContainer}>
      {label && (
        <Text adjustsFontSizeToFit style={currentStyle.Label}>
          {label}
        </Text>
      )}
      {leftLogoName !== 'None' && (
        <FontAwesome6
          adjustsFontSizeToFit
          style={currentStyle.LeftIcon}
          name={leftLogoName}
          iconStyle={iconStyle}
        />
      )}
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeValue}
        value={value}
        maxLength={maxLength}
        style={[currentStyle.InputComp, {flex: flexValue}]}
        secureTextEntry={isPassword && !showPassword}
        multiline={multiline}
        placeholderTextColor={Colors.Common.Disabled}
      />
      {hasRightLogo && (
        <TouchableOpacity onPress={rightLogoOnPress}>
          <FontAwesome6
            adjustsFontSizeToFit
            style={currentStyle.RightIcon}
            iconStyle={iconStyle}
            name={rightLogoName}
          />
        </TouchableOpacity>
      )}
      {isPassword && (
        <FontAwesome6
          adjustsFontSizeToFit
          style={currentStyle.RightIcon}
          iconStyle={iconStyle}
          name={showPassword ? 'eye-slash' : 'eye'}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    </View>
  );
};

export default React.memo(TextInputComp);
