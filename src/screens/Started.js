/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';

import styles from '../styles/started';

import backgroundWp from '../assets/images/wpStart.webp';

import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Started = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.sectionContainer}>
      <ImageBackground
        source={backgroundWp}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.innerFrame}>
          <Text style={styles.text}>Coffee for Everyone</Text>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text
              style={styles.textBtn}
              onPress={() => {
                navigation.navigate('Welcome');
              }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Started;
