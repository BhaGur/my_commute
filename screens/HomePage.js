import { signOut } from 'firebase/auth';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth } from '../firebase';
import Logo2 from '../assets/commute_2.jpg';
import { SafeAreaView } from 'react-native-safe-area-context';
import Weather from '../components/Weather';

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const hours = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    return `${date}/${month}/${year} ${hours}:${min}`;
}

export default function HomePage() {
    const navigation = useNavigation();

    const [currentDate, setCurrentDate] = useState(getDate());

    const handleLogout = async () =>{
        await signOut(auth);
    }

return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <Image style={styles.image} source={Logo2} />
            <TouchableOpacity style={styles.headButton} onPress={handleLogout}>
                <Text style={{color: 'red'}}>Logout</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.midBox}>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>Today's Date</Text>
            <Text>{currentDate}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
            <Weather />
        </TouchableOpacity>
        
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={{
                        margin: 10,
                        width: '100%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: 'skyblue'
                    }}
                    onPress={()=> navigation.navigate('User Profile')}>
                    <Text style={styles.text}> My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        margin: 10,
                        width: '100%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: 'blue'
                    }}
                    onPress={()=> navigation.navigate('Commute Information')}>
                    <Text style={styles.text}> Add Commute</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        margin: 10,
                        width: '100%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: 'green'
                    }}
                    onPress={()=> navigation.navigate('History')}>
                    <Text style={styles.text}> Your Commute History</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        margin: 10,
                        width: '100%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: 'brown'
                    }}
                    onPress={()=> navigation.navigate('Weekly Summary')}>
                    <Text style={styles.text}> Weekly Summary</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
    },
    container: {
      flex: 1,  
      alignItems: 'center',
    },
    header:{
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center'  
    },
    headButton:{
      padding: 20,        
    },
    midBox:{
      alignItems: 'center'  
    },
    buttonContainer:{
        width:"80%",
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    }, 
    text:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    image:{
        width:"70%",
        height: 100,
        resizeMode:'contain',
        marginBottom: 20,
        marginLeft: 10
      },
});    