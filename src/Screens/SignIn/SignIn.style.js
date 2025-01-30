import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
    maxHeight: Dimensions.get('window').height * 0.7,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  GlassBackground: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#EDEDED',
    opacity: 0.7,
    filter: 'blur(4)',
    elevation: 1,
  },
  LoginFormContainer: {
    flex: 6,
    gap: '10%',
    padding: 10,
    marginTop: '10%',
  },
  ForgotPasswordText: {
    fontWeight: 600,
  },
  ForgotPasswordButton: {
    flex: 0.5,
    alignSelf: 'flex-end',
  },
  FailedMessageContainer: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    opacity: 0.8,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#EE4E4E',
  },
  MessageText: {
    fontWeight: 700,
  },
  Seperator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SeperatorLine: {
    marginHorizontal: 10,
    height: 2,
    flex: 5,
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
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center',
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
