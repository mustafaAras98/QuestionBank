import React, {useCallback, useEffect} from 'react';

import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';

import {setUser, removeUser} from './Redux/Slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import Gallery from './Screens/Gallery';
import ImageScreen from './Screens/ImageScreen';

import BottomTabNavigator from './Components/BottomTabNavigator';
import {useNavigation} from '@react-navigation/native';
import {Linking} from 'react-native';
import {initializeTheme} from './Redux/Slices/themeSlice';
import {initializeLang} from './Redux/Slices/langSlice';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }),
        );
      } else {
        dispatch(removeUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const navigation = useNavigation();
  useEffect(() => {
    const handleUrl = ({url}) => {
      processDeepLink(url);
    };

    const subscription = Linking.addEventListener('url', handleUrl);

    Linking.getInitialURL().then(url => {
      if (url) {
        processDeepLink(url);
      }
    });

    return () => subscription.remove();
  }, [processDeepLink]);
  function extractAlbumData(url) {
    const regex =
      /(?:questionbank:\/\/app\/|https?:\/\/questionbankwebhost\.web\.app\/)(Album|Image)\/([^/]+)/;
    const match = url.match(regex);
    return match ? {type: match[1], id: match[2]} : null;
  }
  const processDeepLink = useCallback(
    url => {
      try {
        const albumData = extractAlbumData(url);
        if (albumData) {
          navigation.navigate('Gallery', {
            sharedType: albumData.type,
            sharedUid: albumData.id,
          });
        }
      } catch (error) {
        console.error('Deep link işlenirken hata oluştu:', error);
      }
    },
    [navigation],
  );

  useEffect(() => {
    dispatch(initializeTheme());
    dispatch(initializeLang());
  }, [dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Gallery"
            component={Gallery}
            initialParams={{albumId: -1}}
          />
          <Stack.Screen name="ImageScreen" component={ImageScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen
            name="Gallery"
            component={Gallery}
            initialParams={{albumId: -1}}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ImageScreen" component={ImageScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default React.memo(AppNavigator);
