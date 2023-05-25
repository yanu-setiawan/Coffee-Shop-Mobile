/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';
import animation from '../../assets/lottie/coffeeLoading.json';

const LoaderScreen = () => (
  <View style={[styles.container, styles.horizontal]}>
    <Lottie source={animation} autoPlay loop resizeMode="contain" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 10,
    // marginTop: 60,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoaderScreen;
