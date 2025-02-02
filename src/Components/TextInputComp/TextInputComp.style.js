import {StyleSheet} from 'react-native';

const baseStyle = StyleSheet.create({
  TextInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    maxHeight: '70',
  },
  InputComp: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  Label: {
    position: 'absolute',
    left: 18,
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    zIndex: 1,
    shadowColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
  leftIcon: {
    fontSize: 24,
    padding: 18,
  },
  rightIcon: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginRight: '10%',
  },
});

export default {
  primary: StyleSheet.create({...baseStyle}),
};
