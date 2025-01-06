import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import {styles} from './Home.style';
import {useSelector} from 'react-redux';
import authService from '../../Services/Auth.Service';

const Home = () => {
  const user = useSelector(state => state.user);

  const handleLogout = () => {
    authService.logout();
  };
  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        <Text style={{backgroundColor: 'pink', width: 100, height: 100}}>
          {user.info.username}
          {user.info.email}
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: 'white',
            width: 100,
            height: 100,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Text>SignOut</Text>
        </TouchableOpacity>
      </View>
    </BackgroundContainer>
  );
};

export default Home;
