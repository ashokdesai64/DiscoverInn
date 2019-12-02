import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  bgTransparent: {
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    zIndex: 2,
    paddingHorizontal: 20,
    backgroundColor: '#F3F4F6',
  },
  PrivacyTitleText: {
    fontSize: 38,
    color: '#333333',
    fontFamily: 'Montserrat-SemiBold',
    paddingVertical: 10,
  },
  PrivacyTitle: {
    marginBottom: 15,
  },
  PrivacyTitleLine: {
    position: 'absolute',
    left: 0,
    bottom: 5,
    width: 110,
    height: 4,
    backgroundColor: '#2F80ED',
  },
  PrivacyContentTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: '#333',
    marginBottom: 5,
  },
  PrivacyCardText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#828282',
    marginBottom: 10,
  },
});

export default styles;
