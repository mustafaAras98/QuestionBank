import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './ButtonComp.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {Enums} from '../../Constants/Enums';

const ButtonComp = ({
  theme,
  onPress,
  buttonText,
  rightLogoName = null,
  iconStyle = 'solid',
  contentSize = 24,
}) => {
  const currentStyle = styles[theme] || styles[Enums.BUTTON_TYPES.Primary];
  return (
    <View style={currentStyle.Container}>
      <TouchableOpacity style={currentStyle.Button} onPress={onPress}>
        {rightLogoName !== null ? (
          <View style={currentStyle.ButtonIconContainer}>
            <Text style={[currentStyle.ButtonText, {fontSize: contentSize}]}>
              {buttonText}
            </Text>
            <FontAwesome6
              style={[currentStyle.RightIcon, {fontSize: contentSize}]}
              iconStyle={iconStyle}
              name={rightLogoName}
            />
          </View>
        ) : (
          <Text style={[currentStyle.ButtonText, {fontSize: contentSize}]}>
            {buttonText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ButtonComp);
