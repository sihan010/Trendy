import {Appbar, Headline, useTheme} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';

import React from 'react';

const logo = require('../../../assets/graph.png');

const MainHeader = (props) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{backgroundColor: theme.colors.primary}}>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Headline style={styles.text}>Trendy</Headline>
      </View>
      <Appbar.Action
        icon="cog"
        size={30}
        color={theme.colors.accent}
        onPress={() => props.navigation.navigate('Setting')}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  image: {
    height: 35,
    width: 35,
  },
  text: {
    marginLeft: 20,
  },
});

export default MainHeader;
