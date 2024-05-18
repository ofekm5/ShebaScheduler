// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import MakeAppointments from './components/MakeAppointments';
import GetAppointments from './components/GetAppointments';
import OTP from './components/OTP';
import Signup from './components/Signup';
import { RootStackParamList } from './types'; // Import RootStackParamList

const Stack = createStackNavigator<RootStackParamList>(); // Use RootStackParamList here

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MakeAppointments" component={MakeAppointments} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="GetAppointments" component={GetAppointments} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
