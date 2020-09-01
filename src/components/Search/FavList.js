import React, {memo, useContext} from 'react';
import {View} from 'react-native';
import {List, useTheme, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SettingsContext} from '../../context/SettingsContext';

const FavList = ({fav, placeSelected, removeFromFav}) => {
  const theme = useTheme();
  const {settings} = useContext(SettingsContext);
  return fav.length > 0 ? (
    <List.Section>
      <List.Accordion
        title="Favourites"
        titleStyle={
          settings.isDark ? {color: '#fff'} : {color: theme.colors.accent}
        }
        left={(props) => <List.Icon {...props} icon="heart" color="#FF69B4" />}>
        {fav.map((item, key) => {
          return (
            <View key={key}>
              <List.Item
                key={key}
                title={item.place.name}
                description={item.geo.formatted_address}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="heart"
                    size={30}
                    color="#FF69B4"
                  />
                )}
                right={() => (
                  <Icon
                    style={{alignSelf: 'center'}}
                    name="close"
                    size={24}
                    color={theme.colors.error}
                    onPress={() => removeFromFav(item)}
                  />
                )}
                onPress={() => placeSelected(item)}
              />
              <Divider />
            </View>
          );
        })}
      </List.Accordion>
    </List.Section>
  ) : null;
};

export default memo(FavList);
