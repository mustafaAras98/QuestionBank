import React, {useEffect} from 'react';

import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';

import {setUser, removeUser} from './Redux/Slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import BottomTabNavigator from './Components/BottomTabNavigator';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        dispatch(setUser({email: user.email, displayName: user.displayName}));
      } else {
        dispatch(removeUser());
      }
    });
    return () => unsubscribe();
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
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
