/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {currencyFormatter} from '../../helpers/currencyFormatter';
import styles from './styles';

const CardHistory = ({image, productName, delivery_method, price}) => {
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 15,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: width / 1.15,
          display: 'flex',
          borderRadius: 20,
          flexDirection: 'row',
          padding: 15,
        }}>
        <View>
          <Image source={{uri: image}} style={styles.imageCard} />
        </View>
        <View style={{paddingLeft: 10}}>
          <Text style={styles.cardTitle}>{productName}</Text>
          <Text style={styles.cardPrice}>{`IDR. ${currencyFormatter(
            price,
          )}`}</Text>
          <Text style={styles.cardStatus}>{delivery_method}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardHistory;
