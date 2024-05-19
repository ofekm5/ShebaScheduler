import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import logo from '@assets/ShebaLogo.png';

const { height } = Dimensions.get('window');

const SetAppointments = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const times = [
    { label: '08:00 AM', value: '08:00' },
    { label: '10:00 AM', value: '10:00' },
    { label: '12:00 PM', value: '12:00' },
  ];

  const appoType = [
    { label: 'Acupuncture', value: 'Acupuncture' },
    { label: 'Otorhinolaryngology', value: 'Otorhinolaryngology' },
    { label: 'Physiotherapy', value: 'Physiotherapy' },
  ];

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setShowDropdown(true);
  };

  const handleScheduleAppointment = async () => {
    if (selectedDate && selectedTime && selectedType) {
      const dateTime = moment(`${selectedDate} ${selectedTime}`, 'YYYY-MM-DD HH:mm').toISOString();

      const appointment = {
        appoDate: dateTime,
        appoType: selectedType,
      };

      try {
        const response = await axios.post('http://10.0.0.7:3000/api/setAppo', appointment);
        console.log('Appointment scheduled:', response.data);
      } catch (error) {
        console.error('Error scheduling appointment:', error);
      }
    } else {
      console.log('Please select date, time, and type.');
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} extraHeight={200}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Schedule Appointment</Text>
      <Calendar onDayPress={handleDayPress} />
      {showDropdown && (
        <>
          <DropDown
            label="Select Time"
            mode="outlined"
            value={selectedTime}
            setValue={setSelectedTime}
            list={times}
            visible={showDropdown}
            showDropDown={() => setShowDropdown(true)}
            onDismiss={() => setShowDropdown(false)}
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
            visible={showDropdown}
            showDropDown={() => setShowDropdown(true)}
            onDismiss={() => setShowDropdown(false)}
            inputProps={{
              style: pickerSelectStyles.input,
            }}
          />
        </>
      )}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleScheduleAppointment}
        buttonColor="#ea3e85"
      >
        Schedule
      </Button>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#fff',
  },
  image: {
    width: height * 0.25,
    height: height * 0.25,
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
  button: {
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 20,
  },
});

export default SetAppointments;
