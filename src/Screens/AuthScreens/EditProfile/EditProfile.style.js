import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  pageContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  formGroup: {
    marginBottom: 15,
  },
  formGroupEdit: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    width: 150,
    height: 40,
    marginTop:20,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
  },
  formLabel: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
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

  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#2F80ED',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignItems: 'flex-start',
  },
  textStyle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
});

export default styles;
