/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
    padding: 30,
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    marginRight: 75,
    color: 'black',
    fontSize: 30,
  },
  titleNavbar: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 20,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 250,
  },
  conPencl: {
    backgroundColor: '#6A4029',
    width: 35,
    height: 35,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 100,
    top: 100,
  },
  pencil: {
    color: 'white',
  },
  userinfo: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    borderBottomColor: '#9F9F9F',
    borderBottomWidth: 2,
    color: 'black',
  },
  containerInput: {
    paddingTop: 45,
  },
  label: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: '#9F9F9F',
  },
  checkedOuter: {
    width: 25,
    height: 25,
    borderColor: '#6A4029',
    borderWidth: 2,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedInner: {
    backgroundColor: '#6A4029',
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  unchekedOuter: {
    width: 25,
    height: 25,
    borderColor: '#9F9F9F',
    borderWidth: 2,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unchekedInner: {
    backgroundColor: '#9F9F9F',
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  containerRadio: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  radio: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  checkedText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'black',
    marginLeft: 15,
    paddingTop: 3.5,
  },
  uncheckedText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: '#9F9F9F',
    marginLeft: 15,
    paddingTop: 3.5,
  },
  tanggal: {
    marginVertical: 10,
    color: 'black',
  },
  berubah: {
    marginVertical: 10,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: 100,
    marginHorizontal: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#6A4029',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Poppins-Bold',
    width: 200,
    color: 'black',
    fontSize: 25,
    marginBottom: 15,
    textAlign: 'center',
  },
  notif: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    right: 0,
    top: 0,
  },
  textNotif: {
    fontFamily: 'Poppins-Bold',
    fontSize: 8,
    color: 'white',
  },
  navbars: {
    // backgroundColor: '',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
    // fontSize: 22,
    fontWeight: '800',
  },
  textNavbar: {
    color: 'black',
    fontSize: 22,
    fontWeight: '800',
    marginLeft: 85,
  },
  textLabel: {
    fontFamily: 'Poppins-Bold',
    color: '#9F9F9F',
  },
  dateStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
  },
  textDate: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  centeredViews: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalViews: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    width: 100,
    marginHorizontal: 15,
    padding: 10,
    elevation: 2,
  },
  TakeGallery: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#FFBA33',
    marginBottom: 30,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonCloses: {
    backgroundColor: '#6A4029',
  },
  textStyles: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleBlack: {
    color: '#6A4029',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTexts: {
    fontFamily: 'Poppins-SemiBold',
    // width: 200,
    color: 'black',
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
  imageModal: {
    width: 120,
    height: 120,
    borderRadius: 1000,
    // borderWidth: 2,
    marginBottom: 40,
  },
  date: {
    color: 'black',
    fontWeight: '800',
    marginTop: 10,
  },
  containerDate: {
    // borderWidth: 2,
    // width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ADADAF',
  },
});

export default styles;
