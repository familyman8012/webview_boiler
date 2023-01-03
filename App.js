/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import Webview from './Webview';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NotificationListner,
  requestUserPermission,
} from './src/utils/pushnotification_helper';
const Stack = createStackNavigator();
const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);

  return (
    <>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Webview" component={Webview} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
