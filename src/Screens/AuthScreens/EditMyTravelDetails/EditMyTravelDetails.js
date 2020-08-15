import React, { Fragment } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, ImageBackground, TouchableOpacity, } from 'react-native';
import { ListItem, CheckBox, Picker, Textarea } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../../components/header/header';
import styles from './EditMyTravelDetails.style';
import ImagePicker from 'react-native-image-picker';
import Spinner from '../../../components/Loader';
import moment from 'moment';
import { NavigationActions, StackActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from '../../../actions/mapActions';
class EditMyTravelDetails extends React.Component {

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;

    let travelMonth = 'select month', travelYear = 'select year';
    if (params.type == 'edit') {

      let momentMonth = moment(params.mapData.date_of_travel).month();
      let momentYear = moment(params.mapData.date_of_travel).year();

      if (!isNaN(momentMonth) && momentMonth >= 0) {
        travelMonth = ('0' + (momentMonth + 1).toString()).slice(-2);
      }
      if (!isNaN(momentYear) && momentYear) {
        travelYear = momentYear.toString();
      }
    }

    this.state = {
      mapTitle: '',
      mapDescription: params.type == 'edit' ? params.mapData.description : '',
      travelType: params.type == 'edit' ? params.mapData.travel_type : '',
      selectedBudget: params.type == 'edit' ? params.mapData.budget_limit : '',
      selectedAge: params.type == 'edit' ? params.mapData.age_at_travel : '',
      month: travelMonth,
      year: travelYear,
      addMapInProgress: false,
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
      quality: 0.3,
    };

    ImagePicker.launchImageLibrary(options, response => {
      this.setState({
        isImageSelected: true,
        converImagePath: response.uri,
        fileName: response.fileName,
        fileType: response.type,
      });
    });
  }

  updateMap() {
    const { params } = this.props.navigation.state;
    const {
      selectedAge,
      selectedBudget,
      travelType,
      month,
      year,
      mapDescription
    } = this.state;

    this.setState({ addMapInProgress: true });

    let addMapObject = {
      user_id: this.props.userData.id,
      description: mapDescription,
      map_id: params.mapData.id
    };

    if (travelType) {
      addMapObject['travel_type'] = travelType;
    }
    if (selectedBudget) {
      addMapObject['budget_limit'] = selectedBudget;
    }
    if (selectedAge) {
      addMapObject['age_at_travel'] = selectedAge;
    }
    if (year) {
      addMapObject['date_of_year'] = year;
    }
    if (month) {
      addMapObject['date_of_month'] = month;
    }

    this.props.mapAction
      .updateMyMap(addMapObject)
      .then(data => {
        this.props.mapAction.getMapPins({ user_id: this.props.userData.id, map_id: params.mapData.id }).then((data) => {
          this.setState({ addMapInProgress: false }, () => {
            this.props.mapAction.fetchMyMaps({ user_id: this.props.userData.id, search: '', page: 1 });
            this.props.navigation.state.params.setMapData(data && data.mapID);
            this.props.navigation.goBack()
          });
        }).catch(err => {
          this.props.navigation.goBack()
          console.log("err => ", err);
        })
      })
      .catch(err => {
        this.setState({ addMapInProgress: false }, () => {
          alert(err);
        });
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Fragment>
        <ImageBackground
          source={require('../../../Images/map-bg.png')}
          style={{ width: '100%', height: '100%' }}>
          <Header
            showBack={true}
            title={params.mapData.name}
            {...this.props}
            style={styles.bgTransfrent}
            rightEmpty={true}
            showRightButton={false}
          />
          <Spinner
            visible={this.state.addMapInProgress}
            textContent={'Updating Map...'}
            textStyle={{ color: '#fff' }}
          />
            <View style={styles.pageContent}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                // contentContainerStyle={{ height: '100%' }}
              >
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Description</Text>
                  <KeyboardAvoidingView behavior="padding" enabled>
                    <Textarea
                      rowSpan={5}
                      style={styles.formControlTextarea}
                      value={this.state.mapDescription}
                      onChangeText={mapDescription => {
                        this.setState({ mapDescription });
                      }}
                    />
                  </KeyboardAvoidingView>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Travel Type</Text>
                  <View style={styles.checkboxCard}>
                    {this.props.travelTypes &&
                      this.props.travelTypes.map(travelType => (
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
                    {this.props.budgetLists &&
                      this.props.budgetLists.map(budget => {
                        return (
                          <ListItem
                            style={[
                              styles.checkboxItem,
                              styles.checkboxItemGreen,
                            ]}>
                            <TouchableOpacity
                              style={[
                                styles.checkboxCustom,
                                this.state.selectedBudget == budget.value
                                  ? styles.CheckboxGreen
                                  : styles.UnCheckboxGreen,
                              ]}
                              onPress={() =>
                                this.setState({ selectedBudget: budget.value })
                              }>
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
                        );
                      })}
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Age at travel</Text>
                  <View style={styles.checkboxCard}>
                    {this.props.ageLists &&
                      this.props.ageLists.map(age => {
                        return (
                          <ListItem style={styles.checkboxItem}>
                            <TouchableOpacity
                              style={[
                                styles.checkboxCustom,
                                this.state.selectedAge == age.value
                                  ? styles.CheckboxYellow
                                  : styles.UnCheckboxYellow,
                              ]}
                              onPress={() =>
                                this.setState({ selectedAge: age.value })
                              }>
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
                        );
                      })}
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
                      {Array(12)
                        .fill(1)
                        .map((value, index) => {
                          let displayMonth = `0${index + 1}`.slice(-2);
                          return (
                            <Picker.Item
                              label={displayMonth}
                              value={displayMonth}
                            />
                          );
                        })}
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

                
                <View style={styles.actionButton}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.buttonOutline,
                      styles.buttonEditMapDetail,
                    ]}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <Text style={styles.buttonTextGray}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.buttonPrimary,
                      styles.buttonEditPin,
                    ]}
                    onPress={() => this.updateMap()}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

        </ImageBackground>
      </Fragment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMyTravelDetails);
