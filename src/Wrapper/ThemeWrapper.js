import React, {useContext} from 'react';
import {
  DefaultTheme,
  DarkTheme,
  configureFonts,
  Provider as PaperProvider,
} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {SettingsContext} from '../context/SettingsContext';

const ThemeWrapper = (props) => {
  const {settings} = useContext(SettingsContext);
  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Pompiere',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Pompiere',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Pompiere',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Pompiere',
        fontWeight: 'Pompiere',
      },
    },
  };
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2980B9',
      accent: '#212F3D',
      status: '#2874A6',
    },
    fonts: configureFonts(fontConfig),
  };

  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#000',
      accent: '#2980B9',
      status: '#000',
    },
    fonts: configureFonts(fontConfig),
  };

  return (
    <PaperProvider theme={settings.isDark ? darkTheme : theme}>
      <StatusBar
        backgroundColor={
          settings.isDark ? darkTheme.colors.status : theme.colors.status
        }
        barStyle={settings.isDark ? 'light-content' : 'dark-content'}
      />
      {props.children}
    </PaperProvider>
  );
};

export default ThemeWrapper;
