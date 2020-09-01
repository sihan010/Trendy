import React, {memo} from 'react';
import {View, FlatList} from 'react-native';
import {List, Divider, Text} from 'react-native-paper';
import {createFilter} from 'react-native-search-filter';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import geo from '../../data/geo.json';

const PlacesList = ({searchTerm, addToFav, placeSelected}) => {
  const KEYS_TO_FILTERS = ['place.name', 'place.country'];
  const filteredGeo = geo.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  const renderItem = (item) => {
    return (
      <List.Item
        key={item.place.woeid.toString()}
        title={item.place.name}
        description={item.geo.formatted_address}
        left={(props) => (
          <List.Icon {...props} icon="map-marker" size={30} color="green" />
        )}
        right={() => (
          <Icon
            style={{alignSelf: 'center'}}
            name="heart-outline"
            size={24}
            color="gray"
            onPress={() => addToFav(item)}
          />
        )}
        onPress={() => placeSelected(item)}
      />
    );
  };

  return (
    <>
      <FlatList
        data={filteredGeo}
        keyExtractor={(item) => item.place.woeid.toString()}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        removeClippedSubviews={true}
        renderItem={({item}) => renderItem(item)}
        ItemSeparatorComponent={() => <Divider />}
        ListHeaderComponent={() => (
          <List.Subheader>{`Total ${filteredGeo.length} Places With Available Trend`}</List.Subheader>
        )}
        ListEmptyComponent={() => (
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              color: 'red',
            }}>{`May be "${searchTerm}" is not supported yet.`}</Text>
        )}
      />
    </>
  );
};

export default memo(PlacesList);
