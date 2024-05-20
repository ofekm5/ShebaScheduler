import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import axios from 'axios';
import logo from '@assets/ShebaLogo.png';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import moment from 'moment';
import { API_BASE_URL } from '@env'; 

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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/getAppo`, {
          headers: {
            token: token,
          },
        });

        if (response.status === 200) {
          setAppointments(response.data.appointments);
        } 
        else {
          console.log('Failed to fetch appointments.');
        }
      } 
      catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [token]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.testTypeText}>{item.testType}</Text>
      <Text style={styles.dateText}>{moment(item.date).format('DD-MM-YYYY HH:mm')}</Text>
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
        keyExtractor={(item, index) =>  index.toString()}
      />
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
