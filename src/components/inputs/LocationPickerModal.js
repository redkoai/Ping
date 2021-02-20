import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, textStyles } from 'ping/src/styles/styles';

function LocationPickerModal({ isVisible, onConfirm, onCancel }) {
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
    setMarkerVisibility(true);
    console.log(markerLocation);
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onCancel}
        onBackdropPress={onCancel}
        style={styles.container}
        useNativeDriverForBackdrop
      >
        <View style={styles.modalInner}>
          <View style={styles.modalTopBar}>
            <TouchableOpacity onPress={onCancel} style={styles.modalTopLeft}>
              <Ionicons name="close" size={22} color={colors.offBlack} />
            </TouchableOpacity>
            <Text style={[textStyles.normalBold, styles.modalTopCenter]}>Pick a Location</Text>
          </View>
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
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  modalInner: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 1.8,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
  },
  modalTopBar: {
    marginTop: 7,
    marginHorizontal: 25,
    height: 45,
    display: 'flex',
  },
  modalTopLeft: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 0,
  },
  modalTopCenter: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
  },
  modalTopRight: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
  },
  map: {
    flex: 1,
  },
});

export default LocationPickerModal;
