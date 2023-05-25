/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  hero: {
    width: 130,
    height: 130,
    borderWidth: 1.7,
    borderColor: 'white',
    borderRadius: 100,
  },
  container: {
    backgroundColor: '#F2F2F2',
    borderTopRightRadius: 30,
  },
  containerHero: {
    backgroundColor: '#6A4029',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    height: 300,
    marginTop: -33,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  email: {
    fontSize: 15,
    fontWeight: '400',
    opacity: 0.75,
    color: '#ffffff',
  },
  phone: {
    fontSize: 15,
    fontWeight: '400',
    opacity: 0.75,
    color: '#ffffff',
  },
  itemList: {
    color: '#6A4029',
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 10,
  },
  lineBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#6A4029',
    width: '60%',
    marginLeft: 62,
    marginVertical: 25,
    // marginBottom: 25,
  },
  containerLogout: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    paddingTop: 50,
    paddingRight: 20,
    alignItems: 'center',
  },
  imageBottom: {
    marginHorizontal: 15,
    fontSize: 22,
    color: '#6A4029',
  },
  textBottom: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#6A4029',
  },
  Icons: {
    color: '#6A4029',
    fontSize: 30,
    marginHorizontal: 3,
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
  button: {
    borderRadius: 12,
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
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default styles;
