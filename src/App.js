import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import store from './Redux/store';
import {Provider} from 'react-redux';

import AppNavigator from './AppNavigator';

const App = () => {
  const linking = {
    prefixes: ['questionbank://'],
    config: {
      screens: {
        BottomTabNavigator: {
          screens: {
            Gallery: 'Gallery/:sharedUid/:sharedType',
          },
        },
      },
    },
  };

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer linking={linking}>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default React.memo(App);
