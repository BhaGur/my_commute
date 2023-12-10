import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db, auth } from '../firebase';
import { ref, onValue } from 'firebase/database';
import propic from '../assets/itadori.jpg';
import Logo2 from '../assets/commute_2.jpg';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';

const FetchUser = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const userRef = ref(db, auth.currentUser.uid + '/profile');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const items = [];
      for (let id in data) {
        items.push({ id, ...data[id] });
      }
      setUserProfile(items);
    });
  }, []);

  const handleLogout = async () =>{
    await signOut(auth);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <Image style={styles.imageOne} source={Logo2} />
            <TouchableOpacity style={styles.headButton} onPress={handleLogout}>
                <Text style={{color: 'red'}}>Logout</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <Text style={styles.picHeader}>Your Profile</Text>
            <Image style={styles.image} source={propic}/>
            <StatusBar style="auto" />

            <View style ={styles.listContainer}>

                {userProfile && (
                    <View>
                    {userProfile.map((item) => (
                        <View key={item.id} style={styles.list}>
                        <Text style={styles.text}>Full Name: {item.firstName} {item.lastName}</Text>
                        <Text style={styles.text}>Phone: {item.phone}</Text>
                        <Text style={styles.text}>Date of Birth: {item.birthDate}</Text>
                        <Text style={styles.text}>Address: {item.address}, {item.country}</Text>
                        <TouchableOpacity 
                            style={{
                                margin: 5,
                                width: '40%',
                                padding: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                backgroundColor: 'blue'
                            }}
                            onPress={()=> navigation.navigate('Edit Profile', { item: userProfile[0] })}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        </View>
                        
                    ))}
                    </View>
                )}
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
  imageOne:{
    width:"70%",
    height: 100,
    resizeMode:'contain',
    marginBottom: 20,
    marginLeft: 10
  },
  headButton:{
    padding: 20,        
  },
  picHeader: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
    color: '#333', 
  },
  listContainer: {
    width: '90%',
    marginTop: 10
  },
  
  list: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image:{
    width:"70%",
    height: 150,
    resizeMode:'contain',
    margin: 15,
  },
  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 20
},
});

export default FetchUser;
