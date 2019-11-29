import React, {Fragment} from 'react';
import {View, Text, ScrollView, Image, Dimensions} from 'react-native';
import {Item, Input, Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './MyMapShareList.style';
import Carousel from 'react-native-snap-carousel';
import Header from './../../components/header/header';

const height = Dimensions.get('window').height;
class MyMapShareList extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'ShareList',
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
      carouselItems: [
        {
          image: require('./../../Images/login-bg.jpg'),
          title: 'LonelyPlanet - Bordeaux',
          view: 4,
          rate: 2.5,
          star: 4,
          review: 2,
          description:
            "Seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama over......",
        },
        {
          image: require('./../../Images/signup-bg.png'),
          title: 'LonelyPlanet - Bankok',
          view: 6,
          rate: 4.5,
          star: 4,
          review: 7,
          description:
            "Seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama over......",
        },
        {
          image: require('./../../Images/signup-bg.png'),
          title: 'LonelyPlanet - New York',
          view: 10,
          rate: 3.5,
          star: 1,
          review: 3,
          description:
            "Seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama over......",
        },
      ],
    };
  }

  _renderItem({item, index}) {
    var Star = [];
    for (var i = 0; i < item.star; i++) {
      Star.push(
        <Feather
          style={styles.starIcon}
          name="star"
          size={15}
          color="#FFAF2C"
        />,
      );
    }
    return (
      <View style={[styles.mapSlideCard, {height: height - 220}]}>
        <View style={styles.mapSlideCardHeader}>
          <Image style={styles.mapSlideCardImg} source={item.image} />
          <View style={styles.mapSlideCardImg_overlay} />
          <Button style={styles.shareButton}>
            <Feather style={styles.shareButtonText} name="share-2" />
          </Button>
        </View>
        <View style={styles.mapSlideCardBody}>
          <View style={styles.mapSlideBadgeGroup}>
            <View style={[styles.badgeRed, styles.badge]}>
              <Text style={[styles.badgeText, styles.badgeRedText]}>
                {item.view} <Feather style={styles.badgeIcon} name="eye" />
              </Text>
            </View>
            <View style={[styles.badgeGreen, styles.badge]}>
              <Text style={[styles.badgeText, styles.badgeGreenText]}>
                {item.rate} <Feather style={styles.badgeIcon} name="star" />
              </Text>
            </View>
          </View>
          <Text style={styles.mapSlideCardTitle}>{item.title}</Text>
          <View style={styles.rateList}>
            {Star}
            <Text style={styles.rateListCount}>({item.review} Reviews)</Text>
          </View>
          <View style={styles.mapShareDescription}>
            <Text style={styles.mapShareDescText}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {width} = Dimensions.get('window');
    return (
      <Fragment>
        <Header
          showBack={true}
          title={'Shared Zone'}
          {...this.props}
          style={styles.bgHeader}
        />
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.pageContent}>
              <View searchBar style={styles.searchbarCard}>
                <Item style={styles.searchbarInputBox}>
                  <Feather style={styles.searchbarIcon} name="search" />
                  <Input
                    style={styles.searchbarInput}
                    placeholder="Search your maps"
                  />
                </Item>
                <Button style={styles.searchbarCardButton}>
                  <Feather
                    style={styles.searchbarCardButtonIcon}
                    name="arrow-right"
                  />
                </Button>
              </View>
              <View style={styles.shareMapContant}>
                <Carousel
                  data={this.state.carouselItems}
                  sliderWidth={width}
                  itemWidth={310}
                  firstItem={1}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={1}
                  renderItem={this._renderItem}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}
export default MyMapShareList;
