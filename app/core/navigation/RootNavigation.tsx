import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@/app/features/auth/screens/LoginScreen';
import SignupScreen from '@/app/features/auth/screens/SignUpScreen';
import EventDetailsScreen from '@/app/features/events/screens/EventDetailsScreen';
import React from 'react';
import SplashScreen from '../../features/auth/screens/SplashScreen';
import TabNavigator from './TabNavigator';
// import TabsNavigator from './TabsNavigator';
// import EventDetailsScreen from '../../features/events/screens/EventDetailsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {

  
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen}  />
      <Stack.Screen name="LoginScreen" component={LoginScreen}  />
            <Stack.Screen name="SignUp" component={SignupScreen}  />

    </Stack.Navigator>
  )
}