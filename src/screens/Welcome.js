/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';

import styles from '../styles/welcome';

import backgroundWp from '../assets/images/wpWelcome.webp';

import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.sectionContainer}>
      <ImageBackground
        source={backgroundWp}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.innerFrame}>
          <View style={styles.wrapText}>
            <Text style={styles.text}>Welcome!</Text>
            <Text style={styles.textBot}>
              Get a cup of coffee for free every sunday morning
            </Text>
          </View>
          <View style={styles.wrapBtn}>
            <TouchableOpacity style={styles.btnUp} activeOpacity={0.8}>
              <Text
                style={styles.textBtnUp}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                Create New Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnBot} activeOpacity={0.8}>
              <Text
                style={styles.textBtnBot}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;
