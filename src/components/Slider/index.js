import React, {useContext, useEffect} from 'react';
import {View, SafeAreaView, Text, Image, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SettingsContext} from '../../context/SettingsContext';
import SplashScreen from 'react-native-splash-screen';

const Slider = () => {
  const {settings, setSaveSettings} = useContext(SettingsContext);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const slides = [
    {
      key: '1',
      title: 'Keep yourself updated',
      text: 'Know worldwide latest trending topics easily & conveniently',
      image: require('../../../assets/statistics.png'),
      backgroundColor: '#1ABC9C',
    },
    {
      key: '2',
      title: 'No Tracking',
      text: 'Each and Every information stays on your device.',
      image: require('../../../assets/engineer.png'),
      backgroundColor: '#1ABC9C',
    },
    {
      key: '3',
      title: 'Dark Theme',
      text: 'Fully Featured Dark theme to reduce eye strain',
      image: require('../../../assets/innovation.png'),
      backgroundColor: '#1ABC9C',
    },
  ];

  const renderButton = (icon) => {
    return (
      <View
        styles={{
          width: 40,
          height: 40,
          backgroundColor: '#000000',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={icon} color="#ffffff" size={34} />
      </View>
    );
  };

  const renderItem = (item) => {
    let details = item.item;
    return (
      <SafeAreaView
        style={{
          ...styles.container,
          flex: 1,
          backgroundColor: details.backgroundColor,
        }}>
        <View style={{...styles.container, flex: 2}}>
          <Text style={styles.title}>{details.title}</Text>
        </View>
        <View style={{...styles.container, flex: 4}}>
          <Image
            resizeMode="contain"
            source={details.image}
            style={styles.image}
          />
        </View>
        <View style={{...styles.container, flex: 2}}>
          <Text style={styles.details}>{details.text}</Text>
        </View>
      </SafeAreaView>
    );
  };

  const onDone = () => {
    let newSetting = {...settings, first: false};
    setSaveSettings(newSetting);
  };

  return (
    <AppIntroSlider
      showPrevButton
      renderItem={renderItem}
      renderDoneButton={() => renderButton('check')}
      renderNextButton={() => renderButton('chevron-right')}
      renderPrevButton={() => renderButton('chevron-left')}
      data={slides}
      onDone={onDone}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Pompiere',
  },
  details: {
    fontSize: 20,
    paddingVertical: 10,
    fontFamily: 'Pompiere',
  },
  image: {
    height: 150,
    width: 150,
  },
});

export default Slider;
