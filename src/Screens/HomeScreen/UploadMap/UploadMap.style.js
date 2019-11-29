import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
  },
  scrollView: {
    paddingRight: 0,
    marginRight: 0,
    backgroundColor: '#F3F4F6',
  },
  pageContent: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  HeaderTitle: {
    textAlign: 'center',
    fontSize: 12,
  },
  formLabel: {
    color: '#4F4F4F',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
    paddingLeft: 10,
    textAlign: 'center',
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
  ContaintOr: {
    textAlign: 'center',
  },
  ContaintUploadKML: {
    textAlign: 'center',
  },
  button: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 30,
    height: 30,
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
  orDivider: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  orDividerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#333333',
    paddingHorizontal: 10,
    zIndex: 7,
    backgroundColor: '#F3F4F6',
  },
  orDividerBorder: {
    position: 'absolute',
    width: '100%',
    height: 1,
    zIndex: 6,
    backgroundColor: '#C4C4C4',
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
  buttonOutline: {
    borderColor: '#BDBDBD',
    borderWidth: 1,
    color: '#fff',
  },
  buttonTextWhite: {
    color: '#333333',
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  uploadPickerButton: {
    width: '100%',
  },
  uploadPickerLabel: {
    textAlign: 'center',
  },
  uploadButtonGroup: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadButton: {
    flex: 1,
  },
  uploadButtonCancel: {
    marginRight: 10,
  },
  uploadButtonSubmit: {
    marginLeft: 10,
  },
});

export default styles;
