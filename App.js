import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import AuthContextProvider from './src/context/AuthContext';
import SettingsContextProvider from './src/context/SettingsContext';
import GeoContextProvider from './src/context/GeoContext';
import Initiator from './src/Wrapper/Initiator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <AuthContextProvider>
      <SettingsContextProvider>
        <GeoContextProvider>
          <NavigationContainer>
            <StatusBar backgroundColor="#2874A6" barStyle="light-content" />
            <Initiator />
          </NavigationContainer>
        </GeoContextProvider>
      </SettingsContextProvider>
    </AuthContextProvider>
  );
};
export default App;
