import {StyleSheet, Dimensions} from 'react-native';
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  homePage: {
    marginBottom: 25,
  },
  scrollView: {
    paddingRight: 0,
    marginRight: 0,
    backgroundColor: '#F3F4F6',
  },
  carouselItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapViewCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    width: 320,
    flexDirection: 'row',
    elevation: 3,
    overflow: 'hidden',
    borderRadius: 10,
  },
  mapViewCardImg: {
    width: 120,
    height: 95,
  },
  mapViewCardContent: {
    backgroundColor: 'white',
    width: 200,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  mapViewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200 - 20,
  },
  mapViewTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '500',
  },
  mapViewCate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  mapViewCateIcon: {
    color: '#2F80ED',
    fontSize: 13,
  },
  mapViewCateText: {
    fontSize: 12,
    color: '#828282',
    fontFamily: 'Montserrat-Regular',
  },
  mapViewContentText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#828282',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  viewMapHeader: {
    top: 20,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    padding: 15,
    zIndex: 9999,
  },
  map: {
    flex: 1,
  },
});

export default styles;
