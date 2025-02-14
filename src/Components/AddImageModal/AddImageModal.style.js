import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  CenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalView: {
    height: Dimensions.get('screen').width,
    width: Dimensions.get('screen').width * 0.7,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Header: {
    width: '100%',
    height: Dimensions.get('screen').width * 0.7 * 0.15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 20,
    color: 'darkslategrey',
  },
  NameInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  AddImageButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  AddImageButton: {
    justifyContent: 'center',
    height: '100%',
    maxHeight: 70,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: 'darkslategrey',
  },
  CloseButton: {
    width: Dimensions.get('screen').width * 0.7 * 0.15,
    height: Dimensions.get('screen').width * 0.7 * 0.15,
    borderRadius: Dimensions.get('screen').width * 0.7 * 0.15 * 0.5,
    position: 'absolute',
    top: -10,
    right: -10,
    padding: 10,
    elevation: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CloseText: {color: 'white', fontWeight: '800', fontSize: 18},
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  FormContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    justifyContent: 'space-around',
  },
  ImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageComp: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default styles;
