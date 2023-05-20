import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './pages/AuthStack/AuthStack';
import MainStack from './pages/MainStack/MainStack';

import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth';


const App = () => {

  const [user,setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  
  return (
    <NavigationContainer>
      { user ? <AuthStack/> : <MainStack/> }
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

export default App;