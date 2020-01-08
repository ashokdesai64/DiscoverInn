import { StyleSheet,Dimensions } from 'react-native';
import { Row } from 'native-base';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
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
  buttonCamera:{
    backgroundColor:'#2F80ED',
    color:'black'
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
  shareSocial: {
    flexDirection: 'row',
    marginHorizontal: -7.5,
    justifyContent:'space-around',
    alignItems:'center',
    flex:1,
  },
  pageContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    color: '#4F4F4F',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
    paddingLeft: 10,
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    height: 48,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Montserrat-Regular',
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
    fontFamily: 'Montserrat-Regular',
    color: '#4F4F4F',
    fontSize: 14,
  },
  textStyle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    height: 74,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Montserrat-Regular',
    color: '#4F4F4F',
    fontSize: 14,
  },
  useLoaction: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  useLoactionText: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 3,
  },
  checkboxCard: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxItem: {
    height: 30,
    borderBottomWidth: 0,
    marginBottom: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 5,
    justifyContent: 'center',
  },
  checkboxCustom: {
    borderRadius: 5,
    height: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  checkboxCustomText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  CheckboxBlue: {
    borderColor: '#2F80ED',
    backgroundColor: 'rgba(47, 128, 237, 1)',
    color: '#2F80ED',
  },
  UnCheckboxBlue: {
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
    borderColor: '#2F80ED',
  },
  CheckboxBlueText: {
    color: '#fff',
  },
  UnCheckboxBlueText: {
    color: '#2F80ED',
  },
  CheckboxGreen: {
    borderColor: '#27AE60',
    backgroundColor: 'rgba(39, 174, 96, 1)',
    color: '#27AE60',
  },
  UnCheckboxGreen: {
    backgroundColor: 'rgba(39, 174, 96, 0.2)',
    borderColor: '#27AE60',
  },
  CheckboxGreenText: {
    color: '#fff',
  },
  UnCheckboxGreenText: {
    color: '#27AE60',
  },
  CheckboxYellow: {
    borderColor: '#F2994A',
    backgroundColor: 'rgba(242, 153, 74, 1)',
    color: '#F2994A',
  },
  UnCheckboxYellow: {
    backgroundColor: 'rgba(242, 153, 74, 0.2)',
    borderColor: '#F2994A',
  },
  CheckboxYellowText: {
    color: '#fff',
  },
  UnCheckboxYellowText: {
    color: '#F2994A',
  },
  dropdownGroup__vertical: {
    flexDirection: 'row',
  },
  addCoverImages: {
    flexDirection: 'row',
  },
  formDropdown: {
    height: 40,
    fontSize: 12,
    borderRadius: 5,
    fontFamily: 'Montserrat-Medium',
    padding: 5,
  },
  formDropdownIcon: {
    color: '#828282',
  },
  dropdownText: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginRight: 0,
  },
  footerButton: {
    flexDirection: 'row',
    marginTop: 0,
    marginHorizontal: 15,
    alignItems: 'flex-end',
    marginBottom: 20,
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
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginLeft:5
  },
  mapPins: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  singlePin: {
    color: 'white',
    fontSize: 14,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 8,
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
  },
  uploadCoverCardText: {
    color: '#2F80ED',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});

export default styles;
