import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ref, onValue } from 'firebase/database';

export default function WeekSummary() {
  const [travelData, setTravelData] = useState([]);
  const [distanceSum, setDistanceSum] = useState({});
  const [buttonPressed, setButtonPressed] = useState(false); 

  useEffect(() => {
    const dataRef = ref(db, `${auth.currentUser.uid}/journey`);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setTravelData(Object.values(data));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const calculateDistanceSum = () => {
    if (travelData.length > 0) {
      const sumByMode = {};

      travelData.forEach((travel) => {
        const { distance, travelMode } = travel;

        if (sumByMode[travelMode]) {
          sumByMode[travelMode] += distance;
        } else {
          sumByMode[travelMode] = distance;
        }
      });

      setDistanceSum(sumByMode);
      setButtonPressed(true); 
    } else {
      console.log("No travel data available.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={calculateDistanceSum}>
        <Text style={styles.text}>Distance Summary</Text>
      </TouchableOpacity>
      {buttonPressed && travelData && ( // Render only when buttonPressed is true
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Total:</Text>
          {Object.entries(distanceSum).map(([mode, sum]) => (
            <Text key={mode}>{`${mode}: ${sum.toFixed(2)} Km`}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

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
    marginBottom: 5,
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