import {StyleSheet} from 'react-native';
import {Right} from 'native-base';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
  },
  loginBg: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 100,
  },
  blackOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    height: 600,
    zIndex: 0,
  },
  unauthContent: {
    padding: 30,
    flex: 1,
  },
  logoText: {
    fontSize: 36,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: '#fff',
  },
  unauthForm: {
    paddingTop: 75,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    marginBottom: 35,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    color: '#BDBDBD',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    paddingLeft: 10,
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 5,
    height: 48,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    width: 150,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  restoreLink: {
    color: '#2F80ED',
    paddingLeft: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
  unauthBottomText: {
    color: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  toggleTextLink: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#2F80ED',
  },
});

export default styles;
