import React, {Fragment} from 'react';
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {ListItem, CheckBox, Picker, Textarea} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from './../../../components/header/header';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import styles from './AddMymaps.style';
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
class AddMymaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      travel_type_select: '',
      budget_select: '',
      age_at_travel_check: '',
      travel_type: [
        'Couple',
        'Solo',
        'Friends',
        'Business',
        'Family',
        'Off the beaten track',
      ],
      budget: ['$', '$$', '$$$', '$$$$'],
      age_at_travel: [
        'Below 18',
        '18 To 25',
        '25 To 35',
        '35 To 45',
        '45 To 60',
        'Above 60',
      ],
      month: 'select month',
      date: 'select date',
    };
  }

  // chnage_checkboxvalue = (statename, value) => {
  //   if (this.state[statename].indexOf(value) != -1) {
  //     this.state[statename].splice(this.state[statename].indexOf(value), 1);
  //   } else {
  //     this.setState({statename: this.state[statename].push(value)});
  //   }
  //   this.setState({statename: this.state.statename});
  // };

  change_month = month => {
    this.setState({month: month});
  };
  change_date = date => {
    this.setState({date: date});
  };

  static navigationOptions = {
    title: 'Add MyMap',
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#333333',
      fontSize: 16,
      fontFamily: 'Montserrat-Semibold',
    },
    headerTintColor: '#333333',
    headerLeftContainerStyle: {
      paddingLeft: 10,
    },
  };
  render() {
    return (
      <Fragment>
        <ImageBackground
          source={require('../../../Images/map-bg.png')}
          style={{width: '100%', height: '100%'}}>
          <Header
            showBack={true}
            title={'Add Map'}
            {...this.props}
            rightEmpty={true}
            showRightButton={false}
            style={styles.bgTransfrent}
          />
          <View style={styles.container}>
            <View style={styles.pageContent}>
              <ScrollView
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Add Map Title</Text>
                  <KeyboardAvoidingView behavior="padding" enabled>
                    <TextInput style={styles.formControl} value="" />
                  </KeyboardAvoidingView>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Description</Text>
                  <KeyboardAvoidingView behavior="padding" enabled>
                    <Textarea rowSpan={5} style={styles.formControlTextarea} />
                  </KeyboardAvoidingView>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Travel Type</Text>
                  <View style={styles.checkboxCard}>
                    {this.state.travel_type.map(title => (
                      <ListItem style={[styles.checkboxItem]}>
                        <TouchableOpacity
                          style={[
                            styles.checkboxCustom,
                            this.state.travel_type_select == title
                              ? styles.CheckboxBlue
                              : styles.UnCheckboxBlue,
                          ]}
                          onPress={() =>
                            this.setState({travel_type_select: title})
                          }>
                          <Text
                            style={[
                              styles.checkboxCustomText,
                              this.state.travel_type_select == title
                                ? styles.CheckboxBlueText
                                : styles.UnCheckboxBlueText,
                            ]}>
                            {title}
                          </Text>
                        </TouchableOpacity>
                      </ListItem>
                    ))}
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Budget</Text>
                  <View style={styles.checkboxCard}>
                    {this.state.budget.map(title => (
                      <ListItem
                        style={[styles.checkboxItem, styles.checkboxItemGreen]}>
                        <TouchableOpacity
                          style={[
                            styles.checkboxCustom,
                            this.state.budget_select == title
                              ? styles.CheckboxGreen
                              : styles.UnCheckboxGreen,
                          ]}
                          onPress={() => this.setState({budget_select: title})}>
                          <Text
                            style={[
                              styles.checkboxCustomText,
                              this.state.budget_select == title
                                ? styles.CheckboxGreenText
                                : styles.UnCheckboxGreenText,
                            ]}>
                            {title}
                          </Text>
                        </TouchableOpacity>
                      </ListItem>
                    ))}
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Age at travel</Text>
                  <View style={styles.checkboxCard}>
                    {this.state.age_at_travel.map(title => (
                      <ListItem style={styles.checkboxItem}>
                        <TouchableOpacity
                          style={[
                            styles.checkboxCustom,
                            this.state.budget_select == title
                              ? styles.CheckboxYellow
                              : styles.UnCheckboxYellow,
                          ]}
                          onPress={() => this.setState({budget_select: title})}>
                          <Text
                            style={[
                              styles.checkboxCustomText,
                              this.state.budget_select == title
                                ? styles.CheckboxYellowText
                                : styles.UnCheckboxYellowText,
                            ]}>
                            {title}
                          </Text>
                        </TouchableOpacity>
                      </ListItem>
                    ))}
                  </View>
                </View>
                <Text style={styles.formLabel}>Date of travel</Text>
                <View style={styles.dropdownGroup__vertical}>
                  <View style={[styles.formGroup, styles.picker]}>
                    <Picker
                      style={styles.formDropdown}
                      placeholderStyle={{color: '#2874F0'}}
                      selectedValue={this.state.month}
                      textStyle={styles.dropdownText}
                      onValueChange={this.change_month}
                      mode="dropdown"
                      iosHeader="Select Month"
                      iosIcon={
                        <Feather
                          name="chevron-down"
                          style={styles.formDropdownIcon}
                        />
                      }>
                      <Picker.Item label="Month" value="" />
                      <Picker.Item label="01" value="01" />
                      <Picker.Item label="02" value="02" />
                      <Picker.Item label="03" value="03" />
                    </Picker>
                  </View>
                  <View style={[styles.formGroup, styles.picker]}>
                    <Picker
                      style={styles.formDropdown}
                      selectedValue={this.state.date}
                      onValueChange={this.change_date}
                      textStyle={styles.dropdownText}
                      mode="dropdown"
                      iosHeader="Select Year"
                      iosIcon={
                        <Feather
                          name="chevron-down"
                          style={styles.formDropdownIcon}
                        />
                      }>
                      <Picker.Item label="Year" value="" />
                      <Picker.Item label="2017" value="2017" />
                      <Picker.Item label="2018" value="2018" />
                      <Picker.Item label="2019" value="2019" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.addCoverImages}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={() => {
                      this.setState({showChangeCoverModal: true});
                    }}>
                    <Text style={styles.buttonText}>Upload Cover Image</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <View style={styles.footerButton}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary, {flex: 1}]}
                onPress={() => {
                  this.props.navigation.navigate('AddMapDetail');
                }}>
                <Text style={styles.buttonText}>Next | Add Pin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <Dialog
          rounded={false}
          visible={this.state.showChangeCoverModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({showChangeCoverModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 200, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({showChangeCoverModal: false});
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>
                Upload Map Cover Image
              </Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({showChangeCoverModal: false})}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.uploadCoverCard}>
              <View style={styles.uploadCoverCardInner}>
                <AntDesign name={'pluscircleo'} size={36} color={'#2F80ED'} />
                <Text style={styles.uploadCoverText}>Add Cover Image</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 25,
              }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => this.setState({saveToListModal: false})}>
                <Text style={styles.buttonText}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
export default AddMymaps;
