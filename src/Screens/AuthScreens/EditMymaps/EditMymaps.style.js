import { StyleSheet } from 'react-native';
import { Row } from 'native-base';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  searchbarCard: {
    marginVertical: 0,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    flex: 1,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5
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
  searchbarFilter: {
    fontSize: 16,
    borderBottomWidth: 0,
    paddingRight: 5,
    color: '#828282',
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
  accordionCard: {
    marginTop: 15,
  },
  accordionCardHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomColor:'#E0E0E0',
    borderRadius: 5,
    zIndex: 1,
  },
  accordionCardHeaderClose: {
    marginBottom: 10,
  },
  accordionCardHeaderOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  mapIcon: {
    color: '#2F80ED',
    fontSize: 14,
    marginRight: 10,
  },
  accordionCardtitle: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    flex: 1,
  },
  accordionCardHeaderIcon: {
    fontSize: 16,
    color: '#828282',
    alignSelf: 'flex-end',
  },
  accordionCardBody: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    zIndex: 0,
  },
  mymapsCard: {
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    marginHorizontal: 15,
  },
  mymapsItem: {
    paddingVertical: 10,
    paddingLeft: 0,
    marginHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    flexWrap: 'nowrap',
    borderColor: '#F2F2F2',
  },
  mymapsItemTitle: {
    color: '#BDBDBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  mymapsItemValue: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  mymapsAction: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    height: 30,
    // width: 100,
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
  mymapsItemCover: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
  },
  dropdownText: {
    color: '#4F4F4F',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginRight: 0,
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
  mymapsItemDropdown: {
    fontSize: 12,
    height: 25,
    flexGrow: 1,
    paddingRight: 30,
    position: 'relative',
  },
  editImage: {
    position: 'absolute',
    top: 5,
    right: 0,
    width: 15,
    height: 15,
  },
  editImageIcon: {
    color: '#2F80ED',
    fontSize: 14,
  },
});

export default styles;
