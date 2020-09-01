import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const GeoContext = createContext();

const GeoContextProvider = (props) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [fav, setFav] = useState([]);

  const setSaveFav = (s) => {
    setFav(s);
    AsyncStorage.setItem('favourites', JSON.stringify(s));
  };

  const setSaveSelectedPlace = (p) => {
    setSelectedPlace(p);
    AsyncStorage.setItem('selectedPlace', JSON.stringify(p));
  };

  return (
    <GeoContext.Provider
      value={{
        selectedPlace,
        setSelectedPlace,
        setSaveSelectedPlace,
        fav,
        setFav,
        setSaveFav,
      }}>
      {props.children}
    </GeoContext.Provider>
  );
};

export default GeoContextProvider;
