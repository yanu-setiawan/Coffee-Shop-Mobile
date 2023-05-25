/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';

import styles from '../../styles/favorite';
// import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/food4.png';
import coffe1 from '../../assets/images/coffee.png';
import coffe2 from '../../assets/images/coffee.png';
import coffe3 from '../../assets/images/coffee.png';
import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import CardProduct from '../../components/CardProduct';

const Favorite = () => {
  const navigation = useNavigation();
  const datas = [
    {
      image: coffe1,
      title: 'Hazelnut Latte',
      price: 25000,
      id: 1,
    },
    {
      image: coffe2,
      title: 'Creamy Ice Latte',
      price: 27000,
      id: 2,
    },
    {
      image: coffe3,
      title: 'Creamy Ice Latte',
      price: 27000,
      id: 3,
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#F9F9F9'}}>
      <ScrollView style={styles.scrolles}>
        <View>
          <Text style={styles.category}>Everyone's Favorite</Text>
          <Text style={styles.category2}>Food</Text>
          <View style={styles.containerCard}>
            {datas.map((data, idx) => {
              return (
                <View key={idx}>
                  <CardProduct
                    key={data.id}
                    image={data.image}
                    name={data.title}
                    price={data.price}
                    id={data.id}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Favorite;
