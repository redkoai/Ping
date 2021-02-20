import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import * as Location from 'expo-location';

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, textStyles } from 'ping/src/styles/styles';
import ScreenDimmer from 'ping/src/components/modals/ScreenDimmer';

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
    <ScreenDimmer>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={isVisible}
        onRequestClose={onCancel}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalInner}>
            <View style={styles.modalTopBar}>
              <TouchableOpacity onPress={onCancel}>
                <Ionicons name="close" size={22} color={colors.offBlack} />
              </TouchableOpacity>
              <Text style={textStyles.normalBold}>Pick a Location</Text>
              <View />
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
        </TouchableWithoutFeedback>
      </Modal>
    </ScreenDimmer>
  );
}

const styles = StyleSheet.create({
  modalInner: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 1.5,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 15,
  },
  modalTopBar: {
    marginTop: 5,
    marginHorizontal: 25,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
});

export default LocationPickerModal;
