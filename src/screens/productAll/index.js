/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useMemo, useCallback} from 'react';

import styles from '../../styles/favorite';
// import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/food4.png';

import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import searchIcon from '../../assets/images/searchhh.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import CardProduct from '../../components/CardProduct';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {getAllProducts, getProduct} from '../../utils/https/products';
import debounce from 'lodash.debounce';

const ProductAll = () => {
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const router = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [favorite, setFavorite] = useState(true);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');
  const [nameValue, setNameVal] = useState('');
  const [borderSearch, setBorderSearch] = useState(false);
  const [nextLoad, setNextLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSort = order => {
    setOrder(order);
    setModalVisible(false);
  };

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
        if (error.response.status === 404) {
          setData([]);
        }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [categories, favorite, page, limit, order, name]);

  const handleSearch = debounce(text => {
    setPage(1);
    setName(text);
  }, 700);

  // console.log(name);
  // console.log(data);

  const onChangeCategories = categories => {
    setCategories(categories);
    setFavorite(false);
  };

  const onFavorite = () => {
    setFavorite(true);
    setCategories(null);
  };
  const nextItems = async () => {
    if (!nextLoad) {
      try {
        setNextLoad(true);
        const result = await getProduct({
          categories,
          favorite,
          page: page + 1,
          limit,
          name,
          order,
        });
        // setData([...data, ...result.data.data]);
        // console.log('next item', result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setNextLoad(false);
      }
    }
  };

  // const renderFooter = () => {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         paddingVertical: 20,
  //         justifyContent: 'center',
  //         paddingBottom: 10,
  //       }}>
  //       {isLoading ? (
  //         <ActivityIndicator size="large" color="black" />
  //       ) : (
  //         data.meta.totalPage == page && (
  //           <Text
  //             style={{
  //               textAlign: 'center',
  //               color: 'black',
  //               fontFamily: 'Poppins-Regular',
  //             }}>
  //             Coming Soon
  //           </Text>
  //         )
  //       )}
  //     </View>
  //   );
  // };
  // const searchHandler = () => {
  //   setName(nameValue);
  // };

  return (
    <View style={{flex: 1, backgroundColor: '#F9F9F9'}}>
      <View style={styles.scrolles}>
        <View style={styles.navbar}>
          <IconComunity
            name="chevron-left"
            size={35}
            style={styles.icon}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.textNavbar}>All Product</Text>
        </View>
        <View>
          <View
            style={[
              styles.containerSearch,
              borderSearch ? styles.borderSearch : null,
            ]}>
            <ImageBackground source={searchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.inputSearch}
              placeholder="Search"
              onChangeText={handleSearch}
              // onFocus={() => {
              //   setBorderSearch(true);
              // }}
              // onBlur={() => {
              //   setBorderSearch(false);
              // }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.filter} onPress={() => setModalVisible(true)}>
              {!order ? 'FILTER' : order}
            </Text>
          </View>
          <ScrollView
            horizontal
            style={styles.categories}
            contentContainerStyle={styles.categoriesContainer}
            showsHorizontalScrollIndicator={false}
            overScrollMode="always">
            <TouchableOpacity
              style={styles.categoriesTitle}
              onPress={() => onFavorite(true)}>
              <Text
                style={[
                  styles.categoriesText,
                  favorite === true && styles.textActive,
                ]}>
                Favorite
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoriesTitle}
              onPress={() => onChangeCategories(1)}>
              <Text
                style={[
                  styles.categoriesText,
                  categories === 1 && styles.textActive,
                ]}>
                Foods
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoriesTitle}
              onPress={() => onChangeCategories(2)}>
              <Text
                style={[
                  styles.categoriesText,
                  categories === 2 && styles.textActive,
                ]}>
                Coffee
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoriesTitle}
              onPress={() => onChangeCategories(3)}>
              <Text
                style={[
                  styles.categoriesText,
                  categories === 3 && styles.textActive,
                ]}>
                Non Coffee
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator
              size="large"
              color="#6A4029"
              style={styles.act}
            />
          </View>
        ) : data && data.length < 1 ? (
          <Text style={styles.notFound}>Product Not Found</Text>
        ) : (
          <FlatList
            style={{width: '100%'}}
            data={data}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <CardProduct
                  key={item.id}
                  id={item.id}
                  nameProduct={item.name_product}
                  image={item.image}
                  price={item.price}
                />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            onEndReached={nextItems}
            onEndReachedThreshold={0.1}
          />
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
            <View style={{position: 'absolute', right: 15, top: 15}}>
              <IconComunity
                name={'window-close'}
                size={20}
                style={{color: '#6f6f6f'}}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <Text style={styles.titleFilter}>Rilist :</Text>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text
                style={order === 'Newest' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  handleSort('Newest');
                }}>
                Newest
              </Text>
              <Text
                style={order === 'Oldest' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  handleSort('Oldest');
                }}>
                Oldest
              </Text>
            </View>
            <Text style={styles.titleFilter}>Price :</Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={
                  order === 'Cheapest' ? styles.buttonFilter : styles.button
                }
                onPress={() => {
                  handleSort('Cheapest');
                }}>
                Cheapest
              </Text>
              <Text
                style={
                  order === 'Priciest' ? styles.buttonFilter : styles.button
                }
                onPress={() => {
                  handleSort('Priciest');
                }}>
                Priciest
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductAll;
