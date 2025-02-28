import {StyleSheet} from 'react-native';

const baseStyle = StyleSheet.create({
  TextInputContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  Label: {
    position: 'absolute',
    left: '5%',
    top: '-20%',
    paddingHorizontal: '4%',
    backgroundColor: 'white',
    zIndex: 1,
    shadowColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontWeight: '500',
  },
  InputComp: {
    flex: 5,
    marginLeft: '5%',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'left',
    paddingBottom: 0,
    paddingTop: 0,
  },
  LeftIcon: {
    flex: 1,
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  RightIcon: {
    flex: 1,
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
  },
});

export default {
  primary: StyleSheet.create({...baseStyle}),
};
