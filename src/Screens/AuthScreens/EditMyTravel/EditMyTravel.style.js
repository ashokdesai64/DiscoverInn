import {StyleSheet, Dimensions} from 'react-native';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  pageContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  bgTransfrent: {
    backgroundColor: '#f3f4f6',
  },

  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
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
  editImageIcon: {
    color: '#2F80ED',
    fontSize: 14,
  },
  formGroup: {
    marginBottom: 15,
  },
  buttonClose: {
    width: 24,
    height: 24,
  },
  buttonCloseIcon: {
    color: '#BDBDBD',
    fontSize: 24,
  },
  coverImageCard: {
    width: DEVICE_WIDTH - 30,
    height: 120,
  },
  coverImageCardBox: {
    height: 120,
    width: DEVICE_WIDTH - 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2F80ED',
    zIndex: 9999,
  },
  addPlusIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 120,
    width: DEVICE_WIDTH - 30,
    backgroundColor: 'rgba(47, 128, 237, 0.1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addPlusText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  footerButton: {
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'flex-end',
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#F3F4F6',
    flex: 1,
    width: DEVICE_WIDTH,
  },
  buttonIcon: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIconPrimary: {
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
  },
  buttonIconText: {
    fontSize: 14,
    color: 'rgba(47, 128, 237, 1)',
  },
  buttonOutline: {
    borderColor: '#BDBDBD',
    backgroundColor: '#fff',
    borderWidth: 1,
    color: '#fff',
  },
  buttonEditMapDetail: {
    flex: 1,
    marginRight: 15,
  },
  buttonEditPin: {
    flex: 1,
    marginLeft: 15,
  },
  buttonTextGray: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#333333',
  },
  myTravelName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myTravelNameText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#4F4F4F',
    marginVertical: 20,
  },
  myTravelNameIcon: {
    color: '#2F80ED',
    fontSize: 18,
    marginLeft: 5,
  },
  uploadCover: {
    marginVertical: 15,
  },
  uploadCoverCard: {
    height: 120,
    backgroundColor: 'rgba(47, 128, 237, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2F80ED',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flex: 1,
  },
  uploadCoverCardText: {
    color: '#2F80ED',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  myTravelItem: {
    paddingVertical: 10,
    paddingLeft: 0,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    flexWrap: 'nowrap',
    borderColor: '#F2F2F2',
  },
  myTravelItemTitle: {
    color: '#BDBDBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  myTravelItemValue: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  myTravelCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5,
  },
});

export default styles;
