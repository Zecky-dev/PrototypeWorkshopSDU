import React from 'react';
import HomePage from '../HomePage/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomePage}/>      
      </Stack.Navigator>
    );
};

export default MainStack;