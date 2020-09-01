import React, {useContext, memo, useState, useEffect} from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GeoContext} from '../../context/GeoContext';
import {
  regionBuilder,
  getDistanceFromLatLonInKm,
  generateRandomPoints,
  colorSelector,
} from '../../Helper/Compute';
import {Text} from 'react-native-paper';
import darkMap from '../../data/darkMap.json';
import lightMap from '../../data/lightMap.json';
import {SettingsContext} from '../../context/SettingsContext';
import TrendAlert from '../Alert/TrendAlert';
import AsyncStorage from '@react-native-community/async-storage';

const Map = ({data, initial}) => {
  const {selectedPlace} = useContext(GeoContext);
  const {settings} = useContext(SettingsContext);
  const [visible, setVisible] = useState(false);
  const [trend, setTrend] = useState(null);
  const [computedData, setComputedData] = useState({
    region: initial,
    randomPoints: [],
    trends: [],
  });

  useEffect(() => {
    if (selectedPlace && data) {
      const region = regionBuilder(
        selectedPlace.geo.geometry.location.lat,
        selectedPlace.geo.geometry.location.lng,
        selectedPlace.geo.geometry.viewport.northeast.lat,
        selectedPlace.geo.geometry.viewport.southwest.lat,
      );

      AsyncStorage.setItem('previousLocation', JSON.stringify(region));

      let distance = getDistanceFromLatLonInKm(
        selectedPlace.geo.geometry.viewport.northeast.lat,
        selectedPlace.geo.geometry.viewport.northeast.lng,
        selectedPlace.geo.geometry.viewport.southwest.lat,
        selectedPlace.geo.geometry.viewport.southwest.lng,
      );
      let radius = (distance * 800) / 2; //ideal 1000

      let randomGeoPoints = generateRandomPoints(
        {
          lat: selectedPlace.geo.geometry.location.lat,
          lng: selectedPlace.geo.geometry.location.lng,
        },
        radius,
        data[0].trends.length,
      );

      let computed = {
        region: region,
        randomPoints: randomGeoPoints,
        trends: data[0].trends,
      };
      setComputedData(computed);
    }
  }, [data, selectedPlace]);

  const markerPress = (e, trend) => {
    setTrend(trend);
    setVisible(true);
  };

  const goToTrendTwitter = () => {
    Linking.canOpenURL(trend.url).then((supported) => {
      if (supported) {
        setVisible(false);
        Linking.openURL(trend.url);
      } else {
        ToastAndroid.show(
          'Could not open Trend in Twitter',
          ToastAndroid.SHORT,
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={settings.isDark ? darkMap : lightMap}
        region={computedData.region}
        moveOnMarkerPress={false}
        onRegionChangeComplete={(r) => {
          setComputedData({...computedData, region: r});
        }}>
        {computedData.randomPoints.map((item, key) => {
          return (
            <Marker
              draggable={false}
              key={key}
              coordinate={{latitude: item.lat, longitude: item.lng}}
              onPress={(e) => markerPress(e, computedData.trends[key])}>
              <View
                style={{
                  backgroundColor: colorSelector(
                    computedData.trends[key].tweet_volume,
                  ),
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    padding: 5,
                  }}>
                  {computedData.trends[key].name}
                </Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
      {trend && (
        <TrendAlert
          trend={trend}
          place={selectedPlace.place}
          visible={visible}
          onDismiss={() => setVisible(false)}
          okayPressed={goToTrendTwitter}
          cancelPressed={() => setVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default memo(Map);
