import React, {useCallback, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import authService from '../../Services/Auth.Service';

import {styles} from './SignUp.style';
import {Enums} from '../../Constants/Enums';

import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import TextInputComp from '../../Components/TextInputComp';
import ButtonComp from '../../Components/ButtonComp';

const SignUp = () => {
  const [user, setUser] = useState({Email: '', Username: '', Password: ''});
  const [message, setMessage] = useState('');

  const userRef = useRef(user);
  const navigation = useNavigation();

  const onSubmitPress = useCallback(() => {
    const currentUserRef = userRef.current;
    authService.createUserWithEmail(currentUserRef).then(resultMsg => {
      if (resultMsg === Enums.MESSAGE.SignUpSuccess) {
        setMessage('');
        setUser({...currentUserRef, Password: ''});
        navigation.navigate('Home');
      } else {
        setMessage(resultMsg);
        setUser({...currentUserRef, Password: ''});
      }
    });
  }, [navigation]);
  const handleGoogleSignIn = useCallback(() => {
    authService.signInWithGoogle().then(resultMsg => {
      if (resultMsg === Enums.MESSAGE.LoginSuccess) {
        navigation.navigate('Home');
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
            theme={Enums.TEXTINPUT_TYPES.Primary}
          />
          <TextInputComp
            label="Username"
            placeholder="Enter Your Username..."
            leftLogoName="user"
            onChangeValue={handleUsernameChange}
            value={user.Username}
            maxLength={18}
            theme={Enums.TEXTINPUT_TYPES.Primary}
          />
          <TextInputComp
            label="Password"
            placeholder="Enter Your Password..."
            leftLogoName="lock"
            onChangeValue={handlePasswordChange}
            value={user.Password}
            maxLength={18}
            theme={Enums.TEXTINPUT_TYPES.Primary}
            isPassword={true}
          />
          <ButtonComp
            theme={Enums.BUTTON_TYPES.Primary}
            buttonText="REGISTER"
            onPress={onSubmitPress}
          />
        </View>
        {message !== Enums.STATUS.Success && message !== '' && (
          <View style={styles.FailedMessageContainer}>
            <Text style={styles.MessageText}>{message}</Text>
          </View>
        )}
        <View style={styles.Seperator}>
          <View style={styles.SeperatorLine} />
          <Text style={styles.SeperatorText}>OR</Text>
          <View style={styles.SeperatorLine} />
        </View>
        <View style={styles.OptionalRegisterButtonContainer}>
          <ButtonComp
            onPress={handleGoogleSignIn}
            theme={Enums.BUTTON_TYPES.Primary}
            buttonText="Sign in with Google"
          />
        </View>
        <View style={styles.NavigateRegisterContainer}>
          <Text style={styles.NavigateRegisterText}>
            Already have an account?{' '}
            <Text
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
