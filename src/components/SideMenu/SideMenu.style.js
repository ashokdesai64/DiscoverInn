import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    paddingTop: 15,
    marginLeft: 15,
    marginRight: 15,
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    alignItems: 'center',
  },
  profileHeader_img: {
    marginRight: 10,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  guestAvatar: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop: 25,
  },
  menuList_Item: {
    marginBottom: 10,
  },
  menuList_Link: {
    paddingLeft: 20,
    paddingRight: 20,
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
    paddingTop: 20,
  },
  staticMenu_Link: {
    fontSize: 12,
    paddingBottom: 10,
    color: '#828282',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default styles;
