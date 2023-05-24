import React,{useState,useEffect} from 'react';
import HomePage from '../HomePage/HomePage';
import StackDetails from '../StackDetailsPage/StackDetails';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton/CustomButton';
import {FAB} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Stack = createNativeStackNavigator();

const MainStack = () => {

  const [userType,setUserType] = useState(null);

  useEffect(() => {
    const getUserDetails = async() => {
      const docID = auth().currentUser.email.split('@')[0];
      if(docID) {
        const user = await firestore().collection('Users').doc(docID).get();
        setUserType(user.data().userType)
      }
      else {
        setUserType("default")
      }
    }
    getUserDetails();
  },[]);



    return (
      userType ? (
        <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerTitle: 'Dolaplar',
            headerTitleAlign: 'center',
            headerRight: () => (      
              <CustomButton
                icon={{name: 'logout', size: 32, color: 'white'}}
                onPress={() => auth().signOut()}
                additionalStyles={{
                  container: {
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }
                }}
              />
            ),
          }}
          initialParams={{userType}}
        />
        <Stack.Screen
          name="Details"
          component={StackDetails}
          options={({route}) => ({
            title: route.params.title + ' Dolabı',
            headerTitleAlign: 'center',
          })}
          initialParams={{userType: userType}}
        />
      </Stack.Navigator>
      ): null
      
    );
};

export default MainStack;