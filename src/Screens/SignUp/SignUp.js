import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {styles} from './SignUp.style';

import BackgroundContainer from '../../Components/BackgroundContainerComponent';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitPress = () =>
    console.log(`Username: ${username} Password: ${password}`);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigation();
  return (
    <BackgroundContainer>
      <View style={styles.Container}>
        <View style={styles.GlassBackground} />
        <View style={styles.RegisterFormContainer}>
          <View style={styles.TextInputContainer}>
            <Text style={styles.Label}>E-Mail</Text>
            <FontAwesome6
              style={styles.PromptIcon}
              name="envelope"
              iconStyle="solid"
            />
            <TextInput
              placeholder="Enter Your E-Mail..."
              onChangeText={setEmail}
              value={email}
              style={styles.InputComp}
            />
          </View>
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
          <TouchableOpacity style={styles.SubmitButton} onPress={onSubmitPress}>
            <Text style={styles.ButtonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
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
