import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginRegister from '../LoginRegisterPage/LoginRegisterPage';

const Tab = createMaterialTopTabNavigator();

const AuthStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Kayıt Ol">
        {() => <LoginRegister type="register" />}
      </Tab.Screen>
      <Tab.Screen name="Giriş Yap">
        {() => <LoginRegister type="login" />}
      </Tab.Screen>
    </Tab.Navigator >
  );
};

export default AuthStack;