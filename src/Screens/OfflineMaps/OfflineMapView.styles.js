import { StyleSheet, Dimensions } from 'react-native';
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
  view: {
    width: 60,
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
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
    height:95,
    justifyContent: 'flex-start',
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
  mapSlidCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
    width:320,
    flexDirection:'row',
    elevation:3
  },
  mapSlideCardImg: {
    width: 120,
    height: 95,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius:10
  },
  mapSlideCardImg_overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    height: 280,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  mapControlButton: {
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'flex-end',
    marginBottom: 20,
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonSm: {
    height: 30,
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
    color: '#fff',
  },
  buttonSuccess: {
    backgroundColor: '#6FCF97',
    color: '#fff',
  },
  buttonDanger: {
    backgroundColor: '#EB5757',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  buttonOutline: {
    borderColor: '#BDBDBD',
    backgroundColor: '#fff',
    borderWidth: 1,
    color: '#fff',
  },
  buttonDecline: {
    flex: 1,
    marginRight: 15,
  },
  buttonSave: {
    flex: 1,
    marginLeft: 15,
  },
  buttonTextGray: {
    color: '#333333',
  },
  mapActionButton: {
    position: 'absolute',
    right: 20,
    top: 80,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPrimary: {
    backgroundColor: '#2F80ED',
  },
  iconButtonView: {
    marginBottom: 10,
  },
});

export default styles;
