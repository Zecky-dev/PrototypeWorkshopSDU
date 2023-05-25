import React, { useState, useEffect } from 'react';
import HomePage from '../HomePage/HomePage';
import StackDetails from '../StackDetailsPage/StackDetails';
import { Alert } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../../utils/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FAB, Icon } from 'react-native-elements';
const Stack = createNativeStackNavigator();

const MainStack = () => {

  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const docID = auth().currentUser.email.split('@')[0];
      if (docID) {
        const user = await firestore().collection('Users').doc(docID).get();
        setUserType(user.data().userType)
      }
      else {
        setUserType("default")
      }
    }
    getUserDetails();
  }, []);



  return (
    userType ? (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerStyle: {
              backgroundColor: colors.cream
            },
            headerTitle: 'Dolaplar',
            headerTitleAlign: 'center',
            headerRight: () => (
              <FAB
                icon={<Icon name='logout' size={18} color='white' />}
                onPress={() =>
                  Alert.alert(
                    'SDU Prototip Atölyesi',
                    'Çıkış yapmak üzeresiniz, emin misiniz ?',
                    [
                      {
                        text: 'Hayır',
                        onPress: () => { },
                        style: 'default',
                      },
                      {
                        text: 'Evet',
                        onPress: () => auth().signOut(),
                        style: 'default',
                      },
                    ],
                    { cancelable: true }
                  )}
                color={colors.sdu_red}
                size='small'
              />
            ),
          }}
          initialParams={{ userType }}
        />
        <Stack.Screen
          name="Details"
          component={StackDetails}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: colors.cream
            },
            title: route.params.title + ' Dolabı',
            headerTitleAlign: 'center',
          })}
          initialParams={{ userType: userType }}
        />
      </Stack.Navigator>
    ) : null

  );
};

export default MainStack;