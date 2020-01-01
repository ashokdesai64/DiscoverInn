import React, { Fragment } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ListItem, Icon } from 'native-base';
import styles from './FilterScreen.style.js';
import Header from './../../components/header/header';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);

class AddMymaps extends React.Component {
  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      categories: [
        { cate_icon: require('./../../Images/sights.png') },
        { cate_icon: require('./../../Images/activities.png') },
        { cate_icon: require('./../../Images/restaurants.png') },
        { cate_icon: require('./../../Images/nightlife.png') },
        { cate_icon: require('./../../Images/transportations.png') },
        { cate_icon: require('./../../Images/shopping.png') },
        { cate_icon: require('./../../Images/other.png') },
      ],
      selectedCategory: params.selectedCategory || '',
      travel_type: [
        'Couple',
        'Solo',
        'Friends',
        'Business',
        'Family',
        'Off the beaten track',
      ],
      selectedTravelType:params.selectedTravelType || '',
      budget: ['$', '$$', '$$$', '$$$$'],
      selectedBudget:params.selectedBudget || '',
      age_at_travel: [
        'Below 18',
        '18 To 25',
        '25 To 35',
        '35 To 45',
        '45 To 60',
        'Above 60',
      ],
      selectedAge:params.selectedAge || '',
      created_within: [
        '3 Months',
        '6 Months',
        '1 Year',
        '2 Years',
        '5 Years'
      ],
      selectedCreatedWithin:params.selectedCreatedWithin || ''
    };
  }

  change_month = month => {
    this.setState({ month: month });
  };
  change_date = date => {
    this.setState({ date: date });
  };

  setParamsToParent() {
    const {selectedAge,selectedBudget,selectedCategory,selectedCreatedWithin,selectedTravelType} = this.state;
    this.props.navigation.state.params.setParams({selectedAge,selectedBudget,selectedCategory,selectedCreatedWithin,selectedTravelType});
    this.props.navigation.goBack()
  }

  toggleCategory(category) {
    this.setState({ selectedCategory: category });
  }

  render() {
    const {selectedCategory} = this.state;
    return (
      <Fragment>
        <View style={styles.container}>
          <Header showBack={true} title={'Filter'} {...this.props} rightEmpty={false} />
          <View style={styles.pageContent}>
            <ScrollView
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Categories</Text>
                <View style={styles.mapPins}>

                  <TouchableOpacity
                    onPress={() => { this.toggleCategory('sights') }}
                    style={[styles.singlePin, { backgroundColor:selectedCategory == 'sights' ? '#2F80ED' : 'rgba(47, 128, 237, 0.1)' }]}
                  >
                    <IconMoon size={14} name="sights" color={selectedCategory == 'sights' ? 'white' : '#2F80ED'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => { this.toggleCategory('activities') }}
                    style={[styles.singlePin, { backgroundColor:selectedCategory == 'activities' ? '#2F80ED' : 'rgba(47, 128, 237, 0.1)' }]}
                  >
                    <IconMoon size={14} name="activities" color={selectedCategory == 'activities' ? 'white' : '#2F80ED'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => { this.toggleCategory('restaurants') }}
                    style={[styles.singlePin, { backgroundColor:selectedCategory == 'restaurants' ? '#2F80ED' : 'rgba(47, 128, 237, 0.1)' }]}
                  >
                    <IconMoon size={14} name="restaurants" color={selectedCategory == 'restaurants' ? 'white' : '#2F80ED'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => { this.toggleCategory('nightlife') }}
                    style={[styles.singlePin, { backgroundColor:selectedCategory == 'nightlife' ? '#2F80ED' : 'rgba(47, 128, 237, 0.1)' }]}
                  >
                    <IconMoon size={14} name="nightlife" color={selectedCategory == 'nightlife' ? 'white' : '#2F80ED'} />
                  </TouchableOpacity>


                  <TouchableOpacity
                    onPress={() => { this.toggleCategory('transportations') }}
                    style={[styles.singlePin, { backgroundColor:selectedCategory == 'transportations' ? '#2F80ED' : 'rgba(47, 128, 237, 0.1)' }]}
                  >
                    <IconMoon size={14} name="transportations" color={selectedCategory == 'transportations' ? 'white' : '#2F80ED'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => { this.toggleCategory('shopping') }}
                    style={[styles.singlePin, { backgroundColor:selectedCategory == 'shopping' ? '#2F80ED' : 'rgba(47, 128, 237, 0.1)' }]}
                  >
                    <IconMoon size={14} name="shopping" color={selectedCategory == 'shopping' ? 'white' : '#2F80ED'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => { this.toggleCategory('other') }}
                    style={[styles.singlePin, { backgroundColor:selectedCategory == 'other' ? '#2F80ED' : 'rgba(47, 128, 237, 0.1)' }]}
                  >
                    <IconMoon size={14} name="other" color={selectedCategory == 'other' ? 'white' : '#2F80ED'} />
                  </TouchableOpacity>

                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Travel Type</Text>
                <View style={styles.checkboxCard}>
                  {this.state.travel_type.map(title => (
                    <ListItem style={[styles.checkboxItem]}>
                      <TouchableOpacity
                        style={[
                          styles.checkboxCustom,
                          this.state.selectedTravelType == title
                            ? styles.CheckboxBlue
                            : styles.UnCheckboxBlue,
                        ]}
                        onPress={() =>
                          this.setState({ selectedTravelType: title })
                        }>
                        <Text
                          style={[
                            styles.checkboxCustomText,
                            this.state.selectedTravelType == title
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
                          this.state.selectedBudget == title
                            ? styles.CheckboxGreen
                            : styles.UnCheckboxGreen,
                        ]}
                        onPress={() => this.setState({ selectedBudget: title })}>
                        <Text
                          style={[
                            styles.checkboxCustomText,
                            this.state.selectedBudget == title
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
                          this.state.selectedAge == title
                            ? styles.CheckboxOrange
                            : styles.UnCheckboxOrange,
                        ]}
                        onPress={() => this.setState({ selectedAge: title })}>
                        <Text
                          style={[
                            styles.checkboxCustomText,
                            this.state.selectedAge == title
                              ? styles.CheckboxOrangeText
                              : styles.UnCheckboxOrangeText,
                          ]}>
                          {title}
                        </Text>
                      </TouchableOpacity>
                    </ListItem>
                  ))}
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Created Within</Text>
                <View style={styles.checkboxCard}>
                  {this.state.created_within.map(title => (
                    <ListItem style={styles.checkboxItem}>
                      <TouchableOpacity
                        style={[
                          styles.checkboxCustom,
                          this.state.selectedCreatedWithin == title
                            ? styles.CheckboxYellow
                            : styles.UnCheckboxYellow,
                        ]}
                        onPress={() => this.setState({ selectedCreatedWithin: title })}>
                        <Text
                          style={[
                            styles.checkboxCustomText,
                            this.state.selectedCreatedWithin == title
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
            </ScrollView>
          </View>
          <View style={styles.footerButton}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.filterButton,
                styles.filterButtonCancel,
                styles.buttonOutline,
              ]}
              onPress={() => { }}>
              <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                Undo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.filterButton,
                styles.filterButtonSubmit,
                styles.buttonPrimary,
              ]}
              onPress={() => this.setParamsToParent()}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
    );
  }
}
export default AddMymaps;
