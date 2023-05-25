/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useMemo} from 'react';
import {useRoute} from '@react-navigation/native';

import styles from '../../styles/detail';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import food from '../../assets/images/coffee.png';
import placeHolder from '../../assets/images/imggg.png';
import {showMessage} from 'react-native-flash-message';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Pressable,
  Modal,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {currencyFormatter} from '../../helpers/currencyFormatter';
import {getProductsDetails} from '../../utils/https/products';
import {counterAction} from '../../redux/slices/cart';
import LoaderScreen from '../../components/LoaderScreen';

function ProductDetail() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [size, setSize] = useState(1);
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const {id} = route.params;
  // console.log('idProduct', id);
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(true);
  const [dataProd, setDataProd] = useState({});
  const [newPrice, setNewPrice] = useState('');
  const auth = useSelector(state => state.auth.data);

  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getProductsDetails(id, controller);
      // console.log(result);
      setDataProd(result.data.data[0]);
      console.log(dataProd);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
  }, [id]);

  const handleAddToCart = () => {
    const cart = {
      product_id: id,
      prodName: dataProd.name_product,
      image: dataProd.image || '',
      size_id: size || 1,
      qty: 1,
      price: newPrice || dataProd.price,
    };
    dispatch(counterAction.addtoCart(cart));
    showMessage({
      message: 'Add to cart success ',
      type: 'success',
      backgroundColor: '#FFBA33',
    });
    setModalVisible(false);
  };
  return (
    <>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.navbar}>
            <IconComunity
              name="chevron-left"
              size={25}
              style={styles.icon}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <IconComunity
              name={auth.role_id === 1 ? 'pencil' : 'cart-outline'}
              size={25}
              style={styles.icon}
              onPress={() => {
                auth.role_id !== 1 && navigation.navigate('Cart');
                auth.role_id === 1 &&
                  navigation.navigate('EditProduct', dataProd);
              }}
            />
          </View>
          <View style={styles.main}>
            <View style={styles.price}>
              <Text style={styles.priceText}>
                {currencyFormatter(newPrice || dataProd.price)}
              </Text>
            </View>
            <View style={styles.top}>
              {/* <Image source={food} style={styles.product} /> */}
              {dataProd.image ? (
                <Image source={{uri: dataProd.image}} style={styles.product} />
              ) : (
                <Image style={styles.product} source={placeHolder} />
              )}

              <Text style={styles.Title}>{dataProd.name_product}</Text>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.firstText}>
                Delivery only on{' '}
                <Text
                  style={{
                    color: '#6A4029',
                    fontFamily: 'Poppins-Bold',
                    fontWeight: 'bold',
                  }}>
                  Monday to friday{' '}
                </Text>{' '}
                at{' '}
                <Text
                  style={{
                    color: '#6A4029',
                    fontFamily: 'Poppins-Bold',
                    fontWeight: 'bold',
                  }}>
                  1 - 7 pm
                </Text>
              </Text>

              <Text style={styles.description}>{dataProd.description}</Text>

              <Text style={styles.sizeText}> Choose a size</Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Pressable
                  style={size === 1 ? styles.selected : styles.button}
                  onPress={() => {
                    setSize(1);
                    setNewPrice(dataProd.price);
                  }}>
                  <Text
                    style={
                      size === 1 ? styles.selectedText : styles.buttonText
                    }>
                    R
                  </Text>
                </Pressable>
                <Pressable
                  style={size === 2 ? styles.selected : styles.button}
                  onPress={() => {
                    setSize(2);
                    setNewPrice(dataProd.price * 1.2);
                  }}>
                  <Text
                    style={
                      size === 2 ? styles.selectedText : styles.buttonText
                    }>
                    L
                  </Text>
                </Pressable>
                <Pressable
                  style={size === 3 ? styles.selected : styles.button}
                  onPress={() => {
                    setSize(3);
                    setNewPrice(dataProd.price * 1.5);
                  }}>
                  <Text
                    style={
                      size === 3 ? styles.selectedText : styles.buttonText
                    }>
                    XL
                  </Text>
                </Pressable>
              </View>
              <View style={{width: width, paddingBottom: 30}}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  activeOpacity={0.8}>
                  <View
                    style={{
                      backgroundColor: '#6A4029',
                      height: 70,
                      width: width / 1.2,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Poppins-Bold',
                        fontSize: 17,
                      }}>
                      Add to cart
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Are you want to continue transaction?
                    </Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Pressable
                        onPress={() => {
                          //   addToChartHandler(detail, size);
                          setModalVisible(false);
                        }}
                        style={[styles.buttonModal, styles.buttonClose]}>
                        <Text
                          style={styles.textStyle}
                          onPress={handleAddToCart}>
                          Continue
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.buttonModal, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Cancel</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

export default ProductDetail;
