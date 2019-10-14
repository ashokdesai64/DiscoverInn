import React, {Fragment} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './HomeScreen.style';
import {SearchBar} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Feather';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Discover Inn',
  };
  state = {
    search: '',
  };
  updateSearch = search => {
    this.setState({search});
  };
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [
        {
          title: 'Lonely Planet - Bangkok',
        },
        {
          title: 'Lonely Planet - Franch',
        },
        {
          title: 'Lonely Planet - Maxico',
        },
        {
          title: 'Lonely Planet - India',
        },
      ],
    };
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.mapSlidCard}>
        <Image
          style={styles.mapSlideCardImg}
          source={require('./../../Images/login-bg.jpg')}
        />
        <View style={styles.mapSlideCardImg_overlay} />
        <View style={styles.mapSlideCardContent}>
          <View style={[styles.badgeRed, styles.badge]}>
            <Text style={[styles.badgeText]}>
              199 <Icon name="eye" />
            </Text>
          </View>
          <Text style={styles.mapSlideCardTitle}>{item.title}</Text>
          <View style={styles.rateList}>
            <Icon
              style={styles.starIcon}
              name="star"
              size={15}
              color="#FFAF2C"
            />
            <Icon
              style={styles.starIcon}
              name="star"
              size={15}
              color="#FFAF2C"
            />
            <Icon
              style={styles.starIcon}
              name="star"
              size={15}
              color="#FFAF2C"
            />
            <Icon
              style={styles.starIcon}
              name="star"
              size={15}
              color="#FFAF2C"
            />
            <Icon
              style={styles.starIcon}
              name="star"
              size={15}
              color="#FFAF2C"
            />
            <Text style={styles.rateListCount}>(2 Reviews)</Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const {search} = this.state;
    return (
      <Fragment>
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.homeHeadingCard}>
              <Text style={styles.homeHeadingText}>
                The 1-stop Travel Planner that suits your needs!
              </Text>
            </View>
            <View style={styles.searchbarCard}>
              <SearchBar
                clearIcon
                style={styles.searchbarInput}
                placeholder="Type in your next destination!"
                onChangeText={this.updateSearch}
                value={search}
                inputStyle={{
                  backgroundColor: '#fff',
                  fontSize: 12,
                  color: '#333333',
                  fontFamily: 'Montserrat-Regular',
                }}
                containerStyle={{
                  backgroundColor: 'transfarent',
                  borderWidth: 0,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderRadius: 0,
                }}
                placeholderTextColor={'#BDBDBD'}
                inputContainerStyle={{backgroundColor: '#fff'}}
                lightTheme
              />
            </View>

            <View style={styles.cateCard}>
              <Text style={styles.sectionTitle}>Most Popular</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>
            <Carousel
              data={this.state.carouselItems}
              sliderWidth={370}
              itemWidth={280}
              renderItem={this._renderItem}
            />
            <View style={styles.cateCard}>
              <Text style={styles.sectionTitle}>Top Rated</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>
            <Carousel
              data={this.state.carouselItems}
              sliderWidth={370}
              itemWidth={280}
              renderItem={this._renderItem}
            />
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

export default HomeScreen;
