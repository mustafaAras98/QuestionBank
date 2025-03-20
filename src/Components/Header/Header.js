import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Enums} from '../../Constants/Enums';
import LottieView from 'lottie-react-native';
import {createStyles} from './Header.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {setTheme} from '../../Redux/Slices/themeSlice';
import {setLang} from '../../Redux/Slices/langSlice';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const headerHeight = Dimensions.get('window').height * 0.08;

const Header = ({isLanguageContainerOpen, setIsLanguageContainerOpen}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const lang = useSelector(state => state.lang);
  let styles = useMemo(() => createStyles(theme), [theme]);

  const rotateZ = useSharedValue(0);
  const firstFlagTranslateY = useSharedValue(0);
  const secondFlagTranslateY = useSharedValue(0);
  const flagsOpacity = useSharedValue(0);
  const flagsZIndex = useSharedValue(-1);
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotateZ.value}deg`}],
    };
  });
  const trFlagStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: firstFlagTranslateY.value}],
      opacity: flagsOpacity.value,
      zIndex: flagsZIndex.value,
    };
  });
  const usFlagStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: secondFlagTranslateY.value}],
      opacity: flagsOpacity.value,
      zIndex: flagsZIndex.value,
    };
  });

  useEffect(() => {
    if (isLanguageContainerOpen) {
      rotateZ.value = withTiming(30, {duration: 300});
      flagsOpacity.value = withTiming(1, {duration: 200});
      firstFlagTranslateY.value = withSpring(headerHeight);
      secondFlagTranslateY.value = withSpring(headerHeight * 2);
      flagsZIndex.value = 1;
    } else {
      rotateZ.value = withTiming(0, {duration: 300});
      flagsOpacity.value = withTiming(0, {duration: 200}, () => {
        flagsZIndex.value = -1;
      });
      firstFlagTranslateY.value = withSpring(0);
      secondFlagTranslateY.value = withSpring(0);
    }
  }, [
    isLanguageContainerOpen,
    firstFlagTranslateY,
    flagsOpacity,
    flagsZIndex,
    rotateZ,
    secondFlagTranslateY,
  ]);

  const toggleMenu = () => {
    setIsLanguageContainerOpen(!isLanguageContainerOpen);
  };

  const handleFlagButtonPress = langParam => {
    lang !== langParam ? dispatch(setLang(langParam)) : null;
    setIsLanguageContainerOpen(false);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <Text adjustsFontSizeToFit style={styles.Title}>
          Question Bank
        </Text>
      </View>
      <TouchableOpacity
        style={styles.SwitchContainer}
        onPress={() => {
          dispatch(
            setTheme({
              theme:
                theme === Enums.Themes.DarkTheme
                  ? Enums.Themes.LightTheme
                  : Enums.Themes.DarkTheme,
            }),
          );
        }}>
        <LottieView
          style={styles.ThemeSwitchAnimation}
          source={require('../../Assets/ThemeSwitchAnimation.json')}
          progress={theme === Enums.Themes.DarkTheme ? 1 : 0.5}
        />
      </TouchableOpacity>
      <Animated.View style={[styles.FlagButton, trFlagStyle]}>
        <TouchableOpacity
          style={styles.FlagTouchable}
          onPress={() => handleFlagButtonPress('tr')}>
          <FontAwesome6
            adjustsFontSizeToFit
            style={styles.FlagIcon}
            iconStyle="solid"
            name="star-and-crescent"
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.FlagButton, usFlagStyle]}>
        <TouchableOpacity
          style={styles.FlagTouchable}
          onPress={() => handleFlagButtonPress('en')}>
          <FontAwesome6
            adjustsFontSizeToFit
            style={styles.FlagIcon}
            iconStyle="solid"
            name="flag-usa"
          />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity style={styles.LanguageContainer} onPress={toggleMenu}>
        <Animated.View style={[styles.LanguageContainer, animatedButtonStyle]}>
          <FontAwesome6
            adjustsFontSizeToFit
            style={styles.LanguageIcon}
            iconStyle="solid"
            name="language"
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
