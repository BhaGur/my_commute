import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase';
import { ref, onValue } from 'firebase/database';

const FecthData = () => {
    const [journey, setJourney] = useState([]);

    useEffect (() => {
        const starCountRef = ref(db, 'commuteData/' + auth.currentUser.uid );
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const items = [];
            for ( let id in data) {
                items.push({id, ...data[id]})
            }
            setJourney(items);
        });
    },[]);

    const extractStreetAndCity = (fullAddress) => {
        const parts = fullAddress.split(','); // Split the address by comma
        const streetName = parts[0].trim(); // Extract and trim the street name
        const cityWithCode = parts[1].trim(); // Extract and trim the city with code
      
        // Use a regular expression to remove the code (assumes the code is numeric)
        const cityWithoutCode = cityWithCode.replace(/\d+/g, '').trim();
      
        return { streetName, city: cityWithoutCode };
      };
      
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Your Journey History</Text>
            <FlatList
                data={journey}
                keyExtractor={item => item.id}
                renderItem={({item}) =>(
                    <View style={styles.list}>  
                        <Text style={{fontSize: 15}}>Date: {item.chosenDate}</Text>
                        <Text style={{ fontSize: 15 }}>
                            Start: {extractStreetAndCity(item.origin).streetName}, {extractStreetAndCity(item.origin).city}
                        </Text>
                        <Text style={{ fontSize: 15 }}>
                            Finish: {extractStreetAndCity(item.destination).streetName}, {extractStreetAndCity(item.destination).city}
                        </Text>               
                        <Text style={{fontSize: 15}}>Distance: {item.distance} KM</Text>
                        <Text style={{ fontSize: 15 }}>
                            Travel mode: {item.travelMode.charAt(0).toUpperCase() + item.travelMode.slice(1).toLowerCase()}
                        </Text>
                    </View>
                )} 
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: 20,
      fontWeight: 'bold'  
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    list: {
        margin: 25,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'   
    }
});

export default FecthData;