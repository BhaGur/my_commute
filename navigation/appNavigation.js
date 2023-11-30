import React from 'react';
import HomePage from '../screens/HomePage';
import LoginScreen from '../screens/LoginScreen';
import RegisterPage from '../screens/RegisterPage';
import CommuteInfo from '../screens/CommuteInfo';
import History from '../screens/History';
import WeekSummary from '../screens/WeekSummary';
import useAuth from '../hooks/useAuth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useAuth();
  if (user) {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} options={{headerShown: false }} />
            <Stack.Screen name="Commute Information" component={CommuteInfo} options={{headerShown: false }} />
            <Stack.Screen name="History" component={History} options={{headerShown: false }} />
            <Stack.Screen name="Weekly Summary" component={WeekSummary} options={{headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  } else {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterPage} options={{headerShown: false }} />
        </Stack.Navigator>
        </NavigationContainer>
    );
  }  
}
