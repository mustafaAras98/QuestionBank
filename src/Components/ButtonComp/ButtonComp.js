import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './ButtonComp.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {Enums} from '../../Constants/Enums';

const ButtonComp = ({
  theme,
  onPress,
  buttonText,
  rightLogoName = null,
  iconStyle = 'solid',
}) => {
  const currentStyle = styles[theme] || styles[Enums.BUTTON_TYPES.Primary];
  return (
    <TouchableOpacity style={currentStyle.ButtonContainer} onPress={onPress}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={currentStyle.ButtonText}>
        {buttonText}
      </Text>
      {rightLogoName && (
        <FontAwesome6
          adjustsFontSizeToFit
          style={currentStyle.RightIcon}
          iconStyle={iconStyle}
          name={rightLogoName}
        />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ButtonComp);
