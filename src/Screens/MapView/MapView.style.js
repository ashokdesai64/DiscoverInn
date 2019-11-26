import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homePage: {
    marginBottom: 25,
  },
  scrollView: {
    paddingRight: 0,
    marginRight: 0,
    backgroundColor: '#F3F4F6',
  },
  pinSlideCard: {
    width: width,
    height: 95,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  pinSlideCardImg: {
    width: 120,
    height: 95,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  pinSlideBody: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: width - 120,
  },
  pinSlideCardHeader: {
    flexDirection: 'row',
    paddingLeft: 50,
  },
});

export default styles;
