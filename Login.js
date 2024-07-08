import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Location.js';
import BookSearch from './BookSearch.js';
import Rent from './Rent';
import ContactUs from './ContactUs.js';

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>WELCOME TO IT MILAN</Text>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title = "SIGNUP"
          onPress={() => navigation.navigate('SignupScreen')}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="username"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <Text style={styles.forgotPassword}>Forgot password?</Text>
      <TouchableOpacity 
      style={styles.button}
          title = "LOGIN"
          onPress={() => navigation.navigate('Search')}>
          <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('SignupScreen')}>signup</Text>
      </Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D37D4B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FF6500',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    color: '#000',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#D37D4B',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  signupText: {
    color: '#000',
  },
  signupLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});


function SignupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>WELCOME TO IT MILAN</Text>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Create password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>SIGN UP</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Already have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('LoginScreen')}>login</Text>
      </Text>
    </View>
  );
}
























































const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="BookSearch" component={BookSearch} />
      <Stack.Screen name="Rent" component={Rent} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} /> 
      <Stack.Screen name="ContactUs" component={ContactUs} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    
    <NavigationContainer>
       <MyStack />
    </NavigationContainer>
  );
}