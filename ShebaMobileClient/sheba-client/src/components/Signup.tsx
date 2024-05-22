import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import logo from '@assets/ShebaLogo.png';
import { API_BASE_URL } from '@env'; 
import axios from 'axios';
import { RootStackParamList } from '../../types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

type SignupScreenRouteProp = RouteProp<RootStackParamList, 'Signup'>;
type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;
type Props = {
  route: SignupScreenRouteProp;
  navigation: SignupScreenNavigationProp;
};

const Signup = ({ route, navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSignup = async () => {
    if (username && password && repeatPassword) {
      if (password !== repeatPassword) {
        setSnackbarMessage('Passwords do not match.');
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 2000);
        return;
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/api/signup`, {}, {
          headers: {
            username: username,
            password: password,
          },
          validateStatus: function (status: number) {
            return status >= 200 && status < 300 || status === 401; 
          }
        });

        if (response.status === 200) {
          setSnackbarMessage('Signup successful.');
          setSnackbarVisible(true);
          setTimeout(() => {
            setSnackbarVisible(false);
            navigation.navigate('Login');
          }, 2000);
        } 
        else if(response.status === 401){
          setSnackbarMessage('User already exists.');
          setSnackbarVisible(true);
          setTimeout(() => {
            setSnackbarVisible(false);
          }, 2000);
        }
      } 
      catch (error) {
        if (error instanceof Error) {
          setSnackbarMessage(`Error during signup: ${error.message}`);
        } else {
          setSnackbarMessage('Error during signup.');
        }
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 2000);
      }
    } 
    else {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.image}
      />
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#2b296d', outline: '#2bb99b' } }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#2b296d', outline: '#2bb99b' } }}
        secureTextEntry
      />
      <TextInput
        label="Repeat password"
        value={repeatPassword}
        onChangeText={text => setRepeatPassword(text)}
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#2b296d', outline: '#2bb99b' } }}
        secureTextEntry
      />
      <Button 
        mode="contained" 
        style={styles.button} 
        onPress={handleSignup}
        buttonColor="#ea3e85"
      >
        Sign up
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
  button: {
    marginHorizontal: '2.5%',
  },
});

export default Signup;
