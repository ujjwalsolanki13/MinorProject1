import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

function ContactUs({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
      query: query,
    };

    axios.post('http://192.168.1.4:3000/contact', data)
      .then(response => {
        alert('Thank you for your response');
        // Clear the form after submission
        setName('');
        setEmail('');
        setQuery('');
      })
      .catch(error => {
        alert('There was an error submitting your response');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CONTACT US?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Type your query"
        value={query}
        onChangeText={setQuery}
        multiline={true}
        numberOfLines={4}
      />
      <Button title="SUBMIT" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2691e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
});

export default ContactUs;
