import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth} from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function WeekSummary() {
    const [distanceSumByDayAndTravelMode, setDistanceSumByDayAndTravelMode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function fetchData() {
        setLoading(true);
        setError(null);

        const dataRef = ref(db, `${auth.currentUser.uid}/journey`);
        onValue(
            dataRef,
            (snapshot) => {
                const data = snapshot.val();
                const sumByDayAndTravelMode =
                    sumDistancesByDayAndTravelMode(data);
                    setDistanceSumByDayAndTravelMode(sumByDayAndTravelMode);
                    setLoading(false);
            },
            (error) => {
                setError(error.message);
                setLoading(false);
            }
        );
    }

    function sumDistancesByDayAndTravelMode(data) {
        const distanceSumByDayAndTravelMode = {};
    
        Object.values(data).forEach((entry) => {
          const chosenDate = new Date(entry.chosenDate);
          const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(chosenDate);
    
          const travelMode = entry.travelMode;
          const distance = entry.distance;
    
          const key = `${dayOfWeek} - ${travelMode}`;
    
          if (key in distanceSumByDayAndTravelMode) {
            distanceSumByDayAndTravelMode[key] += distance;
          } else {
            distanceSumByDayAndTravelMode[key] = distance;
          }
    
          console.log(dayOfWeek);
        });
    
        return distanceSumByDayAndTravelMode;
      }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={fetchData}>
                <Text style={styles.text}>Weekly</Text>
            </TouchableOpacity>

            {loading && <Text style={styles.loadingText}>Loading...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {distanceSumByDayAndTravelMode && (
                <View style={styles.result}>
                    <Text style={styles.resultTitle}>Result:</Text>
                    {Object.entries(distanceSumByDayAndTravelMode).map(([key, sumDistance]) => (
                    <Text key={key}>{`${key}: ${sumDistance} Km`}</Text>
                    ))}
                </View>
            )}    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'grey',
      },
      text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      result: {
        marginTop: 10,
        alignContent: 'center',
      },
      resultTitle: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '700',
      },
      loadingText: {
        marginTop: 10,
        color: 'gray',
        fontStyle: 'italic',
      },
      errorText: {
        marginTop: 10,
        color: 'red',
        fontStyle: 'italic',
      },
});