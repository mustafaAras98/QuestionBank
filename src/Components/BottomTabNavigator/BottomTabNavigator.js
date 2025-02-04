import React from 'react';
import {View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import authService from '../../Services/Auth.Service';

import SignIn from '../../Screens/SignIn';
import SignUp from '../../Screens/SignUp';
import Home from '../../Screens/Home';
import Gallery from '../../Screens/Gallery';

import {styles} from './BottomTabNavigator.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const TabIcons = ({route, focused}) => {
  const icons = {
    Home: 'house',
    SignIn: 'user',
    SignUp: 'user-plus',
    SignOut: 'right-from-bracket',
    Gallery: 'images',
  };
  return (
    <FontAwesome6
      style={focused ? styles.FocusedIcon : styles.UnfocusedIcon}
      iconStyle="solid"
      name={icons[route.name]}
    />
  );
};
const SignOutComponent = () => {
  return null;
};
const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        animation: 'shift',
        tabBarStyle: styles.TabBarStyle,
        tabBarItemStyle: styles.TabBarItemStyle,
        tabBarIconStyle: styles.TabBarIconStyle,
        headerShown: false,
        tabBarShowLabel: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => {
          return (
            <View>
              <TabIcons route={route} focused={focused} />
              {focused ? <View style={styles.FocusedIndicator} /> : null}
            </View>
          );
        },
      })}>
      {isAuthenticated ? (
        <>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen
            name="Gallery"
            component={Gallery}
            initialParams={{albumId: -1}}
          />
          <Tab.Screen
            name="SignOut"
            component={SignOutComponent}
            listeners={{
              tabPress: e => {
                authService.logout();
              },
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen name="SignIn" component={SignIn} />
          <Tab.Screen
            name="Gallery"
            component={Gallery}
            initialParams={{albumId: -1}}
          />
          <Tab.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
