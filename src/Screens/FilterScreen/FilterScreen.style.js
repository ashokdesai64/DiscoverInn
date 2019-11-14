import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    backgroundColor: '#F3F4F6',
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
  checkboxIcon: {
    borderRadius: 5,
    width: 34,
    height: 34,
    alignItems: 'center',
  },
  cateSlideCardIcon: {
    width: 50,
    height: 28,
    alignSelf: 'center',
    color: '#2F80ED',
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
  footerButton: {
    flexDirection: 'row',
    marginTop: 0,
    marginHorizontal: 15,
    alignItems: 'flex-end',
    marginBottom: 20,
    justifyContent: 'space-between',
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
  filterButton: {
    flex: 1,
  },
  filterButtonCancel: {
    marginRight: 10,
  },
  filterButtonSubmit: {
    marginLeft: 10,
  },
});

export default styles;
