import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import authService from '../../Services/Auth.Service';

import {createStyles} from './SignUp.style';
import {Enums} from '../../Constants/Enums';

import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import TextInputComp from '../../Components/TextInputComp';
import ButtonComp from '../../Components/ButtonComp';
import {useSelector} from 'react-redux';

const SignUp = () => {
  const [user, setUser] = useState({Email: '', Username: '', Password: ''});
  const [message, setMessage] = useState('');

  const userRef = useRef(user);
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const onSubmitPress = useCallback(() => {
    const currentUserRef = userRef.current;
    authService.createUserWithEmail(currentUserRef).then(resultMsg => {
      if (resultMsg === Enums.MESSAGE.SignUpSuccess) {
        setMessage('');
        setUser({...currentUserRef, Password: ''});
        navigation.navigate('BottomTabNavigator', {screen: 'Home'});
      } else {
        setMessage(resultMsg);
        setUser({...currentUserRef, Password: ''});
      }
    });
  }, [navigation]);

  const handleGoogleSignIn = useCallback(() => {
    authService.signInWithGoogle().then(resultMsg => {
      if (resultMsg === Enums.MESSAGE.LoginSuccess) {
        navigation.navigate('BottomTabNavigator', {screen: 'Home'});
        setMessage('');
      } else {
        setMessage(resultMsg);
      }
    });
  }, [navigation]);

  const handleEmailChange = useCallback(value => {
    userRef.current = {...userRef.current, Email: value};
    setUser(prev => ({...prev, Email: value}));
  }, []);

  const handleUsernameChange = useCallback(value => {
    userRef.current = {...userRef.current, Username: value};
    setUser(prev => ({...prev, Username: value}));
  }, []);

  const handlePasswordChange = useCallback(value => {
    userRef.current = {...userRef.current, Password: value};
    setUser(prev => ({...prev, Password: value}));
  }, []);

  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        <View style={styles.GlassBackground} />
        <View style={styles.RegisterFormContainer}>
          <TextInputComp
            label="E-Mail"
            placeholder="Enter Your  E-Mail..."
            leftLogoName="envelope"
            onChangeValue={handleEmailChange}
            value={user.Email}
            theme={theme}
          />
          <TextInputComp
            label="Username"
            placeholder="Enter Your Username..."
            leftLogoName="user"
            onChangeValue={handleUsernameChange}
            value={user.Username}
            maxLength={18}
            theme={theme}
          />
          <TextInputComp
            label="Password"
            placeholder="Enter Your Password..."
            leftLogoName="lock"
            onChangeValue={handlePasswordChange}
            value={user.Password}
            maxLength={18}
            theme={theme}
            isPassword={true}
          />
          <ButtonComp
            theme={theme}
            buttonText="REGISTER"
            onPress={onSubmitPress}
          />
        </View>
        {message !== Enums.STATUS.Success && message !== '' && (
          <View style={styles.FailedMessageContainer}>
            <Text adjustsFontSizeToFit style={styles.MessageText}>
              {message}
            </Text>
          </View>
        )}
        <View style={styles.Seperator}>
          <View style={styles.SeperatorLine} />
          <Text adjustsFontSizeToFit style={styles.SeperatorText}>
            OR
          </Text>
          <View style={styles.SeperatorLine} />
        </View>
        <View style={styles.OptionalRegisterButtonContainer}>
          <ButtonComp
            onPress={handleGoogleSignIn}
            theme={theme}
            buttonText="Sign in with Google"
          />
        </View>
        <View style={styles.NavigateRegisterContainer}>
          <Text adjustsFontSizeToFit style={styles.NavigateRegisterText}>
            Already have an account?{' '}
            <Text
              adjustsFontSizeToFit
              onPress={() => navigation.navigate('SignIn')}
              style={styles.NavigateRegisterButton}>
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default SignUp;
