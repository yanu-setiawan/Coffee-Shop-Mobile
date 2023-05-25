/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {View, Text, ImageBackground, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {profileAction} from '../../redux/slices/profile';
import Lottie from 'lottie-react-native';
import animation from '../../assets/lottie/coffee.json';
import jwtDecode from 'jwt-decode';
import auth from '../../redux/slices/auth';
import {usersAction} from '../../redux/slices/auth';
// import {profileAction} from '../../redux/slices/profile';
import {authLogout} from '../../utils/https/auth';
function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {token, id} = useSelector(state => state.auth.data);
  const auth = useSelector(state => state.auth.data);
  const profile = useSelector(state => state.profile.data);
  // const profileRedux = useSelector(state => state.profile.err);
  const controllerProfile = useMemo(() => new AbortController(), []);

  // const controller = useMemo(() => new AbortController(), []);

  // // Mendekode token
  // const decodedToken = jwtDecode(token);

  // // Mendapatkan waktu kadaluwarsa dari token
  // const expirationTime = decodedToken.exp;

  // const currentTime = Date.now() / 1000;
  // if (expirationTime < currentTime) {
  //   dispatch(usersAction.authLogout());
  //   dispatch(profileAction.filter());
  //   authLogout(controller, auth.token);
  // } else {
  //   dispatch(
  //     profileAction.getProfileThunk({
  //       id,
  //       controllerProfile,
  //       token,
  //     }),
  //   );
  // }

  // // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (auth.isFulfilled == true) {
  //     if (auth.data.exp * 1000 < Date.now()) {
  //       dispatch(usersAction.authLogout());
  //       dispatch(profileAction.filter());
  //       authLogout(controller, auth.token)
  //         .then(result => {
  //           console.log('success logout');
  //         })
  //         .catch(err => {
  //           console.log(err.response.data);
  //         });
  //     }
  //     // console.log(profile);
  //     dispatch(profileAction.getProfileThunk({token: auth.token, controller}));
  //   } else {
  //     if (profile.isFulfilled) {
  //       dispatch(profileAction.filter());
  //     }
  //   }
  // }, [auth.isFullfilled == true]);

  const fetchProfile = async () => {
    // console.log('start');
    try {
      const result = await dispatch(
        profileAction.getProfileThunk({
          id,
          token,
          controllerProfile,
        }),
      );
      // console.log('staccc', result.error.message);
      if (result.error?.message === 'Request failed with status code 403') {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('Started'));
        }, 5000);
      } else {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('Home'));
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('Started'));
      }, 5000);
    }
  };

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('Started'));
      }, 5000);
    } else {
      fetchProfile();
      // navigation.dispatch(StackActions.replace('Home'));
    }
  }, [navigation, token]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F3F3F3',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 8,
      }}>
      <Lottie source={animation} autoPlay loop resizeMode="contain" />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 28,
          fontFamily: 'Poppins-Bold',
          color: '#6A4029',
          marginTop: 300,
        }}>
        Coffee Shop
      </Text>
    </View>
  );
}

export default SplashScreen;
