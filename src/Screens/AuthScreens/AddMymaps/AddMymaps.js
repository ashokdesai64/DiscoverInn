import React, { Fragment } from 'react';
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
import { ListItem, CheckBox, Picker, Textarea } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from './../../../components/header/header';
import styles from './AddMymaps.style';
import ImagePicker from 'react-native-image-picker';
import Spinner from './../../../components/Loader';

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../../actions/mapActions';
class AddMymaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapTitle: '',
      mapDescription: '',
      travelType: '',
      selectedBudget: '',
      selectedAge: '',
      month: 'select month',
      year: 'select year',
      addMapInProgress: false
    };
  }

  change_month = month => {
    this.setState({ month: month });
  };
  change_year = year => {
    this.setState({ year: year });
  };

  openImagePicker() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Gallery' }],
      permissionDenied: {
        title: 'Give permission',
        text: 'Text',
        reTryTitle: 'reTryTitle',
        okTitle: 'okTitle',
      },
      quality: 0.3
    };
    
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response => ', response);
      this.setState({
        isImageSelected: true,
        converImagePath: response.uri,
        fileName: response.fileName,
        fileType: response.type,
      });
    });
  }

  addMap() {
    this.props.navigation.navigate('MapView', { mapID: 479 })
    // const { selectedAge, selectedBudget, travelType, month, year, mapTitle, mapDescription } = this.state;
    // this.setState({ addMapInProgress: true });
    // let addMapObject = {
    //   user_id: this.props.userData.id,
    //   title: mapTitle,
    //   description: mapDescription
    // }
    // if (travelType) {
    //   addMapObject['travel_type'] = travelType;
    // }
    // if (selectedBudget) {
    //   addMapObject['budget_limit'] = selectedBudget;
    // }
    // if (selectedAge) {
    //   addMapObject['age_at_travel'] = selectedAge;
    // }
    // if (year) {
    //   addMapObject['date_of_year'] = year;
    // }
    // if (month) {
    //   addMapObject['date_of_month'] = month;
    // }
    // this.props.mapAction.addMyMap(addMapObject).then((data) => {
    //   this.setState({ addMapInProgress: false }, () => {
    //     this.props.navigation.navigate('MapView', { mapID: data.mapID })
    //   });
    // }).catch((err) => {
    //   this.setState({ addMapInProgress: false }, () => { alert(err) });
    // })
  }

  render() {
    return (
      <Fragment>
        <ImageBackground
          source={require('../../../Images/map-bg.png')}
          style={{ width: '100%', height: '100%' }}>
          <Header
            showBack={true}
            title={'Add Map'}
            {...this.props}
            rightEmpty={true}
            showRightButton={false}
            style={styles.bgTransfrent}
          />
          <Spinner
            visible={this.state.addMapInProgress}
            textContent={'Adding Map...'}
            textStyle={{ color: '#fff' }}
          />
          <View style={styles.container}>
            <View style={styles.pageContent}>
              <ScrollView
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Add Map Title</Text>
                  <KeyboardAvoidingView behavior="padding" enabled>
                    <TextInput
                      style={styles.formControl}
                      value={this.state.mapTitle}
                      onChangeText={(mapTitle) => { this.setState({ mapTitle }) }}
                    />
                  </KeyboardAvoidingView>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Description</Text>
                  <KeyboardAvoidingView behavior="padding" enabled>
                    <Textarea
                      rowSpan={5}
                      style={styles.formControlTextarea}
                      value={this.state.mapDescription}
                      onChangeText={(mapDescription) => { this.setState({ mapDescription }) }}
                    />
                  </KeyboardAvoidingView>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Travel Type</Text>
                  <View style={styles.checkboxCard}>
                    {
                      this.props.travelTypes && this.props.travelTypes.map(travelType => (
                        <ListItem style={[styles.checkboxItem]}>
                          <TouchableOpacity
                            style={[
                              styles.checkboxCustom,
                              this.state.travelType == travelType.id
                                ? styles.CheckboxBlue
                                : styles.UnCheckboxBlue,
                            ]}
                            onPress={() =>
                              this.setState({ travelType: travelType.id })
                            }>
                            <Text
                              style={[
                                styles.checkboxCustomText,
                                this.state.travelType == travelType.id
                                  ? styles.CheckboxBlueText
                                  : styles.UnCheckboxBlueText,
                              ]}>
                              {travelType.name}
                            </Text>
                          </TouchableOpacity>
                        </ListItem>
                      ))}
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Budget</Text>
                  <View style={styles.checkboxCard}>
                    {
                      this.props.budgetLists && this.props.budgetLists.map(budget => {
                        return (
                          < ListItem
                            style={[styles.checkboxItem, styles.checkboxItemGreen]}>
                            <TouchableOpacity
                              style={[
                                styles.checkboxCustom,
                                this.state.selectedBudget == budget.value
                                  ? styles.CheckboxGreen
                                  : styles.UnCheckboxGreen,
                              ]}
                              onPress={() => this.setState({ selectedBudget: budget.value })}>
                              <Text
                                style={[
                                  styles.checkboxCustomText,
                                  this.state.selectedBudget == budget.value
                                    ? styles.CheckboxGreenText
                                    : styles.UnCheckboxGreenText,
                                ]}>
                                {budget.name}
                              </Text>
                            </TouchableOpacity>
                          </ListItem>
                        )
                      })
                    }
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Age at travel</Text>
                  <View style={styles.checkboxCard}>
                    {
                      this.props.ageLists && this.props.ageLists.map(age => {
                        return (
                          <ListItem style={styles.checkboxItem}>
                            <TouchableOpacity
                              style={[
                                styles.checkboxCustom,
                                this.state.selectedAge == age.value
                                  ? styles.CheckboxYellow
                                  : styles.UnCheckboxYellow,
                              ]}
                              onPress={() => this.setState({ selectedAge: age.value })}>
                              <Text
                                style={[
                                  styles.checkboxCustomText,
                                  this.state.selectedAge == age.value
                                    ? styles.CheckboxYellowText
                                    : styles.UnCheckboxYellowText,
                                ]}>
                                {age.name}
                              </Text>
                            </TouchableOpacity>
                          </ListItem>
                        )
                      })
                    }
                  </View>
                </View>
                <Text style={styles.formLabel}>Date of travel</Text>
                <View style={styles.dropdownGroup__vertical}>
                  <View style={[styles.formGroup, styles.picker]}>
                    <Picker
                      style={styles.formDropdown}
                      placeholderStyle={{ color: '#2874F0' }}
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
                      {
                        Array(12).fill(1).map((value, index) => {
                          let displayMonth = `0${index + 1}`.slice(-2);
                          return (
                            <Picker.Item label={displayMonth} value={displayMonth} />
                          )
                        })
                      }
                    </Picker>
                  </View>
                  <View style={[styles.formGroup, styles.picker]}>
                    <Picker
                      style={styles.formDropdown}
                      selectedValue={this.state.year}
                      onValueChange={this.change_year}
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
                      <Picker.Item label="2020" value="2020" />
                    </Picker>
                  </View>
                </View>

                {
                  this.state.isImageSelected ?
                    <TouchableOpacity onPress={() => this.openImagePicker()} style={[styles.uploadCoverCard]}>
                      <Image source={{ uri: this.state.converImagePath }} style={styles.coverImage} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.openImagePicker()} style={[styles.uploadCoverCard]}>
                      <AntDesign name={'pluscircleo'} size={36} color={'#2F80ED'} />
                      <Text style={[styles.uploadCoverCardText]}> Add Cover Image </Text>
                    </TouchableOpacity>
                }

              </ScrollView>
            </View>
            <View style={styles.footerButton}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary, { flex: 1 }]}
                onPress={() => { this.addMap() }}>
                <Text style={styles.buttonText}>Next | Add Pin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Fragment >
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
    travelTypes: state.maps.travelTypes,
    budgetLists: state.maps.budgetLists,
    ageLists: state.maps.ageLists,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMymaps);
