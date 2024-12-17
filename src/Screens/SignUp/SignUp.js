import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {styles} from './SignUp.style';

import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import ValidateEmailSchema from '../../Utils/Validation/ValidateEmailSchema';
import ValidateUsernameSchema from '../../Utils/Validation/ValidateUsernameSchema';
import ValidatePasswordSchema from '../../Utils/Validation/ValidatePasswordSchema';
import TextInputComp from '../../Components/TextInputComp';
import ButtonComp from '../../Components/ButtonComp';
import {Enums} from '../../Constants/Enums';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitPress = () => {
    let emailValidate = ValidateEmailSchema(email.trim());
    let usernameValidate = ValidateUsernameSchema(username.trim(), 8, 18);
    let passwordValidate = ValidatePasswordSchema(password.trim(), 8, 18);

    emailValidate === 'Valid' &&
    usernameValidate === 'Valid' &&
    passwordValidate === 'Valid'
      ? setMessage('Valid')
      : setMessage(
          `${emailValidate}\n${usernameValidate}\n${passwordValidate}`,
        );
  };

  const navigation = useNavigation();
  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        <View style={styles.GlassBackground} />
        <View style={styles.RegisterFormContainer}>
          <TextInputComp
            label="E-Mail"
            placeholder="Enter Your  E-Mail..."
            leftLogoName="envelope"
            onChangeValue={setEmail}
            value={email}
            theme={Enums.TEXTINPUT_TYPES.Primary}
          />
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
          <ButtonComp
            theme={Enums.BUTTON_TYPES.Primary}
            buttonText="REGISTER"
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
        <View style={styles.OptionalRegisterButtonContainer}>
          <ButtonComp theme={Enums.BUTTON_TYPES.Primary} buttonText="Google" />
          <ButtonComp
            theme={Enums.BUTTON_TYPES.Primary}
            buttonText="Facebook"
          />
        </View>
        <View style={styles.NavigateRegisterContainer}>
          <Text style={styles.NavigateRegisterText}>
            Already have an account?
            <Text
              onPress={() => navigation.navigate('SignIn')}
              style={styles.NavigateRegisterButton}>
              {' '}
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default SignUp;
