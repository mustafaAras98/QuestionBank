import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {createStyles} from './SignIn.style';
import {Enums} from '../../Constants/Enums';

import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import TextInputComp from '../../Components/TextInputComp';
import ButtonComp from '../../Components/ButtonComp';
import authService from '../../Services/Auth.Service';
import {useTranslation} from 'react-i18next';

const SignIn = () => {
  const {t} = useTranslation();

  const [user, setUser] = useState({Email: '', Password: ''});
  const [message, setMessage] = useState('');

  const userRef = useRef(user);
  const navigation = useNavigation();

  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const onSubmitPress = useCallback(() => {
    const currentUserRef = userRef.current;

    authService.signInWithEmail(currentUserRef, t).then(resultMsg => {
      if (resultMsg === Enums.STATUS.Success) {
        setMessage('');
        setUser({...currentUserRef, Password: ''});
        navigation.navigate('BottomTabNavigator', {screen: 'Home'});
      } else {
        setMessage(resultMsg);
        setUser({...currentUserRef, Password: ''});
      }
    });
  }, [navigation, t]);

  const handleGoogleSignIn = useCallback(() => {
    authService.signInWithGoogle(t).then(resultMsg => {
      if (resultMsg === Enums.STATUS.Success) {
        setMessage('');
        navigation.navigate('BottomTabNavigator', {screen: 'Home'});
      } else {
        setMessage(resultMsg);
      }
    });
  }, [navigation, t]);

  const onForgetPasswordPress = () => {
    authService.forgetPassword(user.Email, t).then(resultMsg => {
      if (resultMsg === Enums.STATUS.Success) {
        ToastAndroid.show(
          t('userNotificationMessages.ForgottenPasswordMailSent'),
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          1000,
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
            label={t('commonUse.Email')}
            placeholder={t('placeholders.EmailPlaceholder')}
            leftLogoName="envelope"
            onChangeValue={handleEmailChange}
            value={user.Email}
            theme={theme}
          />
          <TextInputComp
            label={t('commonUse.Password')}
            placeholder={t('placeholders.PasswordPlaceholder')}
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
              {t('authentication.passwordForget')}
            </Text>
          </TouchableOpacity>
          <ButtonComp
            theme={theme}
            buttonText={t('authentication.Login')}
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
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.SeperatorText}>
            {t('commonUse.Or')}
          </Text>
          <View style={styles.SeperatorLine} />
        </View>
        <View style={styles.OptionalLoginButtonContainer}>
          <ButtonComp
            onPress={handleGoogleSignIn}
            theme={theme}
            buttonText={t('authentication.LoginWithGoogle')}
          />
        </View>
        <View style={styles.NavigateRegisterContainer}>
          <Text adjustsFontSizeToFit style={styles.NavigateRegisterText}>
            {t('authentication.DontHaveAccount')}
          </Text>
          <Text
            adjustsFontSizeToFit
            onPress={() => navigation.navigate('SignUp')}
            style={styles.NavigateRegisterButton}>
            {t('authentication.SignUp')}
          </Text>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default React.memo(SignIn);
