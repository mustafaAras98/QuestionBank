import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import SignIn from '../../Screens/SignIn';
import SignUp from '../../Screens/SignUp';
import Home from '../../Screens/Home';

import {styles} from './BottomTabNavigator.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {View} from 'react-native';

const TabIcons = ({route, focused}) => {
  const icons = {
    Home: 'house',
    SignIn: 'user',
    SignUp: 'user-plus',
  };
  return (
    <FontAwesome6
      style={focused ? styles.FocusedIcon : styles.UnfocusedIcon}
      iconStyle="solid"
      name={icons[route.name]}
    />
  );
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
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
        </>
      ) : (
        <>
          <Tab.Screen name="SignIn" component={SignIn} />
          <Tab.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
