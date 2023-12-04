import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const googleKey = `${process.env.REACT_APP_GOOGLE_API_KEY}`
// Constants for map settings
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 60.200692,
  longitude: 24.934302,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

// Define the InputAutocomplete component
const InputAutocomplete = ({ label, placeholder, onPlaceSelected }) => {
  return (
    <View>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: googleKey,
          language: "en",
        }}
      />
    </View>
  );
};

// Define the main App component
const CommuteInfo = () => {
  // State variables
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [travelMode, setTravelMode] = useState("WALKING"); // Default to walking
  const mapRef = useRef(null);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const dateLong = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Function to animate the map camera to a specified position
  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  // Edge padding settings for fitting the coordinates on the map
  const edgePadding = {
    top: 400,
    right: 70,
    bottom: 50,
    left: 70,
  };

  // Callback function for when the route is ready
  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
    }
  };

  // Function to initiate route tracing
  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  // Callback function for when a place is selected
  const onPlaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    if (details) {
      const position = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      };
      set(position);
      moveTo(position);
    }
  };
  // Render the main view
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={googleKey}
            strokeColor="#6644ff"
            strokeWidth={4}
            mode={travelMode}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <SafeAreaView>
          <Button onPress={showDatepicker} title="Select a date" />
          <Text style={{marginTop: 5, marginBottom: 3, fontSize: 15}}>Date Selected: {date.toLocaleDateString(undefined, dateLong)}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              onChange={onChange}
            />
          )}
        </SafeAreaView>
        <InputAutocomplete
          label="Origin"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        />
        <InputAutocomplete
          label="Destination"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        />
        
        <Text style={styles.text}>Select a mode of transport</Text>
        <Picker
          selectedValue={travelMode}
          onValueChange={(itemValue) => setTravelMode(itemValue)}
          style={styles.picker}
        >
          <Picker.Item style={styles.pickerItem} label="Walking" value="WALKING" />
          <Picker.Item style={styles.pickerItem} label="Bicycling" value="BICYCLING" />
          <Picker.Item style={styles.pickerItem} label="Transit" value="TRANSIT" />
          <Picker.Item style={styles.pickerItem} label="Driving" value="DRIVING" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Trace route</Text>
        </TouchableOpacity>
        {distance ? (
          <View>
            <Text style={{marginTop: 8, marginBottom: 8, fontSize: 15}}>Distance: {distance.toFixed(2)} km</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

// Styles for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#888",
    borderWidth: 1,
  },
  pickerItem: {
    fontSize: 16,
    color: "#000", // Adjust color as needed
  },
  text:{
    marginTop:3,
    fontSize: 13
  }
});

// Export the App component as the default export
export default CommuteInfo;
