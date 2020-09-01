import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {
  const [settings, setSettings] = useState({
    isDark: false,
  });
  const [prevRegion, setPrevRegion] = useState(null);
  const [first, setFirst] = useState(false);

  const setSaveSettings = (s) => {
    setSettings(s);
    AsyncStorage.setItem('settings', JSON.stringify(s));
    setFirst(false);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        setSaveSettings,
        prevRegion,
        setPrevRegion,
        first,
        setFirst,
      }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
