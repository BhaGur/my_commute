import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const apiKey = `${process.env.WEATHER_API_KEY}`; 

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude);
      setLocation(location.coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
 
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };


  return (
    <View>
      <Button title="Current Weather" onPress={getWeather} />
      {weather && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png` }}
            style={{ width: 100, height: 100 }}
          />
          <View>
            <Text style={{ fontSize: 15 }}>{`Location: ${weather.name}`}</Text>
            <Text style={{ fontSize: 15 }}>{`Temperature: ${Math.round(weather.main.temp)}°C`}</Text>
            <Text style={{ fontSize: 14 }}>{`Description: ${weather.weather && 
              weather.weather[0].description.charAt(0).toUpperCase()}${weather.weather[0].description.slice(1)}`}</Text>
          </View>
        </View>
      )}
      {error !== '' && <Text>{error}</Text>}

    </View>
  );
};

export default Weather;

