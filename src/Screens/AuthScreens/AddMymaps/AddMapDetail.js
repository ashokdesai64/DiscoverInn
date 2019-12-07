import React, { Fragment } from 'react';
import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { ListItem, CheckBox, Picker, Textarea } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Header from './../../../components/header/header';
import styles from './AddMapDetail.style';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);

const DEVICE_WIDTH = Dimensions.get('window').width;

class AddMapDetail extends React.Component {
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
    console.log(props);
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
    this.setState({ month: month });
  };
  change_date = date => {
    this.setState({ date: date });
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Fragment>
        <ImageBackground
          source={require('../../../Images/map-bg.png')}
          style={{ width: '100%', height: '100%' }}>
          <Header
            showBack={true}
            title={params && params.type == 'edit' ? 'Edit Map' : 'Add Map'}
            {...this.props}
            rightEmpty={true}
            showRightButton={false}
            style={styles.bgTransfrent}
          />
          <View style={styles.container}>
            <View style={styles.pageContent}>
              <ScrollView>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Add Pin</Text>
                  <View style={[styles.formGroup, styles.picker]}>
                    <Picker
                      style={styles.formDropdown}
                      selectedValue={this.state.date}
                      textStyle={styles.dropdownText}
                      mode="dropdown"
                      iosHeader="Select Year"
                      iosIcon={
                        <Icon
                          name="chevron-down"
                          style={styles.formDropdownIcon}
                        />
                      }>
                      <Picker.Item
                        label="Start By Creating Your Own Trip List"
                        value=""
                      />
                      <Picker.Item label="2017" value="2017" />
                      <Picker.Item label="2018" value="2018" />
                      <Picker.Item label="2019" value="2019" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.orDivider}>
                  <Text style={styles.orDividerBorder}></Text>
                  <Text style={styles.orDividerText}>OR</Text>
                </View>

                <View
                  style={
                    (styles.formGroup,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                      })
                  }>
                  <TextInput
                    style={[
                      styles.formControl,
                      {
                        width: (DEVICE_WIDTH - 60) / 2,
                        height: 40,
                        textAlign: 'center',
                      },
                    ]}
                    placeholder={'Pin Latitude'}
                  />

                  <TextInput
                    style={[
                      styles.formControl,
                      {
                        width: (DEVICE_WIDTH - 60) / 2,
                        height: 40,
                        textAlign: 'center',
                      },
                    ]}
                    placeholder={'Pin Longitude'}
                  />
                </View>
                <View style={styles.mapPins}>
                  <View
                    style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                    <IconMoon size={14} name="sights" color={'white'} />
                  </View>
                  <View
                    style={[
                      styles.singlePin,
                      { backgroundColor: 'rgba(47, 128, 237, 0.1)' },
                    ]}>
                    <IconMoon size={14} name="activities" color={'#2F80ED'} />
                  </View>
                  <View
                    style={[
                      styles.singlePin,
                      { backgroundColor: 'rgba(47, 128, 237, 0.1)' },
                    ]}>
                    <IconMoon size={14} name="restaurants" color={'#2F80ED'} />
                  </View>
                  <View
                    style={[
                      styles.singlePin,
                      { backgroundColor: 'rgba(47, 128, 237, 0.1)' },
                    ]}>
                    <IconMoon size={14} name="nightlife" color={'#2F80ED'} />
                  </View>

                  <View
                    style={[
                      styles.singlePin,
                      { backgroundColor: 'rgba(47, 128, 237, 0.1)' },
                    ]}>
                    <IconMoon
                      size={14}
                      name="transportations"
                      color={'#2F80ED'}
                    />
                  </View>
                  <View
                    style={[
                      styles.singlePin,
                      { backgroundColor: 'rgba(47, 128, 237, 0.1)' },
                    ]}>
                    <IconMoon size={14} name="shopping" color={'#2F80ED'} />
                  </View>
                  <View
                    style={[
                      styles.singlePin,
                      { backgroundColor: 'rgba(47, 128, 237, 0.1)' },
                    ]}>
                    <IconMoon size={14} name="other" color={'#2F80ED'} />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Pin Title</Text>
                  <TextInput
                    style={styles.formControl}
                    placeholderTextColor={'#828894'}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Review:</Text>
                  <TextInput
                    numberOfLines={4}
                    style={styles.formControl}
                    textAlignVertical={'top'}
                    placeholderTextColor={'#828894'}
                  />
                </View>

                <View style={[styles.uploadCoverCard]}>
                  <AntDesign name={'pluscircleo'} size={36} color={'#2F80ED'} />
                  <Text style={[styles.uploadCoverCardText]}>
                    Add Cover Image
                  </Text>
                </View>
              </ScrollView>
            </View>
            <View style={styles.footerButton}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary, { flex: 1 }]}
                onPress={() => {
                  this.props.navigation.navigate('PinCategories');
                }}>
                <Text style={styles.buttonText}>Add Pin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Fragment>
    );
  }
}
export default AddMapDetail;
