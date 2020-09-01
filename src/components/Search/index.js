import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar, useTheme, Snackbar} from 'react-native-paper';

import {GeoContext} from '../../context/GeoContext';
import PlacesList from './PlacesList';
import FavList from './FavList';
import ChildHeader from '../Header/ChildHeader';

const Search = ({navigation}) => {
  const theme = useTheme();

  const {selectedPlace, setSaveSelectedPlace, fav, setSaveFav} = useContext(
    GeoContext,
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(false);
  const [snackBarContent, setSnackBarContent] = useState('');

  const placeSelected = (place) => {
    if (selectedPlace) {
      if (selectedPlace.place.woeid !== place.place.woeid) {
        setSaveSelectedPlace(place);
      }
    } else {
      setSaveSelectedPlace(place);
    }
    navigation.goBack();
  };

  const addToFav = (place) => {
    if (fav.length > 0) {
      for (let i = 0; i < fav.length; i++) {
        if (fav[i].place.woeid === place.place.woeid) {
          setSnackBarContent(
            `${place.place.name} is Already in Favourites List`,
          );
          setVisible(true);
          return;
        }
      }
    }
    let newFavs = [...fav, place];
    setSaveFav(newFavs);
    setSnackBarContent(`Added ${place.place.name} to Favourites List`);
    setVisible(true);
  };

  const removeFromFav = (place) => {
    let newFavs = fav.filter((p) => p.place.woeid !== place.place.woeid);
    setSaveFav(newFavs);
    setSnackBarContent(`Removed ${place.place.name} from Favourites List`);
    setVisible(true);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}>
      <ChildHeader title="Search" navigation={navigation} />
      <Searchbar
        placeholder="Search by your country or nearby area"
        onChangeText={(term) => setSearchTerm(term)}
        value={searchTerm}
        style={styles.searchBar}
      />

      <FavList
        fav={fav}
        removeFromFav={(p) => removeFromFav(p)}
        placeSelected={(p) => placeSelected(p)}
      />

      <PlacesList
        searchTerm={searchTerm}
        addToFav={(p) => addToFav(p)}
        placeSelected={(p) => placeSelected(p)}
      />

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Okay',
          onPress: () => setVisible(false),
        }}>
        {snackBarContent}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 5,
  },
});

export default Search;
