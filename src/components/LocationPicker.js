import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import * as Location from 'expo-location';

function LocationPicker() {
  const [userLocation, setUserLocation] = useState({ latitude: 34.06739, longitude: -118.3917 });
  const [markerLocation, setMarkerLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [isMarkerVisible, setMarkerVisibility] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      setUserLocation(locationResult.coords);
    })();
  }, []);

  const handleMapLongPress = (e) => {
    setMarkerLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
    console.log(markerLocation);
    setMarkerVisibility(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        camera={{
          center: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          pitch: 0,
          heading: 0,
          // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
          altitude: 500,
          // Only when using Google Maps.
          zoom: 17,
        }}
        onLongPress={handleMapLongPress}
      >
        {isMarkerVisible ? <Marker coordinate={markerLocation} /> : null}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    //marginTop: heightPercentageToDP(1),
    //marginBottom: heightPercentageToDP(5),
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  map: {
    flex: 1,
  },
});

export default LocationPicker;
