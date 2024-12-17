import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {styles} from './SignUp.style';

import BackgroundContainer from '../../Components/BackgroundContainerComponent';
import ValidateEmailSchema from '../../Utils/Validation/ValidateEmailSchema';
import ValidateUsernameSchema from '../../Utils/Validation/ValidateUsernameSchema';
import ValidatePasswordSchema from '../../Utils/Validation/ValidatePasswordSchema';
import TextInputComp from '../../Components/TextInputComp';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitPress = () => {
    let emailValidate = ValidateEmailSchema(email.trim());
    let usernameValidate = ValidateUsernameSchema(username.trim(), 8, 18);
    let passwordValidate = ValidatePasswordSchema(password.trim(), 8, 18);

    emailValidate &&
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
            theme="primary"
          />
          <TextInputComp
            label="Username"
            placeholder="Enter Your Username..."
            leftLogoName="user"
            onChangeValue={setUsername}
            value={username}
            maxLength={18}
            theme="primary"
          />
          <TextInputComp
            label="Password"
            placeholder="Enter Your Password..."
            leftLogoName="lock"
            onChangeValue={setPassword}
            value={password}
            maxLength={18}
            theme="primary"
            isPassword={true}
          />
          <TouchableOpacity style={styles.SubmitButton} onPress={onSubmitPress}>
            <Text style={styles.ButtonText}>REGISTER</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.OptionalRegisterButton}>
            <Text style={styles.OptionalRegisterButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.OptionalRegisterButton}>
            <Text style={styles.OptionalRegisterButtonText}>Facebook</Text>
          </TouchableOpacity>
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
