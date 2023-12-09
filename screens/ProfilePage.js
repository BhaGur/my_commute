import { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput
  } from "react-native";import { db, auth } from '../firebase';
import { onValue, push, ref, set } from 'firebase/database';
import Logo2 from '../assets/commute_2.jpg';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function ProfilePage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [userProfile, setUserProfile] = useState([]);
    
    const navigation = useNavigation();

    useEffect(() => {
        onValue(ref(db, auth.currentUser.uid + '/profile'),(snapshot) => {
            const data = snapshot.val();
            const items = [];
            for (let id in data) {
                items.push({id, ...data[id]});
            }
            setUserProfile(items);
        });
    }, []);

    const saveProfile = () => {
        const firstRef = push(ref(db, auth.currentUser.uid + '/profile'));
        set(firstRef, {
            firstName,
            lastName,
            phone,
            birthDate,
            address, 
            country,
        });
        alert('User profile added successfully')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={Logo2} />
            </View>
            <Text style={styles.heading}>Hello!</Text>
            <Text>Let's update your user profile!</Text>

            <StatusBar style="auto" />
            <View style ={styles.inputContainer}>

                <Text>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={value => setFirstName(value)}
                    placeholder='First Name'
                    autoCapitalize='none'
                />
                <Text>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={value => setLastName(value)}
                    placeholder='Last Name'
                    autoCapitalize='none'
                />
                <Text>Phone No.</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={value => setPhone(value)}
                    placeholder='Phone Number'
                    autoCapitalize='none'
                />
                <Text>Birth Date</Text>
                <TextInput
                    style={styles.input}
                    value={birthDate}
                    onChangeText={value => setBirthDate(value)}
                    placeholder='Birth Date'
                    autoCapitalize='none'
                />
                <Text>Address</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={value => setAddress(value)}
                    placeholder='Address'
                    autoCapitalize='none'
                />
                <Text>Country</Text>
                <TextInput
                    style={styles.input}
                    value={country}
                    onChangeText={value => setCountry(value)}
                    placeholder='Country'
                    autoCapitalize='none'
                />
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={saveProfile}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>    
            </View>
    
    </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
        marginTop: 5
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'  
    },
    input: {
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    buttonView:{
        flexDirection: 'row'
    },
    button: {
        backgroundColor:'green',
        width: '25%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,        
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