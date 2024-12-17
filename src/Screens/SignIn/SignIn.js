import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {styles} from './SignIn.style';
import BackgroundContainer from '../../Components/BackgroundContainerComponent';

import ValidateUsernameSchema from '../../Utils/Validation/ValidateUsernameSchema';
import ValidatePasswordSchema from '../../Utils/Validation/ValidatePasswordSchema';
import TextInputComp from '../../Components/TextInputComp';
import ButtonComp from '../../Components/ButtonComp';
import {Enums} from '../../Constants/Enums';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const onSubmitPress = () => {
    let usernameValidate = ValidateUsernameSchema(username.trim(), 8, 18);
    let passwordValidate = ValidatePasswordSchema(password.trim(), 8, 18);

    usernameValidate === 'Valid' && passwordValidate === 'Valid'
      ? setMessage('Valid')
      : setMessage(`${usernameValidate}\n${passwordValidate}`);
  };

  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        <View style={styles.GlassBackground} />
        <View style={styles.LoginFormContainer}>
          <TextInputComp
            label="Username"
            placeholder="Enter Your Username..."
            leftLogoName="user"
            onChangeValue={setUsername}
            value={username}
            maxLength={18}
            theme={Enums.TEXTINPUT_TYPES.Primary}
          />
          <TextInputComp
            label="Password"
            placeholder="Enter Your Password..."
            leftLogoName="lock"
            onChangeValue={setPassword}
            value={password}
            maxLength={18}
            theme={Enums.TEXTINPUT_TYPES.Primary}
            isPassword={true}
          />
          <TouchableOpacity style={styles.ForgotPasswordButton}>
            <Text style={styles.ForgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <ButtonComp
            theme={Enums.BUTTON_TYPES.Primary}
            buttonText="LOGIN"
            onPress={onSubmitPress}
          />
        </View>
        {message !== 'Valid' && message !== '' && (
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
          <ButtonComp theme={Enums.BUTTON_TYPES.Primary} buttonText="Google" />
          <ButtonComp
            theme={Enums.BUTTON_TYPES.Primary}
            buttonText="Facebook"
          />
        </View>
        <View style={styles.NavigateRegisterContainer}>
          <Text style={styles.NavigateRegisterText}>
            Doesn't have an account?
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={styles.NavigateRegisterButton}>
              {' '}
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default SignIn;
