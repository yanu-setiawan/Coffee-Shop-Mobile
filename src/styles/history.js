/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },
  icons: {
    marginRight: 75,
    color: 'black',
    fontSize: 30,
  },
  title: {
    fontFamily: 'Poppins-Black',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    paddingTop: 30,
  },
  swipe: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    marginTop: 15,
  },
  swipeText: {
    marginHorizontal: 5,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 14,
  },
  // card:{
  //     padding: 15,
  // },
  imageCard: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: 'black',
  },
  cardPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#895537',
  },
  cardStatus: {
    width: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#895537',
  },
  trash: {
    backgroundColor: '#6A4029',
    width: 55,
    height: 55,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // position:'relative',
    // right:20,
    // top: 30
  },
  iconTrash: {
    color: 'white',
  },
  navbar: {
    // backgroundColor: '',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
    fontSize: 39,
    fontWeight: '800',
  },
  textNavbar: {
    color: 'black',
    fontSize: 22,
    fontWeight: '800',
    marginLeft: 85,
  },
  head: {
    fontSize: 25,
    marginLeft: 30,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  containerBox: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },
  iconsBox: {
    marginRight: 75,
    color: 'black',
    fontSize: 30,
  },
  titleBox: {
    fontFamily: 'Poppins-Black',
    fontWeight: 'bold',
    fontSize: 34,
    color: 'black',
    paddingTop: 30,
  },
  swipeBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  swipeTextBox: {
    marginHorizontal: 5,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 10,
  },
  // card:{
  //     padding: 15,
  // },
  imageCardBox: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  cardTitleBox: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: 'black',
  },
  cardPriceBox: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#895537',
  },
  cardStatusBox: {
    width: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#895537',
  },
  trashBox: {
    backgroundColor: '#6A4029',
    width: 55,
    height: 55,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // position:'relative',
    // right:20,
    // top: 30
  },
  iconTrashBox: {
    color: 'white',
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
  buttonClose: {
    backgroundColor: '#6A4029',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Poppins-SemiBold',
    // width: 200,
    color: 'black',
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
  notif: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    right: 25,
    top: 35,
  },
  textNotif: {
    fontFamily: 'Poppins-Bold',
    fontSize: 8,
  },
});

export default styles;
