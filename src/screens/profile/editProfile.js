/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useMemo} from 'react';
import styles from '../../styles/edit';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import imgDefault from '../../assets/images/place00.jpg';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Modal,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useNavigation, StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../utils/https/profile';
import {profileAction} from '../../redux/slices/profile';
import LoaderScreen from '../../components/LoaderSec';

function EditProfile() {
  const userData = useSelector(state => state.profile.data);
  const auth = useSelector(state => state.auth.data);
  // const [checked, setChecked] = useState('female');
  const [open, setOpen] = useState(false);
  const [allow, setAllow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const [disName, setDisName] = useState(userData.display_name);
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [gender, setGender] = useState(userData.gender);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone_number);
  const [address, setAddress] = useState(userData.address);
  const [fileImage, setFileImage] = useState('');
  const [date, setDate] = useState(new Date(userData.birth_date));
  const [showPicker, setShowPicker] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const {token, id} = useSelector(state => state.auth.data);
  const controllerProfile = useMemo(() => new AbortController(), []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const openCamera = e => {
    // e.preventDefault();
    const option = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
      allowsEditing: true,
    };
    launchCamera(option, res => {
      if (res.didCancel) {
        return ToastAndroid.showWithGravityAndOffset(
          `Cancel Pick Picture`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50,
        );
      }
      if (res.errorCode) {
        return console.log(res.errorMessage);
      }
      const data = res.assets[0];
      // console.log(data);
      setFileImage(data);
    });
  };

  const openGallery = e => {
    // e.preventDefault();
    const option = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
      allowsEditing: true,
    };
    launchImageLibrary(option, res => {
      if (res.didCancel) {
        return ToastAndroid.showWithGravityAndOffset(
          `Cancel Pick Picture`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50,
        );
      }
      if (res.errorCode) {
        return console.log(res.errorMessage);
      }
      const data = res.assets[0];
      // console.log(data);
      setFileImage(data);
    });
  };

  const handleSetImage = () => {
    if (fileImage) {
      return {uri: fileImage.uri};
    }
    if (userData?.image) {
      return {uri: userData.image};
    }
    return imgDefault;
  };

  const handleEditProfile = async () => {
    const form = {
      display_name: disName,
      first_name: firstName,
      last_name: lastName,
      gender,
      email,
      phone_number: phone,
      birth_date: date.toLocaleDateString(),
      address,
    };
    setIsLoading(true);
    try {
      const result = await updateProfile(
        auth.id,
        form,
        fileImage,
        controller,
        auth.token,
      );
      const getProfileUpdate = await dispatch(
        profileAction.getProfileThunk({
          id,
          controllerProfile,
          token,
        }),
      );
      // console.log('HASIL UPDATE', result);
      // if (result.status === 200) {
      //   showMessage({
      //     message: 'Upadate Profile Succes',
      //     type: 'success',
      //   });
      // }
      if (
        getProfileUpdate.error?.message ===
        'Request failed with status code 403'
      ) {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('Home'));
        }, 5000);
      }
      if (
        getProfileUpdate.error?.message ===
        'Request failed with status code 401'
      ) {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('Home'));
        }, 5000);
      }
      showMessage({
        message: 'Upadate Profile Succes',
        type: 'success',
      });
      setIsLoading(false);
      setModalVisible(false);
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(fileImage);

  return (
    <>
      {isLoading ? <LoaderScreen /> : <View></View>}
      <View style={styles.navbars}>
        <IconComunity
          name="chevron-left"
          size={35}
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.textNavbar}>Edit Profile</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.userinfo}>
          <Image
            source={userData.image ? {uri: userData.image} : imgDefault}
            style={styles.image}
          />
          <Pressable
            style={styles.conPencl}
            onPress={() => setModalVisible(true)}>
            <IconComunity name={'pencil'} style={styles.pencil} size={20} />
          </Pressable>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Display Name :</Text>
          <TextInput
            placeholder={'Input your display name here'}
            placeholderTextColor="black"
            style={styles.input}
            value={disName}
            onChangeText={text => setDisName(text)}
          />
        </View>
        <View style={styles.containerRadio}>
          <View style={styles.radio}>
            <Pressable
              style={
                gender === 'FEMALE' ? styles.checkedOuter : styles.unchekedOuter
              }
              onPress={() => setGender('FEMALE')}>
              <View
                style={
                  gender === 'FEMALE'
                    ? styles.checkedInner
                    : styles.unchekedInner
                }></View>
            </Pressable>
            <Text
              style={
                gender === 'FEMALE' ? styles.checkedText : styles.uncheckedText
              }>
              FEMALE
            </Text>
          </View>
          <View style={styles.radio}>
            <Pressable
              style={
                gender === 'MALE' ? styles.checkedOuter : styles.unchekedOuter
              }
              onPress={() => setGender('MALE')}>
              <View
                style={
                  gender === 'MALE' ? styles.checkedInner : styles.unchekedInner
                }></View>
            </Pressable>
            <Text
              style={
                gender === 'MALE' ? styles.checkedText : styles.uncheckedText
              }>
              MALE
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 15}}>
          <Text style={styles.label}>Email address :</Text>
          <TextInput
            placeholder={userData.email}
            style={styles.input}
            placeholderTextColor="black"
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={{marginBottom: 15}}>
          <Text style={styles.label}>Firstname :</Text>
          <TextInput
            placeholder={'Input your firstname here'}
            placeholderTextColor="black"
            style={styles.input}
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View style={{marginBottom: 15}}>
          <Text style={styles.label}>Lastname :</Text>
          <TextInput
            placeholder={'Input your lastname here'}
            placeholderTextColor="black"
            style={styles.input}
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
        </View>
        <View style={{marginBottom: 15}}>
          <Text style={styles.label}>Phone Number :</Text>
          <TextInput
            placeholder={'Input your phone number'}
            style={styles.input}
            placeholderTextColor="black"
            value={phone}
            // editable={false}
            // selectTextOnFocus={false}
            onChangeText={text => setPhone(text)}
            keyboardType="numeric"
          />
        </View>

        <View style={{marginBottom: 24, width: '100%'}}>
          <Text style={styles.textLabel}>Birth Date :</Text>
          <Pressable
            onPress={() => setShowPicker(true)}
            style={styles.dateStyle}>
            <Text style={styles.textDate}>
              {date.toLocaleDateString('id-ID')}
            </Text>
            <FontAwesomeIcon name="calendar" size={22} color="#9F9F9F" />
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <View style={{marginBottom: 15}}>
          <Text style={styles.label}>Delivery address :</Text>
          <TextInput
            placeholder={'Input your address'}
            placeholderTextColor="black"
            style={styles.input}
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={handleEditProfile}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 55,
              backgroundColor: '#6A4029',
              height: 70,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Black',
                fontSize: 17,
              }}>
              Save and Update
            </Text>
          </View>
        </TouchableOpacity>

        <Modal
          visible={modal}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modal);
          }}>
          <View style={styles.centeredViews}>
            <View style={styles.modalViews}>
              <Image source={handleSetImage()} style={styles.imageModal} />
              <View>
                <TouchableOpacity
                  style={styles.TakeGallery}
                  onPress={openGallery}>
                  <Text style={styles.textStyleBlack}>Open Galery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.TakeGallery}
                  onPress={openCamera}>
                  <Text style={styles.textStyleBlack}>Open Camera</Text>
                </TouchableOpacity>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Pressable
                  style={[styles.buttonModal, styles.buttonCloses]}
                  onPress={() => {
                    setModalVisible(!modal);
                    setFileImage();
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={handleEditProfile}
                  style={[styles.buttonModal, styles.buttonClose]}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.textStyle}>Continue</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}

export default EditProfile;
