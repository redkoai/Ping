import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import * as Location from 'expo-location';

function LocationPicker() {
  const [location, setLocation] = useState({ latitude: 34.06739, longitude: -118.3917 });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      setLocation(locationResult.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        camera={{
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          pitch: 0,
          heading: 0,
          // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
          altitude: 500,
          // Only when using Google Maps.
          zoom: 17,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(1),
    marginBottom: heightPercentageToDP(5),
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.5,
  },
});

export default LocationPicker;
