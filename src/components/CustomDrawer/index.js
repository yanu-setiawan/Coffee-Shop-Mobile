/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useMemo} from 'react';
import imgDefault from '../../assets/images/defaultProfile.png';
import {Divider} from '@rneui/themed';
// import styles from './styles';
import chat from '../../assets/images/chat.png';
import cart from '../../assets/images/shopping-cart.png';
import pp from '../../assets/images/profileee.png';
import burger from '../../assets/images/burger.png';
import placeHolder from '../../assets/images/place00.jpg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {authLogout} from '../../utils/https/auth';
import {usersAction} from '../../redux/slices/auth';
import {profileAction} from '../../redux/slices/profile';
import {DrawerActions} from '@react-navigation/native';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styles from './style';
import {showMessage} from 'react-native-flash-message';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import notifee, {AndroidImportance} from '@notifee/react-native';

const CustomDrawer = props => {
  const {width} = Dimensions.get('screen');
  const users = useSelector(state => state.profile.data);
  const {token} = useSelector(state => state.auth.data);
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const auth = useSelector(state => state.auth.data);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await authLogout(token, controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        dispatch(usersAction.authLogout());
        dispatch(profileAction.filter());
        navigation.navigate('Welcome');
        setLoading(false);
        showMessage({
          message: 'Logout Successs',
          type: 'success',
        });
        setModalVisible(false);
        navigation.dispatch(DrawerActions.toggleDrawer());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createChannelNotif = async () => {
    try {
      await notifee.requestPermission();
      await notifee.createChannel({
        id: 'urgent',
        name: 'Hight Notification',
        sound: 'default',
        vibration: true,
        importance: AndroidImportance.HIGH,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createChannelNotif();
  }, []);
  // console.log(users.image);

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      {/* Bio start */}
      <View style={styles.containerHero}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            marginTop: 55,
            marginBottom: 20,
            position: 'relative',
          }}>
          {/* {isImg()} */}
          <Image
            source={users.image ? {uri: users.image} : placeHolder}
            style={styles.hero}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: -10,
          }}>
          <Text style={styles.name}>
            {/* {`${userData.length && userData[0].first_name} ${
              userData.length && userData[0].last_name
            }`
            } */}
            {users?.first_name} {users?.last_name}
          </Text>
          <Text style={styles.email}>{users?.email}</Text>
          <Text style={styles.phone}>{users?.phone_number}</Text>
        </View>
      </View>
      {/* Bio end */}

      {/* Navigation start */}
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginTop: 30,
        }}>
        <Pressable
          style={{flexDirection: 'row', paddingLeft: 30}}
          onPress={() => navigation.navigate('EditProfile')}>
          {/* <Image source={require('../../images/editProfile.png')} /> */}
          <Icon name="account-circle-outline" color="#6A4029" size={30} />
          <Text style={styles.itemList}>Edit Profile</Text>
        </Pressable>
        <Divider
          style={{
            width: '75%',
            marginVertical: 20,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#6A4029',
          }}
        />
        {/* <View style={styles.lineBottom} /> */}

        <Pressable
          style={{flexDirection: 'row', paddingLeft: 30}}
          onPress={() => navigation.navigate('ProductAll')}>
          {/* <Image source={require('../../images/allMenu.png')} /> */}
          <Icon name="book" color="#6A4029" size={30} />
          <Text style={styles.itemList}>All Menu</Text>
        </Pressable>
        <Divider
          style={{
            width: '75%',
            marginVertical: 20,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#6A4029',
          }}
        />

        <Pressable
          style={{flexDirection: 'row', paddingLeft: 30}}
          onPress={() => navigation.navigate('Cart')}>
          {/* <Image source={require('../../images/allMenu.png')} /> */}
          <Icon name="cart" color="#6A4029" size={30} />
          <Text style={styles.itemList}>Cart</Text>
        </Pressable>
        {/* <View style={styles.lineBottom} /> */}
        <Divider
          style={{
            width: '75%',
            marginVertical: 20,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#6A4029',
          }}
        />

        <Pressable
          style={{flexDirection: 'row', paddingLeft: 30}}
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          {/* <Image source={require('../../images/allMenu.png')} /> */}
          {/* <Icon name="security" color="#6A4029" size={30} /> */}
          <IconComunity
            name={auth.role_id === 1 ? 'book-variant-multiple' : 'security'}
            size={25}
            style={{color: '#6A4029'}}
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
          />
          <Text style={styles.itemList}>
            {auth.role_id !== 1 ? 'Security' : 'Sales Chart'}
          </Text>
        </Pressable>
        {/* <View style={styles.lineBottom} /> */}
        <Divider
          style={{
            width: '75%',
            marginVertical: 20,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#6A4029',
          }}
        />

        <Pressable
          onPress={() => setModalVisible(true)}
          style={{
            flexDirection: 'row',
            paddingLeft: 20,
            paddingTop: 60,
            paddingBottom: 30,
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.itemList}>Sign Out</Text>
          <Icon name="arrow-right" color="#6A4029" size={30} />
        </Pressable>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure want to logout?</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleLogout}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.textStyle}>YES</Text>
                )}
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>NO</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Navigation end */}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
