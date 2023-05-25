/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  card: {
    marginTop: 53,
    position: 'relative',
    backgroundColor: 'white',
    width: 220,
    height: 290,
    borderRadius: 30,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageCard: {
    width: 168,
    height: 189,
    borderRadius: 20,
  },
  containerImage: {
    position: 'relative',
    left: 25,
    top: -35,
  },
  containerTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    // fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    width: '100%',
  },
  cardPrice: {
    // fontFamily: "Poppins-Bold",
    fontWeight: 'bold',
    fontSize: 17,
    color: '#6A4029',
  },
  conPencl: {
    backgroundColor: '#6A4029',
    width: 65,
    height: 65,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -13,
    top: 85,
    borderColor: 'white',
    borderWidth: 2,
  },
  pencil: {
    color: 'white',
  },
});
export default styles;
