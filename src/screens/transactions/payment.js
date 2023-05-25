/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import ButtonSecondary from '../../components/ButtonSecondary';
import globalStyle from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {addTransactions} from '../../utils/https/transactions';
import {useNavigation} from '@react-navigation/native';
import {counterAction} from '../../redux/slices/cart';
import ButtonPrimary from '../../components/ButtonPrimary';
import {showMessage} from 'react-native-flash-message';
import PaymentProdList from '../../components/PaymentList';
import BtnLoadingSec from '../../components/BtnLoadingSec';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import notifee from '@notifee/react-native';

const Payment = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  // console.log(route.params);
  const reduxStore = useSelector(state => state);
  const cartRedux = reduxStore.cart;
  console.log('CART REDUX', cartRedux);
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const state = useSelector(state => state);
  const cartState = state.cart;
  const [payMethod, setPayMethod] = useState(0);

  const handleSubmit = async () => {
    const dataShopping = cartRedux.shoppingCart.map(item => {
      const {image, name_product, price, qty, ...newItem} = item;
      return {...newItem, subtotal: price * qty, qty};
    });
    const data = {
      promo_id: 1,
      delivery_id: cartState.delivery,
      payment_id: payMethod,
      notes: cartState.notes,
      status_id: 1,
      products: dataShopping,
    };
    console.log('data FETCHING', data);
    setLoading(true);
    try {
      const result = await addTransactions(
        data,
        controller,
        reduxStore.auth.data.token,
      );
      showMessage({
        message: 'Transaction Success',
        type: 'success',
      });
      if (result.status) {
        try {
          const test = await notifee.displayNotification({
            android: {channelId: 'urgent'},
            title: 'Coffee Shop',
            subtitle: 'Thank You For Order',
            body: 'Your transaction order successfully',
          });
          console.log(test);
        } catch (error) {
          console.log(error);
        }
      }
      console.log('ADD TRANSACTION', result);
      //   if (result.status === 200) {
      setSuccess(true);
      setLoading(false);
      dispatch(counterAction.resetCart());

      //   }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const taxFee = cartRedux.delivery == 1 ? 10000 : 0;
  const grandTotal = route.params.subtotal + taxFee;

  return (
    <ScrollView>
      <View style={styles.screen}>
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
        <View style={globalStyle.lineStyle}></View>
        {!isSuccess ? (
          <ScrollView horizontal={true}>
            <View style={styles.CardMethods}>
              <View>
                <View style={styles.radio}>
                  <Pressable
                    style={
                      payMethod === '1'
                        ? styles.checkedOuter
                        : styles.unchekedOuter
                    }
                    onPress={() => {
                      setPayMethod('1');
                    }}>
                    <View
                      style={
                        payMethod === '1' ? styles.checkedInner : undefined
                      }></View>
                  </Pressable>
                </View>
                <View style={styles.radio}>
                  <Pressable
                    style={
                      payMethod === '2'
                        ? styles.checkedOuter
                        : styles.unchekedOuter
                    }
                    onPress={() => {
                      setPayMethod('2');
                    }}>
                    <View
                      style={
                        payMethod === '2' ? styles.checkedInner : undefined
                      }></View>
                  </Pressable>
                </View>
                <View style={styles.radio}>
                  <Pressable
                    style={
                      payMethod === '3'
                        ? styles.checkedOuter
                        : styles.unchekedOuter
                    }
                    onPress={() => {
                      setPayMethod('3');
                    }}>
                    <View
                      style={
                        payMethod === '3' ? styles.checkedInner : undefined
                      }></View>
                  </Pressable>
                </View>
              </View>
              <View>
                <View style={styles.methodList}>
                  <View style={styles.methodCard}>
                    <IconComunity
                      name={'card-bulleted-outline'}
                      style={styles.cardIcon}
                      size={20}
                    />
                  </View>
                  <Text
                    style={styles.textMethod}
                    onPress={() => {
                      setPayMethod('1');
                    }}>
                    Card
                  </Text>
                </View>
                <Divider
                  width={1}
                  style={{width: '100%', marginTop: 5, marginBottom: 3.5}}
                />
                <View style={styles.methodList}>
                  <View style={styles.methodBank}>
                    <IconComunity
                      name={'bank'}
                      style={styles.cardIcon}
                      size={20}
                    />
                  </View>
                  <Text
                    style={styles.textMethod}
                    onPress={() => {
                      setPayMethod('2');
                    }}>
                    Bank account
                  </Text>
                </View>
                <Divider
                  width={1}
                  style={{width: '100%', marginTop: 5, marginBottom: 3.5}}
                />
                <View style={styles.methodList}>
                  <View style={styles.methodCod}>
                    <IconComunity
                      name={'truck-fast'}
                      style={{color: 'black'}}
                      size={20}
                    />
                  </View>
                  <Text
                    style={styles.textMethod}
                    onPress={() => {
                      setPayMethod('3');
                    }}>
                    Cash on delivery
                  </Text>
                </View>
              </View>
            </View>
            <View style={globalStyle.lineStyle}></View>
          </ScrollView>
        ) : (
          <View style={styles.success}>
            <Text style={styles.textSuccess}>Transaction Success</Text>
            <IconComunity name="check-circle" color="green" size={50} />
          </View>
        )}

        {/* <View style={{flexDirection: 'row', gap: 16, justifyContent: 'center'}}>
          <Pressable></Pressable>
          <Pressable></Pressable>
          <Pressable></Pressable>
          <Pressable></Pressable>
        </View> */}
        <View style={{width: '100%', paddingVertical: 20, gap: 16}}>
          {cartRedux.shoppingCart.map((item, idx) => (
            <PaymentProdList key={idx} data={item} />
          ))}
        </View>
        <View style={[globalStyle.lineStyle, styles.mb4]}></View>
        <View style={globalStyle.contentBetween}>
          <Text style={globalStyle.textReg}>Subtotal</Text>
          <Text style={globalStyle.textReg}>
            IDR {route.params.subtotal.toLocaleString('id-ID')}
          </Text>
        </View>
        <View style={[globalStyle.contentBetween, styles.mb4]}></View>
        <View style={globalStyle.contentBetween}>
          <Text style={[globalStyle.textBold, {fontSize: 20}]}>Total</Text>
          <Text style={[globalStyle.textBold, styles.mb4, {fontSize: 20}]}>
            IDR {grandTotal.toLocaleString('id-ID')}
          </Text>
        </View>
        {isLoading ? (
          <BtnLoadingSec />
        ) : isSuccess ? (
          <ButtonPrimary
            title="Go Home"
            handlePress={() => navigation.navigate('Home')}
          />
        ) : (
          <ButtonSecondary title="Pay Now" handlePress={handleSubmit} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: 16,
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 20,
    width: '100%',
    marginRight: 50,
    marginBottom: 10,
  },
  icons: {
    marginRight: 70,
    color: 'black',
    fontSize: 30,
  },
  titleNavbar: {
    fontFamily: 'Poppins-Bold',
    // fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
  },
  cardPay: {
    width: 300,
    height: 184,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  mb4: {
    marginBottom: 16,
  },
  CardMethods: {
    // backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'row',
    marginTop: 20,
  },
  radio: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
    marginVertical: 23,
  },
  checkedOuter: {
    width: 20,
    height: 20,
    borderColor: '#6A4029',
    borderWidth: 2,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedInner: {
    backgroundColor: '#6A4029',
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  unchekedOuter: {
    width: 20,
    height: 20,
    borderColor: '#9F9F9F',
    borderWidth: 2,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMethod: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: 'black',
    marginBottom: 5,
    marginVertical: 5,
    width: 165,
  },
  methodList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  methodCard: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F47B0A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  methodBank: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#895537',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  methodCod: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFBA33',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardIcon: {
    color: 'white',
  },
  totals: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: 'black',
  },
  prices: {
    fontFamily: 'Poppins-Black',
    fontSize: 22,
    color: 'black',
  },
  textSuccess: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 23,
    lineHeight: 39,
  },
  success: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 80,
  },
});

export default Payment;
