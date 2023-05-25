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
    paddingBottom: 340,
  },
  text: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 62,
    textAlign: 'center',
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
  },
  btnUp: {
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 20,
  },
  btnBot: {
    backgroundColor: '#FFBA33',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 20,
  },
  textBtnUp: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: 'white',
  },
  textBtnBot: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#6A4029',
  },
});

export default styles;
