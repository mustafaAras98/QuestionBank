import {View, Text} from 'react-native';
import React from 'react';
import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import {styles} from './Home.style';
import {useSelector} from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.user);

  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        <Text style={{backgroundColor: 'pink', width: 100, height: 100}}>
          {user.info.username}
          {user.info.email}
        </Text>
      </View>
    </BackgroundContainer>
  );
};

export default Home;
