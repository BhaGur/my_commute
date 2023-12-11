import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase';
import { ref, onValue } from 'firebase/database';

const FecthData = () => {
    const [journey, setJourney] = useState([]);

    useEffect (() => {
        const starCountRef = ref(db, auth.currentUser.uid + '/journey');
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
        const parts = fullAddress.split(','); 
        const streetName = parts[0].trim(); 
        const cityWithCode = parts[1].trim(); 
      
        const cityWithoutCode = cityWithCode.replace(/\d+/g, '').trim();
      
        return { streetName, city: cityWithoutCode };
    };
      
    const renderItem = ({ item }) => {
        const travelModeColor = getColor(item.travelMode);

        return(
            <View style={[styles.list, {backgroundColor: travelModeColor}]}>  
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
        );
    };

    getColor = (item) => {
        if ( item === 'WALKING') {
            return 'lightgreen';
        }
        if ( item === 'BICYCLING') {
            return 'deepskyblue';
        }
        if ( item === 'TRANSIT') {
            return 'khaki';
        }
        if ( item === 'DRIVING') {
            return 'red';
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Journey History</Text>
            {journey.length === 0 ? (
                <View style={styles.centeredMessage}>
                    <Text style={styles.noJourneyMessage}>No journeys yet!</Text>
                </View>    
            ) : (
                <FlatList data={journey} keyExtractor={(item) => item.id} renderItem={renderItem} />
            )}
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
      margin: 20,
      fontWeight: 'bold'  
    },
    list: {
      backgroundColor: '#f9c2ff',
      paddingStart: 15,
      padding: 5,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 8
    },
    centeredMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noJourneyMessage: {
        fontSize: 20,
        textAlign: 'center',
        color: 'red'
      },
});

export default FecthData;