import React, {Fragment} from 'react';
import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import styles from './HomeScreen.style';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Feather';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Discover Inn',
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
    this.cateText = {
      carouselItems: [
        {
          title: 'Sights',
          icon: require('./../../Images/sights.png'),
        },
        {
          title: 'Activities',
          icon: require('./../../Images/activities.png'),
        },
        {
          title: 'Restaurants',
          icon: require('./../../Images/restaurants.png'),
        },
        {
          title: 'Nightlife',
          icon: require('./../../Images/nightlife.png'),
        },
        {
          title: 'Transportations',
          icon: require('./../../Images/transportations.png'),
        },
        {
          title: 'Shopping',
          icon: require('./../../Images/shopping.png'),
        },
        {
          title: 'Other',
          icon: require('./../../Images/other.png'),
        },
      ],
    };
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.mapSlidCard}>
        <View style={styles.mapSlidCardInner}>
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
      </View>
    );
  }

  _renderItemCate({item, index}) {
    return (
      <View style={styles.cateSlideCard}>
        <View style={styles.cateSlideCardContent}>
          <Image
            source={item.icon}
            style={styles.cateSlideCardIcon}
            resizeMode="contain"
          />
          <Text style={styles.cateSlideCardTitle}>{item.title}</Text>
        </View>
      </View>
    );
  }
  render() {
    const {width} = Dimensions.get('window');
    return (
      <Fragment style={styles.homePage}>
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.homeHeadingCard}>
              <Text style={styles.homeHeadingText}>
                The 1-stop Travel Planner that suits your needs!
              </Text>
            </View>
            <View style={styles.searchbarCard}></View>
            <View style={styles.cateCard}>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>

            <Carousel
              data={this.cateText.carouselItems}
              sliderWidth={width}
              itemWidth={100}
              firstItem={2}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              renderItem={this._renderItemCate}
            />
            <View style={styles.cateCard}>
              <Text style={styles.sectionTitle}>Most Popular</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>
            <View style={styles.carouselMapView}>
              <Carousel
                data={this.state.carouselItems}
                sliderWidth={width}
                itemWidth={300}
                firstItem={2}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                renderItem={this._renderItem}
              />
            </View>
            <View style={styles.cateCard}>
              <Text style={styles.sectionTitle}>Top Rated</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>
            <View style={styles.carouselMapView}>
              <Carousel
                data={this.state.carouselItems}
                sliderWidth={width}
                itemWidth={300}
                firstItem={2}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                renderItem={this._renderItem}
              />
            </View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

export default HomeScreen;
