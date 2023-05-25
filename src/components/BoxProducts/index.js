/* eslint-disable prettier/prettier */
import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {currencyFormatter} from '../../helpers/currencyFormatter';
import {useSelector} from 'react-redux';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductCard = ({image, productName, id, price}) => {
  const navigation = useNavigation();
  const auth = useSelector(state => state.auth.data);

  return (
    <Pressable
      style={[styles.card, styles.shadowProp]}
      onPress={() => {
        navigation.navigate('Detail', {id});
      }}>
      <View style={styles.containerImage}>
        <Image source={{uri: image}} style={styles.imageCard} />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.cardTitle}>{productName}</Text>
        <Text style={styles.cardPrice}>{`IDR. ${currencyFormatter(
          price,
        )}`}</Text>
      </View>
      {auth.role_id === 1 && (
        <Pressable
          style={styles.conPencl}
          onPress={() => {
            navigation.navigate('EditProduct', {id});
          }}>
          <IconComunity name={'pencil'} style={styles.pencil} size={30} />
        </Pressable>
      )}
    </Pressable>
  );
};

export default ProductCard;
