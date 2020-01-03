import React, { Fragment } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ListItem, Icon } from 'native-base';
import styles from './FilterScreen.style.js';
import Header from './../../components/header/header';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AddMymaps extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
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
      selectedCategory: params.selectedCategory || [],
      travel_type: [
        'Couple',
        'Solo',
        'Friends',
        'Business',
        'Family',
        'Off the beaten track',
      ],
      selectedTravelType: params.selectedTravelType || [],
      budget: ['$', '$$', '$$$', '$$$$'],
      selectedBudget: params.selectedBudget || [],
      age_at_travel: [
        'Below 18',
        '18 To 25',
        '25 To 35',
        '35 To 45',
        '45 To 60',
        'Above 60',
      ],
      selectedAge: params.selectedAge || [],
      created_within: [
        '3 Months',
        '6 Months',
        '1 Year',
        '2 Years',
        '5 Years'
      ],
      selectedCreatedWithin: params.selectedCreatedWithin || []
    };
  }

  change_month = month => {
    this.setState({ month: month });
  };
  change_date = date => {
    this.setState({ date: date });
  };

  setParamsToParent() {
    const { selectedAge, selectedBudget, selectedCategory, selectedCreatedWithin, selectedTravelType } = this.state;
    this.props.navigation.state.params.setParams({ selectedAge, selectedBudget, selectedCategory, selectedCreatedWithin, selectedTravelType });
    this.props.navigation.goBack()
  }

  toggleFilterValue(filterType, value) {
    let filterValues = this.state[filterType];

    let filterValueIndex = filterValues.indexOf(value);

    let newValues = [...filterValues];
    if (filterValueIndex >= 0) {
      newValues.splice(filterValueIndex, 1)
    } else {
      newValues.push(value);
    }
    this.setState({ [filterType]: newValues });
  }

  render() {
    const { selectedCategory, selectedTravelType, selectedBudget, selectedAge, selectedCreatedWithin } = this.state;
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

                  {
                    this.props.categories && this.props.categories.map((category) => {
                      let isCategorySelected = selectedCategory.indexOf(category.id) >= 0;
                      return (
                        <TouchableOpacity
                          onPress={() => { this.toggleFilterValue('selectedCategory', category.id) }}
                          style={[styles.singlePin, { backgroundColor: isCategorySelected ? '#2F80ED' : 'rgba(47, 128, 237, 0.1)' }]}
                        >
                          <IconMoon size={14} name={category.name.toLowerCase()} color={isCategorySelected ? 'white' : '#2F80ED'} />
                        </TouchableOpacity>
                      )
                    })
                  }

                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Travel Type</Text>
                <View style={styles.checkboxCard}>
                  {
                    this.props.travelTypes && this.props.travelTypes.map((travelType) => {
                      let isTravelSelected = selectedTravelType.indexOf(travelType.id) >= 0;
                      return (
                        <ListItem style={[styles.checkboxItem]}>
                          <TouchableOpacity
                            style={[
                              styles.checkboxCustom,
                              isTravelSelected ? styles.CheckboxBlue : styles.UnCheckboxBlue
                            ]}
                            onPress={() => { this.toggleFilterValue('selectedTravelType', travelType.id) }}
                          >
                            <Text
                              style={[
                                styles.checkboxCustomText,
                                isTravelSelected ? styles.CheckboxBlueText : styles.UnCheckboxBlueText,
                              ]}>
                              {travelType.name}
                            </Text>
                          </TouchableOpacity>
                        </ListItem>
                      )
                    })
                  }
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Budget</Text>
                <View style={styles.checkboxCard}>
                  {
                    this.props.budgetLists && this.props.budgetLists.map(budget => {
                      let isBudgetSelected = selectedBudget.indexOf(budget.value) >= 0;
                      return (
                        < ListItem
                          style={[styles.checkboxItem, styles.checkboxItemGreen]}>
                          <TouchableOpacity
                            style={[
                              styles.checkboxCustom,
                              isBudgetSelected ? styles.CheckboxGreen : styles.UnCheckboxGreen,
                            ]}
                            onPress={() => { this.toggleFilterValue('selectedBudget', budget.value) }}>
                            <Text
                              style={[
                                styles.checkboxCustomText,
                                isBudgetSelected ? styles.CheckboxGreenText : styles.UnCheckboxGreenText,
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
                      let isAgeSelected = selectedAge.indexOf(age.value) >= 0;
                      return (
                        <ListItem style={styles.checkboxItem}>
                          <TouchableOpacity
                            style={[
                              styles.checkboxCustom,
                              isAgeSelected ? styles.CheckboxOrange : styles.UnCheckboxOrange,
                            ]}
                            onPress={() => { this.toggleFilterValue('selectedAge', age.value) }}>
                            <Text
                              style={[
                                styles.checkboxCustomText,
                                isAgeSelected ? styles.CheckboxOrangeText : styles.UnCheckboxOrangeText,
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
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Created Within</Text>
                <View style={styles.checkboxCard}>
                  {
                    this.props.createdWithins && this.props.createdWithins.map(createdWithin => {
                      let isCreatedWithinSelected = selectedCreatedWithin.indexOf(createdWithin.value) >= 0;
                      return (
                        <ListItem style={styles.checkboxItem}>
                          <TouchableOpacity
                            style={[
                              styles.checkboxCustom,
                              isCreatedWithinSelected ? styles.CheckboxYellow : styles.UnCheckboxYellow,
                            ]}
                            onPress={() => { this.toggleFilterValue('selectedCreatedWithin', createdWithin.value) }}>
                            <Text
                              style={[
                                styles.checkboxCustomText,
                                isCreatedWithinSelected ? styles.CheckboxYellowText : styles.UnCheckboxYellowText,
                              ]}>
                              {createdWithin.name}
                            </Text>
                          </TouchableOpacity>
                        </ListItem>
                      )
                    })
                  }
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
      </Fragment >
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.maps.categories,
    travelTypes: state.maps.travelTypes,
    budgetLists: state.maps.budgetLists,
    ageLists: state.maps.ageLists,
    createdWithins: state.maps.createdWithins,
  };
}

export default connect(mapStateToProps, null)(AddMymaps);
