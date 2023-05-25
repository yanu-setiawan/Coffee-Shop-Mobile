/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';

import styles from '../../styles/history';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../components/History';
import {deleteTransaction, getHistory} from '../../utils/https/transactions';
import {
  View,
  ActivityIndicator,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import {currencyFormatter} from '../../helpers/currencyFormatter';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

// import transactionActions from '../../redux/actions/transaction';
import {FlatList} from 'react-native-gesture-handler';
import LoaderScreen from '../../components/LoaderSec';

function History() {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const {token} = useSelector(state => state.auth.data);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleted, setDeleted] = useState('');
  //   const userRedux = useSelector(state => state.auth);
  const controller = React.useMemo(() => new AbortController(), []);
  //   console.log(auth.token);
  const auth = useSelector(state => state.auth.data);
  console.log('tokenHit', auth.token);

  const fetching = async () => {
    setIsLoading(true);
    try {
      const getHistoryOrder = await getHistory(auth.token, controller);
      console.log('HISTORY222', getHistoryOrder.data.data);
      setHistory(getHistoryOrder.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async id => {
    setIsLoading(true);
    // console.log(data.id);
    try {
      const result = await deleteTransaction(id, controller, auth.token);
      if (result.status === 200) {
        showMessage({
          message: 'Delete Product Succesfully',
          type: 'success',
        });
      }
      setModalVisible(false);
      fetching();
      setIsLoading(false);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? <LoaderScreen /> : <View></View>}
      <View style={{padding: 30}}>
        <View style={styles.navbar}>
          <IconComunity
            name="chevron-left"
            size={25}
            style={styles.icon}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.head}>Order History</Text>
        </View>

        <View style={styles.swipe}>
          {history && history.length > 0 ? (
            <>
              <IconComunity
                name={'gesture-tap-hold'}
                size={20}
                style={{color: 'brown'}}
              />
              <Text style={styles.swipeText}>Hold on an item to delete</Text>
            </>
          ) : (
            <Text style={styles.swipeText}>Sorry we cant find anything</Text>
          )}
        </View>
      </View>
      {history && history.length > 0 && (
        <FlatList
          data={history}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  display: 'flex',
                  paddingLeft: 25,
                  paddingRight: 25,
                  marginTop: 15,
                }}
                onLongPress={() => {
                  setDeleted(item.id);
                  setModalVisible(true);
                }}
                delayLongPress={1200}
                key={item.id}
                id={item.id}>
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
                    <Image
                      source={{uri: item.image}}
                      style={styles.imageCardBox}
                    />
                  </View>
                  <View style={{paddingLeft: 10}}>
                    <Text style={styles.cardTitleBox}>{item.name_product}</Text>
                    <Text style={styles.cardPriceBox}>
                      IDR. {currencyFormatter(item.price)}
                    </Text>
                    <Text style={styles.cardStatusBox}>
                      {item.delivery_method}
                    </Text>
                  </View>
                  {/* <TouchableOpacity onPress={() => handleDelete()}>
                    <Text>Delete</Text>
                  </TouchableOpacity> */}
                </View>
              </TouchableOpacity>
            );
          }}
          onEndReachedThreshold={0.5}
          //   onEndReached={nextItems}
          //   ListFooterComponent={renderFooter}
        />
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you want to delete your transaction?
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  //   addToChartHandler(detail, size);
                  setModalVisible(false);
                }}
                style={[styles.buttonModal, styles.buttonClose]}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text
                    style={styles.textStyle}
                    onPress={() => handleDelete(deleted)}>
                    Continue
                  </Text>
                )}
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
  );
}

export default History;
