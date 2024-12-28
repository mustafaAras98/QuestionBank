import {View, Text} from 'react-native';
import React from 'react';
import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import {styles} from './Home.style';

const Home = () => {
  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        <Text>Home</Text>
      </View>
    </BackgroundContainer>
  );
};

export default Home;
