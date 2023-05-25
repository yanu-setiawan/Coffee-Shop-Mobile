/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';

import styles from '../../styles/profile';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from '@rneui/themed';
import ButtonCustom from '../../components/button/btnPrimary';
import imgDefault from '../../assets/images/place00.jpg';
import {View, Image, ScrollView, Text, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getHistory} from '../../utils/https/transactions';
// import transactionActions from '../../redux/actions/transaction';
// import Navbar from '../../components/Navbar';

function Profile() {
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile.data);
  const auth = useSelector(state => state.auth.data);
  const {token} = useSelector(state => state.auth.data);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  //   const userRedux = useSelector(state => state.auth);
  const controller = React.useMemo(() => new AbortController(), []);
  console.log(auth.token);
  const fetching = async () => {
    // setLoading(true);
    try {
      const getHistoryOrder = await getHistory(auth.token, controller);
      //   console.log('HISTORY ORDER', getHistoryOrder.data.data);
      setHistory(getHistoryOrder.data.data);
      //   setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubFocus = navigation.addListener('focus', () => {
      fetching();
    });
    fetching();
    return unsubFocus;
  }, []);

  console.log('hist', history);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbarTop}>
        <IconComunity
          name="chevron-left"
          size={25}
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.head}>My Profile</Text>
      </View>
      <View style={styles.userinfo}>
        <Image
          source={profile.image ? {uri: profile.image} : imgDefault}
          style={styles.image}
        />
        <Text style={styles.username}>
          {profile.first_name} {profile.last_name}
        </Text>
        <Pressable style={styles.conPencl}>
          <IconComunity
            name={'pencil'}
            style={styles.pencil}
            size={20}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
          />
        </Pressable>
        <Text style={styles.descritption}>{profile.email}</Text>
        <Text style={styles.descritption}>{profile.phone_number}</Text>
        <Text style={styles.descritption}>{profile.address}</Text>
      </View>
      <Divider width={8} style={{width: '100%', marginTop: 15}} />
      <View style={{flexDirection: 'column', paddingTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20,
            paddingLeft: 20,
          }}>
          <Text style={styles.history}>Order History</Text>
          <Pressable onPress={() => navigation.navigate('History')}>
            <Text style={styles.seemore}>See more</Text>
          </Pressable>
        </View>
        <View style={{paddingRight: 0}}>
          <ScrollView
            style={styles.slider}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {history && history.length !== 0 ? (
              history.map((data, index) => {
                return (
                  <Image
                    source={{uri: data.image}}
                    style={styles.imageHistory}
                    key={index}
                  />
                );
              })
            ) : (
              <Text style={styles.zero}>No Transaction History</Text>
            )}
          </ScrollView>
        </View>
      </View>
      <Divider width={8} style={{width: '100%', marginTop: 15}} />
      <View style={styles.containerNavigation}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('EditPassword')}>
          <Text style={styles.textButton}>Edit Password</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
          />
        </Pressable>
      </View>
      {auth.role_id === 1 && (
        <View style={styles.containerNavigation}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('ManageOrder')}>
            <Text style={styles.textButton}>Manage Order</Text>
            <IconComunity
              name={'chevron-right'}
              size={20}
              style={styles.arrowButton}
            />
          </Pressable>
        </View>
      )}
      <View style={styles.containerNavigation}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>FAQ</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
          />
        </Pressable>
      </View>
      <View style={styles.containerNavigations}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>Help</Text>
          <IconComunity
            name={'chevron-right'}
            size={20}
            style={styles.arrowButton}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default Profile;
