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
  text: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    lineHeight: 73,
    fontSize: 65,
    height: 'auto',
    textAlign: 'center',
    paddingTop: 75,
    // paddingBottom: 360,
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
  btn: {
    backgroundColor: '#FFBA33',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 20,
    // marginTop: 'auto',
  },
  textBtn: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#6A4029',
  },
  wrapText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    marginBottom: 150,
  },
  textBot: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    textAlign: 'center',
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
    marginBottom: 100,
  },
});

export default styles;
