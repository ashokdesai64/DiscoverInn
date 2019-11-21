import React, { Fragment } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ListItem, Icon } from 'native-base';
import styles from './FilterScreen.style.js';
import Header from './../../components/header/header'
class AddMymaps extends React.Component {
  constructor(props) {
    super(props);
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
      created_within: [
        '3 Months',
        '6 Months',
        '1 Year',
        '2 Years',
        '5 Years'
      ],
    };
  }

  change_month = month => {
    this.setState({ month: month });
  };
  change_date = date => {
    this.setState({ date: date });
  };

  static navigationOptions = {
    title: 'Filter',
    headerStyle: {
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
        <View style={styles.container}>
          <Header showBack={true} title={'Filter'} {...this.props} rightEmpty={false} />
          <View style={styles.pageContent}>
            <ScrollView
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Categories</Text>
                <View style={styles.checkboxCard}>
                  {this.state.categories.map(cate_icon => (
                    <ListItem style={[styles.checkboxItem]}>
                      <TouchableOpacity
                        style={[
                          styles.checkboxIcon,
                          this.state.categories_select == cate_icon
                            ? styles.CheckboxBlue
                            : styles.UnCheckboxBlue,
                        ]}
                        onPress={() =>
                          this.setState({ categories_select: cate_icon })
                        }>
                        <Image
                          source={cate_icon}
                          style={styles.cateSlideCardIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </ListItem>
                  ))}
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
                          this.state.travel_type_select == title
                            ? styles.CheckboxBlue
                            : styles.UnCheckboxBlue,
                        ]}
                        onPress={() =>
                          this.setState({ travel_type_select: title })
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
                        onPress={() => this.setState({ budget_select: title })}>
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
                            ? styles.CheckboxOrange
                            : styles.UnCheckboxOrange,
                        ]}
                        onPress={() => this.setState({ budget_select: title })}>
                        <Text
                          style={[
                            styles.checkboxCustomText,
                            this.state.budget_select == title
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
                          this.state.created_select == title
                            ? styles.CheckboxYellow
                            : styles.UnCheckboxYellow,
                        ]}
                        onPress={() => this.setState({ created_select: title })}>
                        <Text
                          style={[
                            styles.checkboxCustomText,
                            this.state.created_select == title
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
              onPress={() => { }}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
    );
  }
}
export default AddMymaps;
