import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './pages/AuthStack/AuthStack';
import MainStack from './pages/MainStack/MainStack';

const App = () => {
  const isLoggedIn = true; // firebase giriş yapıldı mı ?
  
  return (
    <NavigationContainer>
      {isLoggedIn?<MainStack/>:<AuthStack/>}
    </NavigationContainer>
  )
}

export default App;