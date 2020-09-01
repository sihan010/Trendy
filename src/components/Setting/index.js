import {
  Button,
  Divider,
  List,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {SettingsContext} from '../../context/SettingsContext';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import ChildHeader from '../Header/ChildHeader';
import CustomAlert from '../Alert';

const Settings = ({navigation}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const {settings, setSaveSettings} = useContext(SettingsContext);
  const {setAuthorized, userName} = useContext(AuthContext);

  const logoutPressed = () => {
    const keys = ['twitter@tokens', 'favourites', 'selectedPlace', 'userName'];
    AsyncStorage.multiRemove(keys).then((success) => {
      setAuthorized(false);
    });
  };

  return (
    <>
      <ChildHeader title="Settings" navigation={navigation} />
      <View
        style={{...styles.container, backgroundColor: theme.colors.surface}}>
        <View>
          <List.Item
            title="Theme"
            description="Toggle Dark Theme"
            left={(props) => <List.Icon {...props} icon="brightness-4" />}
            right={(props) => (
              <Switch
                {...props}
                color={theme.colors.accent}
                value={settings.isDark}
                onValueChange={() =>
                  setSaveSettings({...settings, isDark: !settings.isDark})
                }
              />
            )}
          />
          <Divider />
          <Button
            onPress={() => setVisible(true)}
            color={theme.colors.error}
            style={{margin: 10}}
            icon="logout"
            mode="contained">
            Logout
          </Button>
        </View>

        <View>
          <Divider />
          <Text style={styles.text}>
            <Icon name="login" color={theme.colors.accent} size={20} /> Logged
            in As {userName}
          </Text>
          <Text style={styles.text}>
            Made with <Icon name="heart" color="red" size={20} /> in Bangladesh
          </Text>
        </View>
      </View>
      <CustomAlert
        title="Are you Sure?"
        message="Since we have no tracking policy, All your data will be lost."
        okayText="Okay"
        cancelText="Nope"
        visible={visible}
        onDismiss={() => setVisible(false)}
        okayPressed={logoutPressed}
        cancelPressed={() => setVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    alignSelf: 'center',
  },
});

export default Settings;
