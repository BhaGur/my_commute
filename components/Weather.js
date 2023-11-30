import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'b0ce5a4c1ef13bf55942632ba8c32663'; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=helsinki&appid=${apiKey}`
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
      <Button title="Get Weather" onPress={getWeather} />
      {weather && (
        <View>
          <Text>{`Temperature: ${Math.round(weather.main.temp - 273.15)}°C`}</Text>
          <Text>{`Description: ${
            weather.weather && weather.weather[0].description
          }`}</Text>
        </View>
      )}
      {error !== '' && <Text>{error}</Text>}
    </View>
  );
};

export default Weather;

