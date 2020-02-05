import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  menuWrapper: {
    paddingTop: 10,
    backgroundColor: 'white',
  },
  mymapsAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
  customPopup: {
    width: width,
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
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    maxHeight: height - 190,
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
  buttonClose: {
    width: 24,
    height: 24,
  },
  buttonCloseIcon: {
    color: '#BDBDBD',
    fontSize: 24,
  },
  formGroup: {
    marginBottom: 15,
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    height: 90,
  },
  customPopupFooter: {
    marginTop: 20,
    marginBottom: 10,
  },
  myTravelAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex:1,
    backgroundColor:'white',
    width:width-30,
    paddingHorizontal:10,
    paddingVertical:10,
    borderTopWidth:1,
    borderColor:'#ddd'
  },
  myTravelActionLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  myTravelActionRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  myTravelItemCover: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
  },
  dropdownText: {
    color: '#4F4F4F',
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    margin: 0,
    padding: 0,
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#828282',
    width: 14,
    height: 20,
    margin: 0,
    padding: 0,
    position: 'absolute',
    right: 25,
    top: 0,
  },
  myTravelItemDropdown: {
    fontSize: 12,
    height: 25,
    position: 'relative',
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
});

export default styles;
