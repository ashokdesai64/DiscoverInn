import {StyleSheet} from 'react-native';
import colors from './../../config/colors';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // ...this.props.style,
  },
  headerLeftIcon: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeftIconImage: {
    height: 30,
    width: 30,
  },
  headerTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
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
