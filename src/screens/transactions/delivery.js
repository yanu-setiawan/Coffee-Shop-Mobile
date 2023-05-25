/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';

import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/delivery';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from '@rneui/themed';
import {counterAction} from '../../redux/slices/cart';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {currencyFormatter} from '../../helpers/currencyFormatter';

function Delivery() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [method, setMethod] = useState(3);
  const route = useRoute();

  const handleConfirm = () => {
    dispatch(counterAction.deliveryMethod(method));
    navigation.navigate('Payment', {subtotal: route.params.total});
  };
  const users = useSelector(state => state.profile.data);

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
        <Text style={styles.titleNavbar}>Checkout</Text>
      </View>
      <View style={{paddingTop: 30}}>
        <Text style={styles.TitleDelivery}>Delivery</Text>
        <Text style={styles.TitleAddress}>Address details</Text>
        <View style={styles.CardAddress}>
          <Text style={styles.CardStreet}>{users.display_name}</Text>
          <Text style={styles.CardStreetDetail}>{users.address}</Text>
          <Text style={styles.CardPhone}>{users.phone_number}</Text>
        </View>
        <Text style={styles.TitleAddress}>Delivery methods</Text>
        <View style={styles.CardMethods}>
          <View>
            <View style={styles.radio}>
              <Pressable
                style={
                  method === '1' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setMethod('1');
                }}>
                <View
                  style={
                    method === '1' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={
                  method === '2' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setMethod('2');
                }}>
                <View
                  style={
                    method === '2' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={
                  method === '3' ? styles.checkedOuter : styles.unchekedOuter
                }
                onPress={() => {
                  setMethod('3');
                }}>
                <View
                  style={
                    method === '3' ? styles.checkedInner : undefined
                  }></View>
              </Pressable>
            </View>
          </View>
          <View>
            <Text
              style={styles.textMethod}
              onPress={() => {
                setMethod('1');
              }}>
              Dine In
            </Text>
            <Divider
              width={1}
              style={{width: '100%', marginTop: 5, marginBottom: 5.5}}
            />
            <Text
              style={styles.textMethod}
              onPress={() => {
                setMethod('2');
              }}>
              Door Delivery
            </Text>
            <Divider
              width={1}
              style={{width: '100%', marginTop: 5, marginBottom: 5.5}}
            />
            <Text
              style={styles.textMethod}
              onPress={() => {
                setMethod('3');
              }}>
              Pick Up
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 25,
          }}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.price}>
            IDR {currencyFormatter(route.params.total)}
          </Text>
        </View>
        <View style={{paddingBottom: 30}}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleConfirm()}>
            <View
              style={{
                marginBottom: 20,
                backgroundColor: '#6A4029',
                height: 70,
                borderRadius: 20,
                paddingLeft: 30,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Bold',
                  // fontWeight: 'bold',
                  textAlign: 'center',
                  width: '100%',
                  fontSize: 20,
                  // paddingLeft: 60,
                }}>
                Proceed to payment
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Delivery;
