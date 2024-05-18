// OTP.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import logo from '../assets/ShebaLogo.png';
import { RootStackParamList } from '../types'; // Import RootStackParamList

const { width } = Dimensions.get('window');

type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTP'>;
type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTP'>;

type Props = {
  route: OTPScreenRouteProp;
  navigation: OTPScreenNavigationProp;
};

const OTP = ({ route, navigation }: Props) => {
  const { token } = route.params;
  const [otp, setOTP] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOTP = async () => {
    try {
      const response = await axios.get('http://10.0.0.7:3000/api/verifyOTP', {
        headers: {
          otp: otp,
          token: token,
        },
      });

      if (response.status === 201) {
        setSnackbarMessage('OTP verified successfully!');
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
          navigation.navigate('GetAppointments'); // Navigate to GetAppointments
        }, 3000);
      } else {
        setSnackbarMessage('OTP verification failed. Please try again. Token:' + token);
        setSnackbarVisible(true);
      }
    } catch (error) {
      setSnackbarMessage('OTP verification failed. Please try again.');
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.image}
      />
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        label="OTP"
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#2b296d', outline: '#2bb99b' } }}
        value={otp}
        onChangeText={text => setOTP(text)}
      />
      <Button 
        mode="contained" 
        style={styles.button} 
        onPress={handleOTP}
        buttonColor="#ea3e85"
      >
        Enter
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '5%',
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: '5%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: '5%',
    textAlign: 'center',
    color: '#2b296d',
  },
  input: {
    marginBottom: '5%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  button: {
    marginHorizontal: '2.5%',
  },
});

export default OTP;
