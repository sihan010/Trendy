import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Map from '../components/Map';
import Search from '../components/Search';
import Setting from '../components/Setting';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Map" headerMode="none">
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default MainStack;
