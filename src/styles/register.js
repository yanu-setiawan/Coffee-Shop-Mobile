/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapText: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 65,
    textAlign: 'center',
    marginBottom: 65,
    // marginTop: 40,
  },
  textBot: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 400,
  },
  innerFrame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    paddingTop: 54,
    paddingBottom: 54,
    paddingHorizontal: 31,
  },
  wrapBtn: {
    width: '100%',
    gap: 17,
    marginTop: 25,
  },
  btnUp: {
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 20,
  },
  btnBot: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  textBtnUp: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
  textBtnBot: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#6A4029',
    display: 'flex',
  },
  google: {
    display: 'flex',
    width: 28,
    height: 26,
  },
  iconEye: {
    color: 'white',
    position: 'absolute',
    top: 66,
    right: 10,
  },
  input: {
    width: '100%',
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 10,
    fontFamily: 'Poppins-Bold',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
});

export default styles;
