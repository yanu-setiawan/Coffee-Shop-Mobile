/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../styles/login';

import backgroundWp from '../../assets/images/wpLogin.webp';
import Google from '../../assets/images/googleIcon.png';
import {usersAction} from '../../redux/slices/auth';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {profileAction} from '../../redux/slices/profile';

import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const controllerProfile = React.useMemo(() => new AbortController(), []);
  const [isLoading, setIsLoading] = useState();
  const users = useSelector(state => state.auth);
  console.log(users);

  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const handleLogin = () => {
    if (formEmail === '' || formPassword === '') {
      showMessage({
        message: 'Input required',
        type: 'danger',
      });
      return;
    }
    setIsLoading(true);
    dispatch(
      usersAction.doLogin({
        email: formEmail,
        password: formPassword,
      }),
    )
      .unwrap()
      .then(res => {
        // console.log('resss', res.id);
        showMessage({
          message: 'Welcome, Happy Shoping :)',
          type: 'success',
        });
        dispatch(
          profileAction.getProfileThunk({
            id: res.id,
            token: res.token,
            controllerProfile,
          }),
        );
        navigation.navigate('Home');
        setIsLoading(false);
      })
      .catch(error => {
        console.log('user', error);
        setIsLoading(false);
        showMessage({
          message: error,
          type: 'danger',
        });
      });
  };

  const handleGoogle = () => {
    console.log('p');
    navigation.navigate('Home');
  };

  return (
    <>
      <View style={styles.sectionContainer}>
        <ImageBackground
          source={backgroundWp}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.innerFrame}>
            <View style={styles.wrapText}>
              <Text style={styles.text}>Login</Text>
            </View>
            <TextInput
              onChangeText={text => setFormEmail(text)}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'white'}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'white'}
              secureTextEntry={true}
              onChangeText={text => setFormPassword(text)}
            />
            <View>
              <Text
                style={styles.forgot}
                onPress={() => {
                  navigation.navigate('Forgot');
                }}>
                Forgot password?
              </Text>
            </View>

            <View style={styles.wrapBtn}>
              <TouchableOpacity
                style={styles.btnUp}
                activeOpacity={0.8}
                onPress={handleLogin}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#6A4029" />
                ) : (
                  <Text style={styles.textBtnUp}>Login</Text>
                )}
              </TouchableOpacity>
              <View style={styles.wrapView}>
                <View style={styles.hr1}></View>
                <Text style={styles.pHr}>Or Login in with</Text>
                <View style={styles.hr2}></View>
              </View>
              <TouchableOpacity style={styles.btnBot} activeOpacity={0.8}>
                <Image source={Google} style={styles.google} alt="GOOGLE" />
                <Text style={styles.textBtnBot}>Login with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Login;
