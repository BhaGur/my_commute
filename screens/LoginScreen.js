import React, {useState} from 'react';
import {StyleSheet, View, TextInput,TouchableOpacity, Text, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import Logo from '../assets/my_commute.jpg';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');

    const signIn = async () => {
        if(email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                alert('Sign in failed: ', error.message);
            } 
        }
    }

return (
    <View style={styles.container} >
      <Image style={styles.image} source={Logo} />

      <Text style={styles.heading}>Welcome</Text>

      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={value => setEmail(value)}
          autoCapitalize='none'
        />
        <TextInput 
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={value => setPassword(value)}
          autoCapitalize='none'
        /> 
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress = {signIn}  
          style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        <Text style={styles.registerTextStyle}>
          Don't have an account? {' '}
          <Text 
          style={{color: 'red'}} onPress={() => navigation.navigate('Register')}>Register</Text>
        </Text>
        
      </View>
          
    </View>
);
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    buttonContainer:{
        width:"60%",
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        backgroundColor:'#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
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
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
    image:{
      width:"50%",
      height: 100,
      resizeMode:'contain',
      marginBottom: 20,
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
      paddingBottom: 20
    }
  });