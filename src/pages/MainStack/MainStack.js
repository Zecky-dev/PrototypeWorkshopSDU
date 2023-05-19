import React from 'react';
import HomePage from '../HomePage/HomePage';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomePage}/>      
      </Stack.Navigator>
    );
};

export default MainStack;