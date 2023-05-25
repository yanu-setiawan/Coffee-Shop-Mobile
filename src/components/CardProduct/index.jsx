/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import styles from '../../styles/cardProductAll';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';

// import Sample from "../assets/images/product.png"

const CardProduct = ({image, nameProduct, price, id}) => {
  // console.log(id);
  const navigation = useNavigation();
  const random = Math.floor(100000 + Math.random() * 900000);
  const costing = price => {
    return (
      'IDR ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };
  const auth = useSelector(state => state.auth.data);

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate('Detail', {id});
      }}>
      <View style={styles.containerImage} key={random}>
        <ImageBackground
          source={{uri: image}}
          style={styles.imageCard}
          resizeMode="cover"
        />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.cardTitle}>{nameProduct}</Text>
        <Text style={styles.cardPrice2}>{costing(price)}</Text>
      </View>
      {auth.role_id === 1 && (
        <Pressable
          style={styles.conPencl}
          onPress={() => {
            navigation.navigate('EditProduct', {id});
          }}>
          <IconComunity name={'pencil'} style={styles.pencil} size={25} />
        </Pressable>
      )}
    </Pressable>
  );
};

export default CardProduct;
