import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import logo from '../assets/ShebaLogo.png';

const { width } = Dimensions.get('window');

const GetAppointments = () => {
  return (
    <View style={styles.container}>
        <Image
            source={logo}
            style={styles.image}
        />
        <Text style={styles.title}>Hello fullName</Text>
        
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

export default GetAppointments;
