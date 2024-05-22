import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import { Text, Button, Snackbar } from 'react-native-paper';
import axios from 'axios';
import logo from '@assets/ShebaLogo.png';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { API_BASE_URL } from '@env';
import moment from 'moment-timezone';

const { width } = Dimensions.get('window');

type GetAppointmentsScreenRouteProp = RouteProp<RootStackParamList, 'GetAppointments'>;
type GetAppointmentsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GetAppointments'>;
type Props = {
  route: GetAppointmentsScreenRouteProp;
  navigation: GetAppointmentsScreenNavigationProp;
};

const GetAppointments = ({ route, navigation }: Props) => {
  const { token } = route.params;
  const [appointments, setAppointments] = useState<any[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/appointment`, {
        headers: {
          token: token,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 300 || status === 404; 
        }
      });

      if (response.status === 200) {
        setAppointments(response.data.appointments);
      } 
      else if (response.status === 404) {
        setSnackbarMessage('Appointments not found');
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 2000);
      } 
    } 
    catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(`Error fetching appointments: ${error.message}`);
      } else {
        setSnackbarMessage('Error fetching appointments');
      }
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 2000);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAppointments();
    }, [token])
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.testTypeText}>{item.testType}</Text>
      <Text style={styles.dateText}>{moment(item.date).tz('Asia/Jerusalem').format('DD-MM-YYYY HH:mm')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Your Appointments</Text>
      <Button 
        mode="contained" 
        style={styles.button} 
        onPress={() => navigation.navigate('SetAppointments', { token })}
        buttonColor="#ea3e85"
      >
        Make new appointment
      </Button>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
    marginTop: '5%',
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: '3%',
    alignSelf: 'center',
  },
  button: {
    marginHorizontal: '2.5%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: '5%',
    textAlign: 'center',
    color: '#2b296d',
  },
  appointmentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  testTypeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  }
});

export default GetAppointments;
