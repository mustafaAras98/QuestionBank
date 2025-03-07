import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {createStyles} from './SignIn.style';
import {Enums} from '../../Constants/Enums';

import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import TextInputComp from '../../Components/TextInputComp';
import ButtonComp from '../../Components/ButtonComp';
import authService from '../../Services/Auth.Service';

const SignIn = () => {
  const [user, setUser] = useState({Email: '', Password: ''});
  const [message, setMessage] = useState('');

  const userRef = useRef(user);
  const navigation = useNavigation();

  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const onSubmitPress = useCallback(() => {
    const currentUserRef = userRef.current;

    authService.signInWithEmail(currentUserRef).then(resultMsg => {
      if (resultMsg === Enums.MESSAGE.LoginSuccess) {
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
        setMessage('');
        navigation.navigate('BottomTabNavigator', {screen: 'Home'});
      } else {
        setMessage(resultMsg);
      }
    });
  }, [navigation]);

  const onForgetPasswordPress = () => {
    authService.forgetPassword(user.Email).then(resultMsg => {
      if (resultMsg === Enums.MESSAGE.ForgetPasswordSucces) {
        Alert.alert(
          'Forget Password Email Sent',
          Enums.MESSAGE.ForgottenPasswordMailSent,
          [{text: 'OK', onPress: () => {}}],
        );
        setMessage('');
      } else {
        setMessage(resultMsg);
      }
    });
  };

  const handleEmailChange = useCallback(value => {
    userRef.current = {...userRef.current, Email: value};
    setUser(prev => ({...prev, Email: value}));
  }, []);

  const handlePasswordChange = useCallback(value => {
    userRef.current = {...userRef.current, Password: value};
    setUser(prev => ({...prev, Password: value}));
  }, []);

  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        <View style={styles.GlassBackground} />
        <View style={styles.LoginFormContainer}>
          <TextInputComp
            label="E-Mail"
            placeholder="Enter Your  E-Mail..."
            leftLogoName="envelope"
            onChangeValue={handleEmailChange}
            value={user.Email}
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
          <TouchableOpacity
            onPress={onForgetPasswordPress}
            style={styles.ForgotPasswordButton}>
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={styles.ForgotPasswordText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <ButtonComp
            theme={theme}
            buttonText="LOGIN"
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
        <View style={styles.OptionalLoginButtonContainer}>
          <ButtonComp
            onPress={handleGoogleSignIn}
            theme={theme}
            buttonText="Sign in with Google"
          />
        </View>
        <View style={styles.NavigateRegisterContainer}>
          <Text adjustsFontSizeToFit style={styles.NavigateRegisterText}>
            Don't have an account?{' '}
          </Text>
          <Text
            adjustsFontSizeToFit
            onPress={() => navigation.navigate('SignUp')}
            style={styles.NavigateRegisterButton}>
            Sign Up
          </Text>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default React.memo(SignIn);
