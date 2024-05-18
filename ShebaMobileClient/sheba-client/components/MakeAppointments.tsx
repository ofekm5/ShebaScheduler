import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Text, Button, Calendar } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import logo from '../assets/ShebaLogo.png';

const { height } = Dimensions.get('window');

const MakeAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const times = [
    { label: '09:00 AM', value: '09:00 AM' },
    { label: '10:00 AM', value: '10:00 AM' },
    { label: '11:00 AM', value: '11:00 AM' },
    // Add more times as needed
  ];

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowDropdown(true);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Hello fullName</Text>
      <ScrollView style={styles.scrollView}>
        <Calendar onDayPress={handleDayPress} />
        {showDropdown && (
          <Dropdown
            label="Select Time"
            data={times}
            value={selectedTime}
            onChangeText={(value) => setSelectedTime(value)}
            style={pickerSelectStyles.input}
          />
        )}
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('Appointment scheduled:', selectedDate, selectedTime)}
          buttonColor="#ea3e85"
        >
          Schedule Appointment
        </Button>
      </ScrollView>
    </View>
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
  scrollView: {
    flex: 1,
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

export default MakeAppointments;
