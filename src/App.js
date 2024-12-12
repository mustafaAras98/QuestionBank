import React from 'react';
import {SafeAreaView, View, ImageBackground, Dimensions} from 'react-native';

import SafeViewAndroid from './Utils/SafeViewAndroid.style';
import {styles} from './Utils/App.style';

import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';

import BackgroundImage from './Assets/BackgroundImage.png';

const App = () => {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.ImageBackground}>
        <View style={{height: Dimensions.get('window').height * 0.7}}>
          {false ? <SignIn /> : <SignUp />}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;
