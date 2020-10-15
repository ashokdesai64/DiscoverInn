import { StyleSheet, Dimensions } from 'react-native';
let DEVICE_HEIGHT = Dimensions.get('window').height;
let DEVICE_WIDTH = Dimensions.get('window').width;
import { Row } from 'native-base';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContent: {
    padding: 10,
    flex: 1,
    height: DEVICE_HEIGHT - 80,
    backgroundColor:'#F3F4F6'
  },
  scrollView: {
    flex: 1,
  },
  headingText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
  },
  searchbarCard: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  searchbarInputBox: {
    flex: 1,
    borderBottomWidth: 0,
  },
  searchbarIcon: {
    fontSize: 16,
    borderBottomWidth: 0,
    paddingLeft: 15,
    paddingRight: 10,
  },
  searchbarInput: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    padding: 0,
    height: 40,
  },
  searchbarCardButton: {
    margin: 5,
    padding: 10,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbarCardButtonIcon: {
    fontSize: 18,
    width: 18,
    height: 18,
    color: 'rgba(47, 128, 237, 1)',
  },
  categorypinList: {
    // paddingVertical: 10,
  },
  categorypinItem: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 10,
    overflow: 'hidden',
    borderRadius: 5,
    borderBottomWidth: 0,
    justifyContent: 'space-between',
  },
  pinIcon: {
    position: 'absolute',
    color: 'rgba(47, 128, 237, 0.2)',
    fontWeight: '900',
    fontSize: 60,
    top: -8,
    left: -32,
    width: '20%'
  },
  categorypinTitle: {
    color: '#333333',
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'Montserrat-Medium',
    width: '60%'
  },
  categorypinAction: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonIcon: {
    fontSize: 14,
  },
  iconButtonPrimary: {
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
  },
  iconButtonIconPrimary: {
    color: '#2F80ED',
  },
  iconButtonWarning: {
    backgroundColor: 'rgba(242, 201, 76, 0.2)',
  },
  iconButtonIconWarning: {
    color: '#F2994A',
  },
  iconButtonDanger: {
    backgroundColor: 'rgba(235, 87, 87, 0.1)',
  },
  iconButtonIconDanger: {
    color: '#EB5757',
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
  buttonPrimary: {
    backgroundColor: '#2F80ED',
    color: '#fff',
  },
  buttonClose: {
    width: 24,
    height: 24,
  },
  buttonCloseIcon: {
    color: '#BDBDBD',
    fontSize: 24,
  },
  deleteModalBody: {
    paddingTop: 20,
    paddingHorizontal: 35,
    paddingBottom: 50,
  },
  deleteModalBodyText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
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
  footerButton: {
    flexDirection: 'row',
    marginTop: 0,
    marginHorizontal: 15,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  buttonDanger: {
    backgroundColor: '#EB5757',
    color: '#fff',
  },
  buttonEditPin: {
    width: '100%',
    // position:'absolute',
    // bottom:10,
    // backgroundColor:'red'
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
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
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    maxHeight: DEVICE_HEIGHT - 190,
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
  formGroup: {
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    marginRight: 5,
    borderRadius: 5,
  },
  formDropdown: {
    height: 40,
    fontSize: 12,
    // width: 120,
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
  pinAddedText:{
    marginTop:5,
    marginBottom:20,
    fontSize:16,
    color:'green'
  }
});

export default styles;
