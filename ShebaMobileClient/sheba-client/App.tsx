import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import SetAppointments from './src/components/SetAppointments';
import GetAppointments from './src/components/GetAppointments';
import OTP from './src/components/OTP';
import Signup from './src/components/Signup';
import { RootStackParamList } from './types'; 
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator<RootStackParamList>(); 

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen 
            name="OTP" 
            component={OTP} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen 
            name="GetAppointments" 
            component={GetAppointments} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SetAppointments" 
            component={SetAppointments}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Signup" 
            component={Signup}
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
