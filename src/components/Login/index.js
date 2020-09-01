import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  Pressable,
  Text,
} from 'react-native';
import {Headline, useTheme, Subheading} from 'react-native-paper';
import {auth} from 'react-native-twitter';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlert from '../Alert';

const logo = require('../../../assets/graph.png');
import Mountains from '../../../assets/Mountains.svg';
import SplashScreen from 'react-native-splash-screen';

const Login = () => {
  const theme = useTheme();
  const {tokens, setTokens, setAuthorized, setUserId, setUserName} = useContext(
    AuthContext,
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const loginWithTwitter = () => {
    setVisible(false);
    auth(
      {
        consumerKey: tokens.consumerKey,
        consumerSecret: tokens.consumerSecret,
      },
      'trendy://',
    )
      .then(({accessToken, accessTokenSecret, id, name}) => {
        const newTokens = {
          ...tokens,
          accessToken,
          accessTokenSecret,
        };

        setTokens(newTokens);
        setUserId(id);
        setUserName(name);

        const firstPair = ['twitter@tokens', JSON.stringify(newTokens)];
        const secondPair = ['userName', name];

        //ToastAndroid.show(`Logged in as ${name}`, ToastAndroid.SHORT);

        AsyncStorage.multiSet([firstPair, secondPair])
          .then((success) => {
            console.log('Success! Login Data Saved');
          })
          .catch((err) => {
            console.log('Error from Login AsyncStorage: ', err);
            ToastAndroid.show(
              'Login Failed, Please Try Again.',
              ToastAndroid.SHORT,
            );
          });

        setAuthorized(true);
      })
      .catch((err) => {
        console.log('Error from login Twitter: ', err);
        ToastAndroid.show(
          'Login Failed, Please Try Again.',
          ToastAndroid.SHORT,
        );
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 50,
          }}>
          <Image source={logo} style={{height: 120, width: 120}} />
          <Headline style={{marginTop: 10, color: '#000'}}>Trendy</Headline>
          <Subheading>Be Aware of the World</Subheading>
        </View>

        <Pressable
          style={styles.loginBtn}
          onPress={() => setVisible(true)}
          android_ripple={{
            color: theme.colors.primary,
            borderless: false,
            radius: 200,
          }}>
          <Icon
            name="twitter"
            color="#2E86C1"
            size={28}
            style={{marginHorizontal: 5}}
          />
          <Text style={{fontSize: 20, fontFamily: 'Pompiere'}}>
            Login With Twitter
          </Text>
        </Pressable>
        <CustomAlert
          title="Confirmation"
          message="You will be redirected to Twitter website. Please Allow Trendy to work alongside twitter."
          okayText="Okay"
          cancelText="No"
          visible={visible}
          onDismiss={() => setVisible(false)}
          okayPressed={() => loginWithTwitter()}
          cancelPressed={() => setVisible(false)}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#f7faff',
        }}>
        <View
          style={{
            height: 200,
            position: 'absolute',
            flexDirection: 'row',
            bottom: 0,
            justifyContent: 'space-between',
          }}>
          <Mountains />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7faff',
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3498DB',
    color: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
});

export default Login;
