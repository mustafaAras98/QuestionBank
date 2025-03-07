import React, {useMemo, useState} from 'react';
import {View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import SignIn from '../../Screens/SignIn';
import SignUp from '../../Screens/SignUp';
import Home from '../../Screens/Home';
import Gallery from '../../Screens/Gallery';

import {createStyles} from './BottomTabNavigator.style';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import ProfileTabs from './SubComponents/ProfileTabs';

const TabIcons = ({route, focused}) => {
  const theme = useSelector(state => state.theme.theme);
  let styles = useMemo(() => createStyles(theme), [theme]);
  const icons = {
    Home: 'house',
    SignIn: 'user',
    SignUp: 'user-plus',
    Gallery: 'images',
    Profile: 'user-gear',
  };
  return (
    <FontAwesome6
      style={focused ? styles.FocusedIcon : styles.UnfocusedIcon}
      iconStyle="solid"
      name={icons[route.name]}
    />
  );
};

const NullComp = () => {
  return null;
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const theme = useSelector(state => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const [profileVisible, setProfileVisible] = useState(false);

  return (
    <View style={styles.Container}>
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
              name="Profile"
              component={NullComp}
              listeners={{
                tabPress: e => {
                  e.preventDefault();
                  setProfileVisible(!profileVisible);
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
      {profileVisible && (
        <ProfileTabs setProfileVisible={() => setProfileVisible(false)} />
      )}
    </View>
  );
};

export default BottomTabNavigator;
