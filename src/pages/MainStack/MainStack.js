import React from 'react';
import HomePage from '../HomePage/HomePage';
import StackDetails from '../StackDetailsPage/StackDetails';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen 
        name='Home' 
        component={HomePage} 
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen 
        name='Details' 
        component={StackDetails}
        options={
          
          ({ route }) => ({ 
            title: route.params.title+" Dolabı",
            headerTitleAlign:'center',
            
          })
        }
        />
      </Stack.Navigator>
    );
};

export default MainStack;