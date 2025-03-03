import React, {useCallback, useEffect} from 'react';

import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';

import {setUser, removeUser} from './Redux/Slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import Gallery from './Screens/Gallery';
import BottomTabNavigator from './Components/BottomTabNavigator';
import {useNavigation} from '@react-navigation/native';
import {Linking} from 'react-native';

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
  const processDeepLink = useCallback(
    url => {
      try {
        const withoutScheme = url.replace('questionbank://app', '');
        const pathSegments = withoutScheme.split('/').filter(Boolean);

        if (pathSegments.length > 0) {
          const type = pathSegments[0];
          const id = pathSegments[1];
          navigation.navigate('Gallery', {sharedType: type, sharedUid: id});
        }
      } catch (error) {
        console.error('Deep link işlenirken hata oluştu:', error);
      }
    },
    [navigation],
  );

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
        </>
      )}
    </Stack.Navigator>
  );
};

export default React.memo(AppNavigator);
