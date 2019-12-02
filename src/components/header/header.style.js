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
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.themeColor,
  },
  loginDialogContent: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: width,
    borderRadius: 10,
    flexWrap: 'wrap',
    padding: 15,
  },
  loginDialogContentInner: {
    padding: 25,
  },
  loginDialogLink: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    width: width - 100,
    paddingBottom: 10,
  },
  loginDialogLinkIcon: {
    marginRight: 25,
  },
  loginDialogLinkText: {
    fontSize: 18,
    color: '#828282',
    fontFamily: 'Montserrat-Medium',
  },
});

export default styles;
