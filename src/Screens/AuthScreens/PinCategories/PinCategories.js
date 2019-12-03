import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Item, Input, Button, Content, Accordion, Picker} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './PinCategories.style';
import Header from './../../../components/header/header';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import fontelloConfig from './../../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);

class PinCategories extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Pin Categories',
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

  constructor(props) {
    super(props);
    this.state = {
      pincategories: [
        {
          title: 'Sights',
          text: 2,
          icon: 'sights',
        },
        {
          title: 'Activities',
          text: 2,
          icon: 'activities',
        },
        {
          title: 'Restaurants',
          text: 2,
          icon: 'restaurants',
        },
        {
          title: 'Nightlife',
          text: 2,
          icon: 'nightlife',
        },
        {
          title: 'Transportations',
          text: 2,
          icon: 'transportations',
        },
        {
          title: 'Shopping',
          text: 2,
          icon: 'shopping',
        },
        {
          title: 'Other',
          text: 2,
          icon: 'other',
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.scrollView}>
        <Header
          showBack={true}
          title={'Pin Categories'}
          {...this.props}
          rightEmpty={true}
          showRightButton={false}
        />
        <View style={styles.pageContent}>
          <ScrollView
            style={styles.container}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.cateCardRow}>
              {this.state.pincategories.map(item => (
                <TouchableOpacity
                  style={styles.cateCard}
                  onPress={() =>
                    this.props.navigation.navigate('SinglePinView', {
                      headerTitle: item.title,
                    })
                  }>
                  <View style={styles.cateSlideInner}>
                    <View style={styles.badge}>
                      <Text style={[styles.badgeText]}>{item.text}</Text>
                    </View>
                    <View style={styles.cateCardContent}>
                      <IconMoon name={item.icon} style={styles.cateCardIcon} />
                      <Text style={styles.cateCardTitle}>{item.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, {flex: 1}]}>
            <Text style={styles.buttonText}>Add More Pin</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default PinCategories;
