import React, {useState, useEffect, useContext, useCallback} from 'react';
import {ToastAndroid, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView from './MapView';
import {AuthContext} from '../../context/AuthContext';
import twitter from 'react-native-twitter';
import {FAB} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';

import {GeoContext} from '../../context/GeoContext';
import MainHeader from '../Header/MainHeader';
import {SettingsContext} from '../../context/SettingsContext';
import SplashScreen from 'react-native-splash-screen';
import {Snackbar} from 'react-native-paper';

const Map = ({navigation}) => {
  const {tokens} = useContext(AuthContext);
  const {selectedPlace} = useContext(GeoContext);
  const {prevRegion} = useContext(SettingsContext);

  const [trendData, setTrendData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [initialLocation, setInitialLocation] = useState(() => {
    if (prevRegion) return prevRegion;
    else
      return {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
  });

  useEffect(() => {
    //readPermission();
    if (selectedPlace) {
      const {rest} = twitter(tokens);
      rest.get('trends/place', {id: selectedPlace.place.woeid}).then((data) => {
        setTrendData(data);
        SplashScreen.hide();
      });
    } else {
      setVisible(true);
      SplashScreen.hide();
    }
  }, [selectedPlace]);

  const readPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Trendy Needs Location Permission',
          message: 'This is important to show your location on Map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location Permission Granted');
        Geolocation.getCurrentPosition((info) => {
          console.log(info);
          let currentLocation = {
            latitude: info.latitude,
            longitude: info.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };
          setInitialLocation(currentLocation);
        });
      } else {
        console.log('Location Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <MainHeader navigation={navigation} />
      <MapView data={trendData} initial={initialLocation} />
      <FAB
        style={styles.fab}
        icon="magnify"
        onPress={() => navigation.navigate('Search')}
      />
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Okay',
          onPress: () => setVisible(false),
        }}>
        Select a place to visualize Trends
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Map;
