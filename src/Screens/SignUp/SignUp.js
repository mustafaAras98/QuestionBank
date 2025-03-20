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
import {useTranslation} from 'react-i18next';

const SignUp = () => {
  const {t} = useTranslation();

  const [user, setUser] = useState({Email: '', Username: '', Password: ''});
  const [message, setMessage] = useState('');

  const userRef = useRef(user);
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const onSubmitPress = useCallback(() => {
    const currentUserRef = userRef.current;
    authService.createUserWithEmail(currentUserRef, t).then(resultMsg => {
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
    authService.signInWithGoogle().then(resultMsg => {
      if (resultMsg === Enums.STATUS.Success) {
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
            label={t('commonUse.Email')}
            placeholder={t('placeholders.EmailPlaceholder')}
            leftLogoName="envelope"
            onChangeValue={handleEmailChange}
            value={user.Email}
            theme={theme}
          />
          <TextInputComp
            label={t('commonUse.Username')}
            placeholder={t('placeholders.UsernamePlaceholder')}
            leftLogoName="user"
            onChangeValue={handleUsernameChange}
            value={user.Username}
            maxLength={18}
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
          <ButtonComp
            theme={theme}
            buttonText={t('authentication.SignUp')}
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
        <View style={styles.OptionalRegisterButtonContainer}>
          <ButtonComp
            onPress={handleGoogleSignIn}
            theme={theme}
            buttonText={t('authentication.LoginWithGoogle')}
          />
        </View>
        <View style={styles.NavigateRegisterContainer}>
          <Text adjustsFontSizeToFit style={styles.NavigateRegisterText}>
            {t('authentication.AlreadyHaveAccount')}
          </Text>
          <Text
            adjustsFontSizeToFit
            onPress={() => navigation.navigate('SignIn')}
            style={styles.NavigateRegisterButton}>
            {t('authentication.Login')}
          </Text>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default SignUp;
