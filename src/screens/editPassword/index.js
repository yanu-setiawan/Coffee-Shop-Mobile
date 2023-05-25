/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';

import styles from '../../styles/editPassword';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import {useNavigation, StackActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {changePassword} from '../../utils/https/profile';
import {showMessage} from 'react-native-flash-message';
import {err} from 'react-native-svg/lib/typescript/xml';

function EditPassword() {
  const [isShow, setShow] = useState(true);
  const [isShow2, setShow2] = useState(true);
  const [isShow3, setShow3] = useState(true);
  //   const [allow, setAllow] = useState(false);
  const [old, setOld] = useState('');
  const [news, setNews] = useState('');
  const [confirm, setConfirm] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.data);
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async event => {
    event.preventDefault();
    setIsLoading(true);
    const form = {old_password: old, new_password: confirm};
    try {
      //   if (!allow) return;
      setIsLoading(true);

      if (news == '' || confirm == '' || old == '')
        return showMessage({
          message: 'password required ',
          type: 'danger',
        });
      if (news !== confirm)
        return showMessage({
          message: 'New & Confirm Password don`t match ',
          type: 'danger',
        });
      const result = await changePassword(
        userData.id,
        form,
        controller,
        userData.token,
      );
      //   console.log(result);
      showMessage({
        message: 'Change Password Succes',
        type: 'success',
      });
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
      showMessage({
        message: error,
        type: 'danger',
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  //   const saveHandler = async () => {
  //     try {
  //       if (!allow) return;
  //       setLoading(true);
  //       if (news !== confirm)
  //         return ToastAndroid.showWithGravityAndOffset(
  //           'New & Confirm Password do not match',
  //           ToastAndroid.SHORT,
  //           ToastAndroid.TOP,
  //           25,
  //           50,
  //         );
  //       const body = {
  //         password: old,
  //         new_password: confirm,
  //       };
  //       const URL = `${process.env.BACKEND_URL}/users/account`;
  //       await axios.patch(URL, body, {headers: {'x-access-token': auth.token}});
  //       setLoading(false);
  //       setOld('');
  //       setNews('');
  //       setConfirm('');
  //       // navigation.dispatch(StackActions.replace('Profile'))
  //       navigation.goBack();
  //       return ToastAndroid.showWithGravityAndOffset(
  //         'Password changed successfully',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.TOP,
  //         25,
  //         50,
  //       );
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //       return ToastAndroid.showWithGravityAndOffset(
  //         `${error.response.data.message}`,
  //         ToastAndroid.SHORT,
  //         ToastAndroid.TOP,
  //         25,
  //         50,
  //       );
  //     }
  //   };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <IconComunity
          name={'chevron-left'}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>Edit password</Text>
      </View>
      <View style={{paddingTop: 50}}>
        <View style={{marginBottom: 15, position: 'relative'}}>
          <Text style={styles.label}>Old Password :</Text>
          <TextInput
            // value={old}
            placeholder="Enter your old password"
            style={styles.input}
            // onChangeText={setOld}
            onChangeText={text => setOld(text)}
            secureTextEntry={isShow}
          />
          <Icons
            name={isShow ? 'eye-slash' : 'eye'}
            style={styles.iconEye}
            size={15}
            onPress={() => {
              setShow(!isShow);
            }}
          />
        </View>
        <View style={{marginBottom: 15, position: 'relative'}}>
          <Text style={styles.label}>New Password :</Text>
          <TextInput
            // value={news}
            placeholder="Enter your new password"
            style={styles.input}
            onChangeText={text => setNews(text)}
            // onChangeText={setNews}
            secureTextEntry={isShow2}
          />
          <Icons
            name={isShow2 ? 'eye-slash' : 'eye'}
            style={styles.iconEye}
            size={15}
            onPress={() => {
              setShow2(!isShow2);
            }}
          />
        </View>
        <View style={{marginBottom: 15, position: 'relative'}}>
          <Text style={styles.label}>Confirm Password :</Text>
          <TextInput
            // value={confirm}
            placeholder="Enter your confirm password"
            style={styles.input}
            // onChangeText={setConfirm}
            onChangeText={text => setConfirm(text)}
            secureTextEntry={isShow3}
          />
          <Icons
            name={isShow3 ? 'eye-slash' : 'eye'}
            style={styles.iconEye}
            size={15}
            onPress={() => {
              setShow3(!isShow3);
            }}
          />
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={handleSave}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 55,
              backgroundColor: '#6A4029',
              height: 70,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Black',
                  fontSize: 17,
                }}>
                Save
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default EditPassword;
