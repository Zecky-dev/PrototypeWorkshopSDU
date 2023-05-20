import React from 'react';
import HomePage from '../HomePage/HomePage';
import StackDetails from '../StackDetailsPage/StackDetails';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton/CustomButton';
import {FAB} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
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
                additionalStyle={{
                  container: {
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={StackDetails}
          options={({route}) => ({
            title: route.params.title + ' Dolabı',
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
    );
};

export default MainStack;