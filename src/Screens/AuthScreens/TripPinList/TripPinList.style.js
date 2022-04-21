import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../config/colors';
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
    backgroundColor: 'white'
  },
  profileHeader: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingTop: 15,
    marginLeft: 15,
    marginRight: 15,
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  profileHeader_img: {
    marginRight: 10,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  profileHeader_name: {
    fontSize: 14,
    lineHeight: 17,
    color: '#333333',
    marginBottom: 3,
    fontFamily: 'Montserrat-semibold',
  },
  profileHeader_email: {
    fontSize: 10,
    lineHeight: 12,
    color: '#828282',
    fontFamily: 'Montserrat-Regular',
  },
  profileHeader_button: {
    color: '#EB5757',
    lineHeight: 5,
  },
  profileHeader_buttonText: {
    color: '#EB5757',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    marginLeft: 0,
  },
  menuList: {
    paddingTop: 34,
  },
  menuList_Item: {
    marginBottom: 30,
  },
  menuList_Link: {
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 0,
    color: '#fff',
  },
  menuList_LinkText: {
    color: '#828282',
  },
  staticMenu: {
    marginLeft: 15,
    marginRight: 15,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    paddingTop: 30,
  },
  staticMenu_Link: {
    fontSize: 12,
    paddingBottom: 20,
    color: '#828282',
    paddingLeft: 10,
    paddingRight: 10,
  },
  mymapsAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formLabel: {
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
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
  menuContainer: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  selectedMenu: {
    elevation: 5,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 50,
    padding: 7
  },
  menuButton: {
    padding: 7
  },
  menuIcon: {
    width: 20,
    height: 20
  },
  indexContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleContainer: {
    width: '85%',
    justifyContent: 'center',
    marginRight: '2%',
    paddingHorizontal: 5,
  },
  holdDrag: {
    marginVertical: 10
  },
  boxContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    // borderBottomWidth: 0.5,
    // borderColor: colors.gray,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default styles;
