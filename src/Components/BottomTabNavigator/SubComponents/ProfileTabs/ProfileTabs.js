import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './ProfileTabs.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import authService from '../../../../Services/Auth.Service';

const ProfileTabs = ({setProfileVisible}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.exp,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.exp,
      useNativeDriver: true,
    }).start(() => setProfileVisible());
  };

  return (
    <Animated.View style={[styles.ProfileTabContainer, {opacity: fadeAnim}]}>
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
        <Text style={styles.ProfileTabText}>Delete User</Text>
        <FontAwesome6
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
        <Text style={styles.ProfileTabText}>Sign Out</Text>
        <FontAwesome6
          style={styles.ProfileTabIcon}
          iconStyle="solid"
          name="right-from-bracket"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(ProfileTabs);
