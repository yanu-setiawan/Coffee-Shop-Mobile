/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useSelector} from 'react-redux';
import styles from '../../styles/home';
import search from '../../assets/images/searchhh.png';
import debounce from 'lodash.debounce';
import {getProduct} from '../../utils/https/products';
import chat from '../../assets/images/chat.png';
import cart from '../../assets/images/shopping-cart.png';
import pp from '../../assets/images/pp.png';
import burger from '../../assets/images/burger.png';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import placeHolder from '../../assets/images/place00.jpg';

import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  Image,
  TextInput,
  Pressable,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../../components/BoxProducts';
import IconIon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const {height} = useWindowDimensions();
  const [favorite, setFavorite] = useState(true);
  const users = useSelector(state => state.auth.data);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [name, setName] = useState('');
  const [order, setOrder] = useState('newest');
  const [nameValue, setNameVal] = useState('');
  const auth = useSelector(state => state.auth.data);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const {data} = await getProduct({
          categories,
          favorite,
          page,
          limit,
          name,
          order,
        });
        setData(data.data);
        setMeta(data.meta);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [categories, favorite, page, limit, searchHandler, order]);

  const onChangeCategories = categories => {
    setCategories(categories);
    setFavorite(false);
  };

  const onFavorite = () => {
    setFavorite(true);
    setCategories(null);
  };

  const searchHandler = () => {
    setName(nameValue);
  };
  console.log(name);

  return (
    <View style={styles.sectionContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.leftHeader}
            onPress={() => navigation.openDrawer()}>
            <Image
              source={burger}
              style={styles.vector}
              alt="burger"
              onPress={navigation.openDrawer}
            />
          </TouchableOpacity>
          <View style={styles.rightHeader}>
            <IconComunity
              name="cart-outline"
              size={30}
              style={styles.vector}
              onPress={() => {
                navigation.navigate('Cart');
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text}>A good coffee is a good day</Text>
        </View>
        <View style={styles.searchInput}>
          <TouchableOpacity onPress={() => navigation.navigate('ProductAll')}>
            <Image source={search} style={{width: 18, height: 18}} />
          </TouchableOpacity>
          <TextInput
            style={{
              width: '100%',
              fontFamily: 'Poppins-Bold',
              justifyContent: 'center',
            }}
            placeholder="Search"
            placeholderTextColor={'#787777'}
            onChangeText={text => setNameVal(text)}
          />
        </View>
        <ScrollView
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyboardShouldPersistTaps={'always'}>
          <TouchableOpacity
            style={styles.wrapList}
            onPress={() => onFavorite(true)}>
            <Text
              style={[styles.favorite, favorite === true && styles.textActive]}>
              Favorite
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapList}
            onPress={() => onChangeCategories(2)}>
            <Text
              style={[styles.favorite, categories === 2 && styles.textActive]}>
              Coffee
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapList}
            onPress={() => onChangeCategories(3)}>
            <Text
              style={[styles.favorite, categories === 3 && styles.textActive]}>
              Non Coffee
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapList}
            onPress={() => onChangeCategories(1)}>
            <Text
              style={[styles.favorite, categories === 1 && styles.textActive]}>
              Foods
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProductAll');
          }}>
          <Text style={styles.see}>See More</Text>
        </TouchableOpacity>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyboardShouldPersistTaps={'always'}
          style={{height: height / 2}}>
          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator
                size="large"
                color="#6A4029"
                style={styles.act}
              />
            </View>
          ) : data && data.length > 0 ? (
            data.map(item => {
              return (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  price={item.price}
                  productName={item.name_product}
                />
              );
            })
          ) : (
            <Text style={styles.notFound}>Product Not Found</Text>
          )}
        </ScrollView>
      </ScrollView>
      <View style={styles.wrappAdd}>
        {auth.role_id === 1 && (
          <Pressable onPress={() => setModalVisible(true)}>
            <IconIon name={'add-circle'} style={styles.addCircle} />
          </Pressable>
        )}
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[styles.buttonCircle]}
                onPress={() => setModalVisible(!modalVisible)}>
                <IconIon
                  name={'close-circle-sharp'}
                  style={styles.removeCircle}
                />
              </Pressable>
              <View style={styles.boxX}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('AddProduct');
                  }}>
                  <Text style={styles.textStyle}>New Product</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('Promo');
                  }}>
                  <Text style={styles.textStyle}>New Promo</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
