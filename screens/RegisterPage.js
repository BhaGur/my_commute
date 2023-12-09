import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Logo from '../assets/my_commute.jpg';
import { StatusBar } from 'expo-status-bar';

export default function RegisterPage() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async ()=>{
        if (password !== confirmPassword) {
            Alert.alert('Error: Passwords do not match!');
            return;
        }

        if (email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            }catch(err) {
                console.log('got error: ', err.message);
            }
        }
    }

return (
    <View style={styles.container}>
      <Image style={styles.image} source={Logo} />

      <Text style={styles.heading}>Hello!</Text>
      <Text>Let's create an account</Text>

      <StatusBar style="auto" />
      <View style ={styles.inputContainer}>

          <Text>Email Address</Text>
          <TextInput
              style={styles.input}
              value={email}
              onChangeText={value => setEmail(value)}
              placeholder='Enter Email'
              autoCapitalize='none'
          />
          <Text>Password</Text>
          <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder='Enter Password'
              autoCapitalize='none'
          />
          <Text>Confirm Password</Text>
          <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}
              placeholder='Confirm Password'
              autoCapitalize='none'
          />
        </View>

        <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
        >
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.registerTextStyle}>
            Already have an account? {' '}
            <Text style={{color: 'red'}}  onPress={() => navigation.navigate('Login')}>Login</Text>
        </Text>
      
    </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
        marginTop: 10
    },
    input: {
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor:'green',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    }, 
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 20
    },
    text: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
    registerTextStyle: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14,
        alignSelf: "center",
        padding: 10,
      },
      heading:{
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'blue',
        alignItems: 'flex-start'      },
      image:{
        width:"50%",
        height: 100,
        resizeMode:'contain',
        marginBottom: 20,
      },
  });