import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {styles} from './SignIn.style';
import {Enums} from '../../Constants/Enums';

import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import TextInputComp from '../../Components/TextInputComp';
import ButtonComp from '../../Components/ButtonComp';
import authService from '../../Services/Auth.Service';

const SignIn = () => {
  const [user, setUser] = useState({Email: '', Password: ''});
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const onSubmitPress = () => {
    authService.signInWithEmail(user).then(resultMsg => {
      if (resultMsg === Enums.MESSAGE.LoginSuccess) {
        setMessage('');
        setUser({...user, Password: ''});
        navigation.navigate('Home');
      } else {
        setMessage(resultMsg);
        setUser({...user, Password: ''});
      }
    });
  };
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
  const handleGoogleSignIn = () => {
    authService.signInWithGoogle().then(resultMsg => {
      if (resultMsg !== Enums.MESSAGE.LoginSuccess) {
        setMessage(resultMsg);
      } else {
        setMessage('');
      }
    });
  };
  const handleEmailChange = value => {
    setUser({...user, Email: value});
  };
  const handlePasswordChange = value => {
    setUser({...user, Password: value});
  };

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
          <TouchableOpacity
            onPress={onForgetPasswordPress}
            style={styles.ForgotPasswordButton}>
            <Text style={styles.ForgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <ButtonComp
            theme={Enums.BUTTON_TYPES.Primary}
            buttonText="LOGIN"
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
        <View style={styles.OptionalLoginButtonContainer}>
          <ButtonComp
            onPress={handleGoogleSignIn}
            theme={Enums.BUTTON_TYPES.Primary}
            buttonText="Sign in with Google"
          />
        </View>
        <View style={styles.NavigateRegisterContainer}>
          <Text style={styles.NavigateRegisterText}>
            Don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={styles.NavigateRegisterButton}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default SignIn;
