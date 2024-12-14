import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {styles} from './SignIn.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import BackgroundContainer from '../../Components/BackgroundContainerComponent';

import ValidateUsernameSchema from '../../Utils/Validation/ValidateUsernameSchema';
import ValidatePasswordSchema from '../../Utils/Validation/ValidatePasswordSchema';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const onSubmitPress = () => {
    let usernameValidate = ValidateUsernameSchema(username.trim(), 8, 18);
    let passwordValidate = ValidatePasswordSchema(password.trim(), 8, 18);

    usernameValidate === 'Valid' && passwordValidate === 'Valid'
      ? setMessage('Valid')
      : setMessage(`${usernameValidate}\n${passwordValidate}`);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        <View style={styles.GlassBackground} />
        <View style={styles.LoginFormContainer}>
          <View style={styles.TextInputContainer}>
            <Text style={styles.Label}>Username</Text>
            <FontAwesome6
              style={styles.PromptIcon}
              name="user"
              iconStyle="solid"
            />
            <TextInput
              placeholder="Enter Your Username..."
              onChangeText={setUsername}
              value={username}
              maxLength={18}
              style={styles.InputComp}
            />
          </View>
          <View style={styles.TextInputContainer}>
            <Text style={styles.Label}>Password</Text>
            <FontAwesome6
              style={styles.PromptIcon}
              name="lock"
              iconStyle="solid"
            />
            <TextInput
              placeholder="Enter Your Password..."
              onChangeText={setPassword}
              value={password}
              maxLength={18}
              secureTextEntry={showPassword}
              style={styles.InputComp}
            />
            <FontAwesome6
              onPress={toggleShowPassword}
              style={styles.PasswordHideIcon}
              iconStyle="solid"
              name={showPassword ? 'eye-slash' : 'eye'}
            />
          </View>
          <TouchableOpacity style={styles.ForgotPasswordButton}>
            <Text style={styles.ForgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.SubmitButton} onPress={onSubmitPress}>
            <Text style={styles.ButtonText}>LOGIN</Text>
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
        <View style={styles.OptionalLoginButtonContainer}>
          <TouchableOpacity style={styles.OptionalLoginButton}>
            <Text style={styles.OptionalLoginButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.OptionalLoginButton}>
            <Text style={styles.OptionalLoginButtonText}>Facebook</Text>
          </TouchableOpacity>
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
