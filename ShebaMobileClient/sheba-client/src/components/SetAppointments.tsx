import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Button, Snackbar } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment-timezone';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import logo from '@assets/ShebaLogo.png';
import { API_BASE_URL } from '@env';
import { RootStackParamList } from '../../types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { height } = Dimensions.get('window');

type SetAppointmentsScreenRouteProp = RouteProp<RootStackParamList, 'SetAppointments'>;
type SetAppointmentsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SetAppointments'>;
type Props = {
  route: SetAppointmentsScreenRouteProp;
  navigation: SetAppointmentsScreenNavigationProp;
};

const SetAppointments = ({ route, navigation }: Props) => {
  const { token } = route.params;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: { selected: boolean, selectedColor: string } }>({});
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [timeDropdownVisible, setTimeDropdownVisible] = useState(false);
  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const times = [
    { label: '08:00 AM', value: '11:00' },
    { label: '12:00 PM', value: '15:00' },
    { label: '04:00 PM', value: '19:00' },
  ];

  const appoType = [
    { label: 'Acupuncture', value: 'Acupuncture' },
    { label: 'Otorhinolaryngology', value: 'Otorhinolaryngology' },
    { label: 'Physiotherapy', value: 'Physiotherapy' },
  ];

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setMarkedDates({ [day.dateString]: { selected: true, selectedColor: '#2bb99b' } });
  };

  const handleScheduleAppointment = async () => {
    if (selectedDate && selectedTime && selectedType) {
      const selectedDateTime = moment.tz(`${selectedDate} ${selectedTime}`, 'YYYY-MM-DD HH:mm', 'Asia/Jerusalem');
      const currentDateTime = moment.tz('Asia/Jerusalem');

      if (selectedDateTime.isBefore(currentDateTime)) {
        setSnackbarMessage('Selected date and time are in the past.');
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 2000);
        return;
      }

      const dateTime = selectedDateTime.toISOString();

      const appointment = {
        appoDate: dateTime,
        appoType: selectedType,
      };

      try {
        const response = await axios.post(`${API_BASE_URL}/api/appointment`, appointment, {
          headers: {
            token: token,
          },
          validateStatus: function (status) {
            return status >= 200 && status < 300 || status === 409;
          }
        });

        if (response.status === 201) {
          setSnackbarMessage('Appointment scheduled successfully.');
          setSnackbarVisible(true);
          setTimeout(() => {
            setSnackbarVisible(false);
            navigation.navigate('GetAppointments', { token });
          }, 2000);
        } else if (response.status === 409) {
          setSnackbarMessage('Appointment already taken.');
          setSnackbarVisible(true);
          setTimeout(() => {
            setSnackbarVisible(false);
          }, 2000);
        }
      } catch (error) {
        if (error instanceof Error) {
          setSnackbarMessage(`Error scheduling appointment: ${error.message}`);
        } else {
          setSnackbarMessage(`Error scheduling appointment.`);
        }
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 2000);
      }
    } else {
      setSnackbarMessage('Please select date, time, and type.');
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 2000);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={200}
    >
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Schedule Appointment</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
      />
      <View style={styles.dropdownContainer}>
        <DropDown
          label="Select Time"
          mode="outlined"
          value={selectedTime}
          setValue={setSelectedTime}
          list={times}
          visible={timeDropdownVisible}
          showDropDown={() => setTimeDropdownVisible(true)}
          onDismiss={() => setTimeDropdownVisible(false)}
          inputProps={{
            style: pickerSelectStyles.input,
          }}
        />
        <DropDown
          label="Select Appointment Type"
          mode="outlined"
          value={selectedType}
          setValue={setSelectedType}
          list={appoType}
          visible={typeDropdownVisible}
          showDropDown={() => setTypeDropdownVisible(true)}
          onDismiss={() => setTypeDropdownVisible(false)}
          inputProps={{
            style: pickerSelectStyles.input,
          }}
        />
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleScheduleAppointment}
        buttonColor="#ea3e85"
      >
        Schedule
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: '5%',
    backgroundColor: '#fff',
  },
  image: {
    marginTop: '5%',
    width: height * 0.15,
    height: height * 0.15,
    marginBottom: '5%',
    alignSelf: 'center',
  },
  dropdownContainer: {
    marginTop: '5%',
    height: height * 0.45,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '5%',
    textAlign: 'center',
    color: '#2b296d',
  },
  button: {
    marginTop: '1%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#2bb99b', 
    borderRadius: 4,
    color: 'black',
    marginBottom: 20,
  },
});

export default SetAppointments;
