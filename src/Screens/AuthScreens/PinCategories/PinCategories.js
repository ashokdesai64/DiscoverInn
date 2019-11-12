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
// import {TouchableOpacity} from 'react-native-gesture-handler';

class PinCategories extends React.Component {
  static navigationOptions = {
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
          icon: require('./../../../Images/sights.png'),
        },
        {
          title: 'Activities',
          text: 2,
          icon: require('./../../../Images/activities.png'),
        },
        {
          title: 'Restaurants',
          text: 2,
          icon: require('./../../../Images/restaurants.png'),
        },
        {
          title: 'Nightlife',
          text: 2,
          icon: require('./../../../Images/nightlife.png'),
        },
        {
          title: 'Transportations',
          text: 2,
          icon: require('./../../../Images/transportations.png'),
        },
        {
          title: 'Shopping',
          text: 2,
          icon: require('./../../../Images/shopping.png'),
        },
        {
          title: 'Other',
          text: 2,
          icon: require('./../../../Images/other.png'),
        },
      ],
    };
  }

  render() {
    return (
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.pageContent}>
            <View style={styles.cateCardRow}>
              {this.state.pincategories.map(item => (
                <TouchableOpacity
                  style={styles.cateCard}
                  onPress={() => this.props.navigation.navigate('Sights')}>
                  <View style={styles.cateSlideInner}>
                    <View style={styles.badge}>
                      <Text style={[styles.badgeText]}>{item.text}</Text>
                    </View>
                    <View style={styles.cateCardContent}>
                      <Image
                        source={item.icon}
                        style={styles.cateCardIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.cateCardTitle}>{item.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default PinCategories;
