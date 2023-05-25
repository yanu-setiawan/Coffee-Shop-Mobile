/* eslint-disable react/self-closing-comp */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */

import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CardCartProd from '../../components/CardCart';
import ButtonPrimary from '../../components/ButtonPrimary';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {currencyFormatter} from '../../helpers/currencyFormatter';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = () => {
  const navigation = useNavigation();
  const cartRedux = useSelector(state => state.cart);
  const {shoppingCart} = cartRedux;
  // console.log(shoppingCart);

  let subtotal = 0;
  shoppingCart.forEach(item => {
    subtotal += item.price * item.qty;
  });
  const taxFee = subtotal * 0.1;
  const total = subtotal + taxFee;

  return (
    <View style={styles.screen}>
      <View style={styles.navbar}>
        <IconComunity
          name="chevron-left"
          size={25}
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.head}>My Cart</Text>
      </View>
      <ScrollView>
        {shoppingCart.length < 1 && (
          <View style={styles.notOrder}>
            <IconComunity
              name="cart-outline"
              size={45}
              style={styles.icon}
              onPress={() => {
                navigation.navigate('Cart');
              }}
            />
            <Text style={styles.textNot}>No Orders Yet</Text>
          </View>
        )}
        <View style={{paddingBottom: 16}}>
          {shoppingCart.length >= 1 &&
            shoppingCart.map((cart, idx) => (
              <CardCartProd key={idx} data={cart} />
            ))}
        </View>
      </ScrollView>
      <View style={{marginTop: 8, marginBottom: 16}}>
        <ButtonPrimary title="Apply Delivery Coupons  &#10140;" />
      </View>
      <View style={{borderBottomWidth: 2, borderColor: '#ADADAF'}}></View>
      <View style={{gap: 8, paddingVertical: 14, paddingHorizontal: 6}}>
        <View style={styles.infoPayment}>
          <Text style={styles.textInfo}>Item Total</Text>
          <Text style={styles.textPayment}>
            IDR {currencyFormatter(subtotal)}
          </Text>
        </View>
        <View style={styles.infoPayment}>
          <Text style={styles.textInfo}>Delivery Charge</Text>
          <Text style={styles.textPayment}>IDR 0</Text>
        </View>
        <View style={styles.infoPayment}>
          <Text style={styles.textInfo}>Tax</Text>
          <Text style={styles.textPayment}>
            IDR {currencyFormatter(taxFee)}
          </Text>
        </View>
        <View style={[styles.infoPayment, {marginTop: 16}]}>
          <Text style={styles.textTotal}>Total : </Text>
          <Text style={styles.textTotal}>IDR {currencyFormatter(total)}</Text>
        </View>
      </View>
      <ButtonPrimary
        title="&#10095;  CHECKOUT"
        handlePress={() => navigation.navigate('Delivery', {total})}
      />
    </View>
  );
};

styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingBottom: 20,
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 100,
    // paddingLeft: 11,
    // paddingRight: 11,
    paddingTop: 51,
    // paddingBottom: -7,
  },
  icon: {
    color: 'black',
  },
  infoPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInfo: {
    fontFamily: 'Poppins-Bold',
    color: '#ADADAF',
  },
  textPayment: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  textTotal: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 20,
  },
  head: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  notOrder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 130,
    gap: 10,
  },
  textNot: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 19,
  },
});

export default Cart;
