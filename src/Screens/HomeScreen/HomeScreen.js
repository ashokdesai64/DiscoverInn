import React, {Fragment} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Item, Input, Button} from 'native-base';
import styles from './HomeScreen.style';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import Header from './../../components/header/header';
//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as authActions from './../../actions/authActions';

class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showSorting: false,
      userData: {userName: 'test'},
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
      carouselItemsTop: [
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
      carouselCateItems: [
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
    this._renderItemTop = this._renderItemTop.bind(this)
    this._renderItem = this._renderItem.bind(this)
  }

  _renderItem({item, index}) {
    return (
      <TouchableOpacity style={styles.mapSlidCard} onPress={()=> this.props.navigation.navigate('MapView')}>
        <View style={styles.mapSlidCardInner}>
          <Image
            style={styles.mapSlideCardImg}
            source={require('./../../Images/login-bg.jpg')}
          />
          <View style={styles.mapSlideCardImg_overlay} />
          <View style={styles.mapSlideCardContent}>
            <View style={[styles.badgeRed, styles.badge]}>
              <Text style={[styles.badgeText]}>
                199 <Feather name="eye" />
              </Text>
            </View>
            <Text style={styles.mapSlideCardTitle}>{item.title}</Text>
            <View style={styles.rateList}>
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Text style={styles.rateListCount}>(2 Reviews)</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderItemTop({item, index}) {
    return (
      <TouchableOpacity style={styles.mapSlidCard} onPress={()=> this.props.navigation.navigate('MapView')}>
        <View style={styles.mapSlidCardInner}>
          <Image
            style={styles.mapSlideCardImg}
            source={require('./../../Images/login-bg.jpg')}
          />
          <View style={styles.mapSlideCardImg_overlay} />
          <View style={styles.mapSlideCardContent}>
            <View style={[styles.badgeGreen, styles.badge]}>
              <Text style={[styles.badgeText]}>
                199 <Feather name="eye" />
              </Text>
            </View>
            <Text style={styles.mapSlideCardTitle}>{item.title}</Text>
            <View style={styles.rateList}>
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Feather
                style={styles.starIcon}
                name="star"
                size={15}
                color="#FFAF2C"
              />
              <Text style={styles.rateListCount}>(2 Reviews)</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderItemCate = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('PinCategories')}>
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
      </TouchableOpacity>
    );
  };

  render() {
    const {width} = Dimensions.get('window');
    return (
      <Fragment style={styles.homePage}>
        <Header
          showMenu={true}
          title={'Discover Inn'}
          {...this.props}
          style={{backgroundColor: '#F3F4F6'}}
          rightEmpty={true}
          showRightButton={false}
        />
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.homeHeadingCard}>
              <Text style={styles.homeHeadingText}>
                The 1-stop Travel Planner that suits your needs!
              </Text>
            </View>
            <View searchBar style={styles.searchbarCard}>
              <Item style={styles.searchbarInputBox}>
                <Feather style={styles.searchbarIcon} name="search" />
                <Input
                  style={styles.searchbarInput}
                  placeholder="Type in your next destination!"
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({showSorting: !this.state.showSorting})
                  }>
                  <Feather style={styles.searchbarFilter} name="sliders" />
                </TouchableOpacity>
              </Item>
              <Button
                style={styles.searchbarCardButton}
                onPress={() => this.props.navigation.navigate('MapList')}>
                <Feather
                  style={styles.searchbarCardButtonIcon}
                  name="arrow-right"
                />
              </Button>
            </View>

            {this.state.showSorting && (
              <View style={styles.categoryDropdown}>
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
                  <Text style={styles.buttonText}>Discover</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonOutlinePrimary,
                    styles.buttonDisabled,
                  ]}
                  onPress={() => this.setState({saveToListModal: false})}>
                  <Text
                    style={
                      ([styles.buttonText],
                      {
                        color: '#2F80ED',
                      })
                    }>
                    Inn
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.cateCard}>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>

            <Carousel
              {...this.props}
              data={this.state.carouselCateItems}
              sliderWidth={width}
              itemWidth={100}
              firstItem={2}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              renderItem={this._renderItemCate}
            />
            <View style={styles.cateCard}>
              <Text style={styles.sectionTitle}>Most Popular</Text>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('MapView')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
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
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('MapView')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.carouselMapView}>
              <Carousel
                data={this.state.carouselItemsTop}
                sliderWidth={width}
                itemWidth={300}
                firstItem={2}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                renderItem={this._renderItemTop}
              />
            </View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authActions, dispatch),
  };
}

export default connect(null, null)(HomeScreen);
