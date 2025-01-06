import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import store from './Redux/store';
import {Provider} from 'react-redux';

import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
