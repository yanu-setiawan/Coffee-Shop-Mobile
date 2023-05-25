/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/global';
import {currencyFormatter} from '../../helpers/currencyFormatter';

const PaymentProdList = ({data}) => {
  const sizeName =
    data.size_id == 1 ? 'Regular' : data.size_id == 2 ? 'Large' : 'Extra Large';
  console.log(typeof data.size_id);
  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={globalStyle.textBold}>{data.prodName}</Text>
        <Text style={globalStyle.textReg}>
          {data.qty}&#215; {sizeName}
        </Text>
      </View>
      <Text style={globalStyle.textBold}>
        IDR {currencyFormatter(data.price)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PaymentProdList;
