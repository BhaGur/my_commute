import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { db, auth } from '../firebase';
import { onValue, ref, update } from 'firebase/database';
import Logo2 from '../assets/commute_2.jpg';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function EditProfile({ route }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [userProfile, setUserProfile] = useState([]);
    
    const navigation = useNavigation();

    useEffect(() => {
        // Ensure userProfile is passed as a route parameter
        const { item } = route.params;
        setUserProfile(item);

        // Pre-fill form fields with the user profile data
        setFirstName(item.firstName);
        setLastName(item.lastName);
        setPhone(item.phone);
        setBirthDate(item.birthDate);
        setAddress(item.address);
        setCountry(item.country);
    }, [route.params]);

    const editProfile = (id) => {
        const profileRef = ref(db, `${auth.currentUser.uid}/profile/${userProfile.id}`);
        update(profileRef, {
            firstName,
            lastName,
            phone,
            birthDate,
            address,
            country,
        })
        .then(() => {
            alert('User profile updated successfully');
        })
        .catch((error) => {
            console.error('Error updating user profile: ', error);
            alert('Failed to update user profile');
        });
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

                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={value => setFirstName(value)}
                    placeholder='First Name'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={value => setLastName(value)}
                    placeholder='Last Name'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={value => setPhone(value)}
                    placeholder='Phone Number'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    value={birthDate}
                    onChangeText={value => setBirthDate(value)}
                    placeholder='Birth Date'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={value => setAddress(value)}
                    placeholder='Address'
                    autoCapitalize='none'
                />
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
                style={{
                    width: '25%',
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    margin: 10,
                    backgroundColor: 'green'}}
                    onPress={() => editProfile(userProfile.id)}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: '25%',
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        margin: 10,
                        backgroundColor: 'blue'
                    }}
                    onPress={() => navigation.navigate('User Profile')}
                >
                    <Text style={styles.buttonText}>Profile</Text>
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