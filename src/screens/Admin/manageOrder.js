/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  changeOrderDone,
  getAllOrder,
  getDoneOrder,
} from '../../utils/https/transactions';
import globalStyle from '../../styles/global';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import ButtonSecondary from '../../components/ButtonSecondary';
// import ButtonPrimary from '../../components/ButtonPrimary';
import LoaderScreen from '../../components/LoaderScreen';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';

const Card = ({data, reff}) => {
  const {token} = useSelector(state => state.auth.data);
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log('STATUS ORDER', data.status_id);

  const handleDone = async () => {
    // console.log(data.id);
    setLoading(true);
    try {
      const result = await changeOrderDone(token, data.id, controller);
      console.log(result);
      reff();
      setLoading(false);
    } catch (error) {
      console.log(error);
      reff();
      setLoading(false);
    }
  };

  const lengthText = text => {
    if (text.length > 15) {
      return text.substring(0, 12) + '...';
    } else {
      return text;
    }
  };

  return (
    <View style={styles.cardContainer}>
      {data.image ? (
        <Image source={{uri: data.image}} style={styles.imageProd} />
      ) : (
        <Image
          source={require('../../assets/images/imggg.png')}
          style={styles.imageProd}
        />
      )}
      <View style={{marginLeft: 130}}>
        <Text style={styles.titleProd}>{lengthText(data.name_product)}</Text>
        <Text style={styles.textPrice}>{data.price}</Text>
        <Text style={styles.textInfo}>
          {data.method} at {new Date(data.created_at).toLocaleDateString()}
        </Text>
      </View>
      {data.status_id !== 2 && isLoading ? (
        <Pressable style={styles.btnDel}>
          <ActivityIndicator size="small" color="white" />
        </Pressable>
      ) : (
        data.status_id !== 2 && (
          <Pressable onPress={handleDone} style={styles.btnDel}>
            {/* <IonIcon name="checkmark-sharp" size={27} color="white" /> */}
            <Text style={styles.done}>Done</Text>
          </Pressable>
        )
      )}
    </View>
  );
};

const ManageOrder = () => {
  const userRedux = useSelector(state => state.auth.data);
  // console.log('DATA REDUX USER', userRedux);
  // console.log('TOKEN', userRedux.token);
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const [data, setData] = useState([]);
  const [dataDone, setDataDone] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetching = async () => {
    // setLoading(true);
    try {
      const result = await getAllOrder(userRedux.token, controller);
      setData(result.data.data);
      const resDone = await getDoneOrder(userRedux.token, controller);
      setDataDone(resDone.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubFocus = navigation.addListener('focus', () => {
      fetching();
    });
    fetching();
    return unsubFocus;
  }, [refresh]);

  // console.log(data);

  return (
    <>
      {isLoading ? <LoaderScreen /> : <View></View>}
      <View style={styles.navbarTop}>
        <IconComunity
          name="chevron-left"
          size={25}
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.head}>Customer Order</Text>
      </View>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: '5%',
            paddingVertical: 20,
          }}>
          <View style={styles.swipe}>
            <IconComunity
              name={'gesture-tap-hold'}
              size={20}
              style={{color: '#6A4029'}}
            />
            <Text style={styles.swipeText}>
              Click Button Done to mark it as done
            </Text>
          </View>
          <View style={{marginBottom: 40}}>
            <Text style={[globalStyle.textBold, {fontSize: 24}]}>Just now</Text>
            {data.length >= 1 &&
              data.map(item => (
                <Card
                  key={item.id}
                  data={item}
                  reff={() => setRefresh(!refresh)}
                />
              ))}
          </View>
          <View style={{paddingTop: 40, marginBottom: 40}}>
            <Text style={[globalStyle.textBold, {fontSize: 24}]}>Finished</Text>
            {dataDone.length >= 1 &&
              dataDone.map(item => (
                <Card
                  key={item.id}
                  data={item}
                  reff={() => setRefresh(!refresh)}
                />
              ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginTop: 22,
    marginBottom: 22,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomColor: '#6A4029',
    paddingVertical: 6,
  },
  imageProd: {
    width: 110,
    height: 110,
    borderRadius: 60,
    position: 'absolute',
    // borderWidth: 1,
    // borderColor: '#6A4029',
  },
  textInfo: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  textPrice: {
    fontFamily: 'Poppins-Bold',
    // fontSize: 12,
    color: '#6A4029',
  },
  titleProd: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'black',
  },
  btnQty: {
    width: 21,
    height: 21,
    backgroundColor: '#FFBA33',
    borderRadius: 12,
    alignItems: 'center',
  },
  btnDel: {
    marginLeft: 'auto',
    width: 80,
    height: 40,
    backgroundColor: '#6A4029',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
  },
  done: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  modalScreen: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modal: {
    height: 300,
    borderRadius: 32,
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  navbarTop: {
    display: 'flex',
    flexDirection: 'row',
    gap: 60,
    // paddingLeft: 11,
    // paddingRight: 11,
    paddingTop: 41,
    paddingHorizontal: 31,
    // paddingBottom: 17,
  },
  icon: {
    color: 'black',
  },
  head: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  swipe: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    marginBottom: 20,
    // marginTop: 15,
    // marginLeft: -280,
  },
  swipeText: {
    marginHorizontal: 5,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 14,
  },
});

export default ManageOrder;
