import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignSelf: 'center',
    padding: 10,
  },
  LoginFormContainer: {
    flex: 6,
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  TextInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  InputComp: {
    flex: 1,
    backgroundColor: 'white',
  },
  Label: {
    position: 'absolute',
    left: 18,
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    zIndex: 1,
    shadowColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
  PromptIcon: {
    fontSize: 24,
    padding: 18,
  },
  PasswordHideIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 16,
    right: 20,
    fontSize: 18,
  },
  ForgotPasswordText: {
    fontWeight: 600,
  },
  ForgotPasswordButton: {
    alignSelf: 'flex-end',
    textDecorationLine: 'none',
  },
  SubmitButton: {
    padding: 10,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  ButtonText: {alignSelf: 'center', fontWeight: 600, fontSize: 22},
  Seperator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SeperatorLine: {
    height: 2,
    flex: 4,
    backgroundColor: 'black',
  },
  SeperatorText: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 18,
  },
  OptionalLoginButtonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  OptionalLoginButton: {
    width: '45%',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
  },
  OptionalLoginButtonText: {
    fontWeight: 500,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  NavigateRegisterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NavigateRegisterText: {
    fontWeight: 500,
  },
  NavigateRegisterButton: {fontWeight: 700, color: '#0047AB'},
});
