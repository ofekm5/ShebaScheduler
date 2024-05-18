import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import logo from '../assets/ShebaLogo.png';

const { width } = Dimensions.get('window');

const OTP = () => {
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
        />
        <Button 
            mode="contained" 
            style={styles.button} 
            onPress={() => console.log('Sign In pressed')}
            buttonColor="#ea3e85"
        >
            enter
        </Button>
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
