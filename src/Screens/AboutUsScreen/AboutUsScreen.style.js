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
  aboutTitleText: {
    fontSize: 38,
    color: '#333333',
    fontFamily: 'Montserrat-SemiBold',
    paddingVertical: 10,
  },
  aboutTitle: {
    marginBottom: 15,
  },
  aboutTitleLine: {
    position: 'absolute',
    left: 0,
    bottom: 5,
    width: 135,
    height: 4,
    backgroundColor: '#2F80ED',
  },
  aboutCardText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#828282',
    marginBottom: 10,
  },
});

export default styles;
