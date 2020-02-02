import {StyleSheet} from 'react-native';
import colors from './../../config/colors';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // position:'absolute',top:0,left:0,zIndex:9999
  },
  headerContainerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerLeftIcon: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    transform: [{rotate: '90deg'}],
  },
  headerLeftIcons: {
    color: '#333333',
  },
  headerLeftIconImage: {
    height: 30,
    width: 30,
  },
  headerTitle: {
    color: '#4F4F4F',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    width:'80%',
    paddingHorizontal:5
  },
  headerRightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightText: {
    color: colors.themeColor,
    fontSize: 16,
  },
  headerUserIcon: {
    borderWidth: 2,
    height: 28,
    width: 28,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.themeColor,
  },
  loginDialogLink: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  loginDialogLinkLast: {
    borderBottomWidth: 0,
  },
  loginDialogLinkIcon: {
    marginRight: 10,
  },
  loginDialogLinkText: {
    fontSize: 14,
    color: '#828282',
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
    maxHeight: height - 20,
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
});

export default styles;
