import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './pages/AuthStack/AuthStack';
import MainStack from './pages/MainStack/MainStack';

import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth';


const App = () => {
  
  return (
    <NavigationContainer>
      { user ? <MainStack/> : <AuthStack/> }
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

export default App;