import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import logo from '@assets/ShebaLogo.png';
import { RootStackParamList } from '../../types'; 
import { API_BASE_URL } from '@env'; 

const { width } = Dimensions.get('window');
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleSignIn = async () => {
    try {
      if(username && password){
        const response = await axios.get(`${API_BASE_URL}/api/login`, {
          headers: {
            username: username,
            password: password,
          }
        });
        if (response.status === 200) {
          const { token } = response.data;
          setSnackbarMessage('Sign In successful!');
          setSnackbarVisible(true);
          setTimeout(() => {
            setSnackbarVisible(false);
            navigation.navigate('OTP', { token });
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
    } 
    catch (error) {
      setSnackbarMessage(`Sign In failed, please try again`);
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Username"
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#2b296d', outline: '#2bb99b' } }}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        label="Password"
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#2b296d', outline: '#2bb99b' } }}
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          style={styles.button} 
          onPress={handleSignIn}
          buttonColor="#ea3e85"
        >
          Sign In
        </Button>
        <Button 
          mode="contained" 
          style={styles.button} 
          onPress={() => navigation.navigate('Signup')}
          buttonColor="#ea3e85"
        >
          Register
        </Button>
      </View>
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
    flex: 1,
    marginHorizontal: '2.5%',
  },
});

export default Login;
