import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Rent = ({ route, navigation }) => {
  const { location, book } = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleRent = () => {
    const formattedStartDate = formatDateTime(startDate);
    const formattedEndDate = formatDateTime(endDate);

    if (validateDate(formattedStartDate) && validateDate(formattedEndDate)) {
      Alert.alert(`Renting ${book} at ${location} from ${formattedStartDate} to ${formattedEndDate}`);
    } else {
      Alert.alert('Please enter valid dates in DD/MM/YYYY HH:MM format.');
    }
  };

  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const validateDate = (date) => {
    const datePattern = /^([0-2][0-9]|(3)[0-1])\/(0[0-9]|1[0-2])\/((19|20)\d\d) ([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    return datePattern.test(date);
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
    setShowStartTimePicker(true);
  };

  const onChangeStartTime = (event, selectedTime) => {
    const currentDate = selectedTime || startDate;
    setShowStartTimePicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    if (currentDate <= startDate) {
      Alert.alert('End date must be after start date.');
      return;
    }
    setShowEndDatePicker(false);
    setEndDate(currentDate);
    setShowEndTimePicker(true);
  };
  const onChangeEndTime = (event, selectedTime) => {
    const currentDate = selectedTime || endDate;
    setShowEndTimePicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectedItem}>Selected Location: {location}</Text>
      <Text style={styles.selectedItem}>Selected Book: {book}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Start Date & Time</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowStartDatePicker(true)}>
          <Text style={styles.dateText}>{formatDateTime(startDate)}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeStartDate}
          />
        )}
        {showStartTimePicker && (
          <DateTimePicker
            value={startDate}
            mode="time"
            display="default"
            onChange={onChangeStartTime}
          />
        )}
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>End Date & Time</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowEndDatePicker(true)}>
          <Text style={styles.dateText}>{formatDateTime(endDate)}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onChangeEndDate}
          />
        )}
        {showEndTimePicker && (
          <DateTimePicker
            value={endDate}
            mode="time"
            display="default"
            onChange={onChangeEndTime}
          />
        )}
      </View>
      <TouchableOpacity style={styles.rentButton} onPress={handleRent}>
        <Text style={styles.rentButtonText}>RENT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D37D4B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
    fontSize: 20,
    marginVertical: -20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',

    marginBottom: 30,
  },
  dateContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dateLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  dateInput: {
    width: 250,
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  rentButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  rentButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Rent;

