import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomModal from 'ping/src/components/CustomModal';
import CustomButton from 'ping/src/components/inputs/CustomButton';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function LocationPickerModal({ isVisible, onConfirm, onCancel }) {
  const [userLocation, setUserLocation] = useState({ latitude: 34.06739, longitude: -118.3917 });
  const [markerLocation, setMarkerLocation] = useState(null);
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
    setMarkerVisibility(true);
    console.log(markerLocation);
  };

  return (
    <CustomModal isVisible={isVisible} onCancel={onCancel} title="Pick a Location">
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
      <View style={styles.button}>
        <CustomButton primary text="Select Location" style={styles.button} disabled={!markerLocation} />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  button: {
    display: 'flex',
    //justifyContent: 'center'
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
});

export default LocationPickerModal;
