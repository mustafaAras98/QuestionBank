import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';

import {createStyles} from './ProfileTabs.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import authService from '../../../../Services/Auth.Service';
import {useSelector} from 'react-redux';

const ProfileTabs = ({setProfileVisible}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.exp,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.exp,
      useNativeDriver: true,
    }).start(() => setProfileVisible());
  };
  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.OutsideContainer}>
        <Animated.View
          style={[styles.ProfileTabContainer, {opacity: fadeAnim}]}>
          <TouchableOpacity
            style={styles.ProfileTabRowContainer}
            onPress={() => {
              Alert.alert(
                'Remove User',
                'All user data and previously created content will be permanently deleted. Are you sure you want to proceed? ',
                [
                  {text: 'Cancel', onPress: () => null},
                  {text: 'Remove', onPress: () => authService.deleteUser()},
                ],
              );
              handleClose();
            }}>
            <Text adjustsFontSizeToFit style={styles.ProfileTabText}>
              Delete User
            </Text>
            <FontAwesome6
              adjustsFontSizeToFit
              style={styles.ProfileTabIcon}
              iconStyle="solid"
              name="trash"
            />
          </TouchableOpacity>
          <View style={styles.Seperator} />
          <TouchableOpacity
            style={styles.ProfileTabRowContainer}
            onPress={() => {
              authService.logout();
              handleClose();
            }}>
            <Text adjustsFontSizeToFit style={styles.ProfileTabText}>
              Sign Out
            </Text>
            <FontAwesome6
              adjustsFontSizeToFit
              style={styles.ProfileTabIcon}
              iconStyle="solid"
              name="right-from-bracket"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(ProfileTabs);
