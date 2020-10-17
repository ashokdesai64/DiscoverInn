import {StyleSheet, Dimensions} from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 15,
  },
  searchresultSelect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchresultSelectText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Montserrat-Medium',
  },
  searchresultSelectIcon: {
    fontSize: 20,
    color: '#828282',
    marginLeft: 5,
  },
  reviewCard: {
    width: DEVICE_WIDTH - 30,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  buttonClose: {
    width: 24,
    height: 24,
  },
  buttonCloseIcon: {
    color: '#BDBDBD',
    fontSize: 24,
  },
  selectListItem: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    flexDirection: 'row',
  },
  selectListText: {
    fontSize: 14,
    color: '#BDBDBD',
    fontFamily: 'Montserrat-Medium',
  },
  customPopup: {
    width: DEVICE_WIDTH,
    padding: 0,
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 10,
    maxHeight: DEVICE_HEIGHT - 190,
  },
  formGroup: {
    marginBottom: 15,
  },
  customPopupContent: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  customPopupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  customPopupHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#333333',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
  },
  buttonReview: {
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  formLabel: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
    paddingLeft: 7,
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    height: 48,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Montserrat-Medium',
    color: '#4F4F4F',
    fontSize: 14,
  },
  formControlTextarea: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    padding: 10,
    height: 90,
    fontFamily: 'Montserrat-Medium',
  },
  customPopupFooter: {
    marginTop: 20,
    marginBottom: 10,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCardHeading: {
    marginLeft: 10,
  },
  reviewCardAvatar: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    borderRadius: 22,
  },
  reviewCardTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#333333',
    marginBottom: 5,
  },
  reviewCardRateList: {
    flexDirection: 'row',
  },
  reviewTime: {
    color: '#BDBDBD',
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
  },
  reviewCardBody: {
    backgroundColor: 'rgba(242, 242, 242, 0.5)',
    borderRadius: 5,
    padding: 10,
  },
  reviewCardText: {
    fontFamily: 'Montserrat-Medium',
    color: '#828282',
    fontSize: 10,
    zIndex: 7,
  },
  reviewExclamationmark: {
    position: 'absolute',
    zIndex: 5,
    width: 56,
    top: -10,
  },
});

export default styles;
