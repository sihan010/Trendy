import React, {useEffect, useContext, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import MainStack from '../router/MainStack';
import Login from '../components/Login';
import {SettingsContext} from '../context/SettingsContext';
import Slider from '../components/Slider';
import {GeoContext} from '../context/GeoContext';
import ThemeWrapper from './ThemeWrapper';
import SplashScreen from 'react-native-splash-screen';

const Initiator = (props) => {
  const [loading, setLoading] = useState(true);
  const {setTokens, authorized, setAuthorized, setUserName} = useContext(
    AuthContext,
  );
  const {setSettings, setPrevRegion, first, setFirst} = useContext(
    SettingsContext,
  );
  const {setFav, setSelectedPlace} = useContext(GeoContext);

  useEffect(() => {
    AsyncStorage.multiGet([
      'twitter@tokens',
      'settings',
      'favourites',
      'selectedPlace',
      'userName',
      'previousLocation',
    ]).then((values) => {
      let tokens = values[0][1];
      let settings = values[1][1];
      let favourites = values[2][1];
      let selected = values[3][1];
      let userName = values[4][1];
      let prevRegion = values[5][1];
      if (tokens) {
        setTokens(JSON.parse(tokens));
        setAuthorized(true);
      }

      if (settings) {
        setSettings(JSON.parse(settings));
      } else setFirst(true);

      if (userName) {
        setUserName(userName);
      }

      if (favourites) {
        setFav(JSON.parse(favourites));
      } else {
        setFav([]);
      }
      if (selected) {
        setSelectedPlace(JSON.parse(selected));
      }
      if (prevRegion) {
        setPrevRegion(JSON.parse(prevRegion));
      }
    });
    SplashScreen.hide();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../../assets/graph.png')}
        style={{width: 200, height: 200, resizeMode: 'cover', marginBottom: 10}}
      />
      <ActivityIndicator size="large" color="#3498DB" />
    </View>
  ) : first ? (
    <Slider />
  ) : (
    <ThemeWrapper>{authorized ? <MainStack /> : <Login />}</ThemeWrapper>
  );
};

export default Initiator;
