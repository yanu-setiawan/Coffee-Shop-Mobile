/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useMemo} from 'react';

import styles from '../../styles/register';

import backgroundWp from '../../assets/images/wpRegister.webp';
import Google from '../../assets/images/googleIcon.png';
import {register} from '../../utils/https/auth';

import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const controller = useMemo(() => new AbortController(), []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const form = {
    email: email,
    password: password,
    phone_number: phone,
  };

  const registerHandler = async () => {
    setIsLoading(true);
    try {
      if (form.email == '' || form.password == '' || form.phone_number == '') {
        return showMessage({
          message: 'Input required',
          type: 'danger',
        });
      }
      const result = await register(form, controller);
      showMessage({
        message: 'Register Successfully',
        type: 'success',
      });
      navigation.navigate('Login');
      console.log(result);
    } catch (error) {
      setIsLoading(false);
      return showMessage({
        message: error.response.data.msg,
        type: 'danger',
      });
      // console.log(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <ImageBackground
        source={backgroundWp}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.innerFrame}>
          <View style={styles.wrapText}>
            <Text style={styles.text}>Sign Up</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email address"
            placeholderTextColor={'white'}
            // keyboardType="text"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            placeholderTextColor={'white'}
            // keyboardType="text"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your Phone Number"
            placeholderTextColor={'white'}
            onChangeText={text => setPhone(text)}
            keyboardType="numeric"
          />
          <View style={styles.wrapBtn}>
            <TouchableOpacity style={styles.btnUp} activeOpacity={0.8}>
              <Text style={styles.textBtnUp} onPress={registerHandler}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Text style={styles.textBtnUp}>Create Acount</Text>
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnBot} activeOpacity={0.8}>
              <Image source={Google} style={styles.google} alt="GOOGLE" />
              <Text style={styles.textBtnBot}>Sign-up with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Register;
