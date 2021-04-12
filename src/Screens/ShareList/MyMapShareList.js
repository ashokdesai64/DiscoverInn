import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Item, Input, Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './MyMapShareList.style';
import Carousel from 'react-native-snap-carousel';
import Header from './../../components/header/header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'underscore';

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from './../../actions/mapActions';
import {TouchableOpacity} from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
class MyMapShareList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [],
      allMaps: [],
      searchTerm: '',
      fetchingMaps: true,
    };
  }

  componentWillMount() {
    this.props.mapAction
      .sharedMapsList({email: this.props.userData.email, page: '1'})
      .then(data => {
        this.setState({
          carouselItems: data,
          allMaps: data,
          fetchingMaps: false,
        });
      })
      .catch(err => {
        this.setState({carouselItems: [], fetchingMaps: false});
      });
  }

  searchSharedMaps = _.debounce(() => {
    let allMaps = this.state.allMaps,
      searchTerm = this.state.searchTerm,
      filteredMapList = [];
    if (searchTerm.trim() != '') {
      filteredMapList = allMaps.filter(
        map => map.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0,
      );
    } else {
      filteredMapList = [...allMaps];
    }
    this.setState({carouselItems: filteredMapList});
  }, 250);

  navigateToMap(mapID, mapName) {
    this.props.navigation.navigate('MapView', {mapID, mapName});
  }

  _renderItem({item, index}) {
    let avgReview = item.avrage_review || 0;
    return (
      <View style={[styles.mapSlideCard]}>
        <TouchableOpacity
          style={styles.mapSlideCardHeader}
          activeOpacity={0.5}
          onPress={() => this.navigateToMap(item.id, item.name)}>
          <Image
            style={styles.mapSlideCardImg}
            source={{uri: item.cover_image}}
          />
          <View style={styles.mapSlideCardImg_overlay} />
          {/* <Button style={styles.shareButton}>
            <Feather style={styles.shareButtonText} name="share-2" />
          </Button> */}
        </TouchableOpacity>
        <View style={styles.mapSlideCardBody}>
          <View style={styles.mapSlideBadgeGroup}>
            <View style={[styles.badgeRed, styles.badge]}>
              <Text style={[styles.badgeText, styles.badgeRedText]}>
                {item.view || 0} <Feather style={styles.badgeIcon} name="eye" />
              </Text>
            </View>
            <View style={[styles.badgeGreen, styles.badge]}>
              <Text style={[styles.badgeText, styles.badgeGreenText]}>
                {item.avrage_review || 0}{' '}
                <Feather style={styles.badgeIcon} name="star" />
              </Text>
            </View>
          </View>
          <Text style={styles.mapSlideCardTitle}>{item.name}</Text>
          <View style={styles.rateList}>
            {Array(avgReview)
              .fill(1)
              .map(d => {
                return (
                  <MaterialCommunityIcons
                    style={styles.starIcon}
                    name="star"
                    size={15}
                    color="#FFAF2C"
                  />
                );
              })}
            {Array(5 - avgReview)
              .fill(1)
              .map(d => {
                return (
                  <MaterialCommunityIcons
                    style={styles.starIcon}
                    name="star-outline"
                    size={15}
                    color="#FFAF2C"
                  />
                );
              })}
            <Text style={styles.rateListCount}>
              ({item.total_reviews || 0} Reviews)
            </Text>
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
    let {carouselItems} = this.state;

    if (this.state.fetchingMaps) {
      return (
        <View style={{backgroundColor: '#F3F3F4', flex: 1}}>
          <Header
            showBack={true}
            title={'Shared Zone'}
            {...this.props}
            style={styles.bgHeader}
          />
          <View style={styles.container}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                flex: 1,
                marginBottom: 50,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 18,
                  color: '#aaa',
                  marginRight: 10,
                }}>
                Fetching Maps
              </Text>
              <ActivityIndicator size={'small'} color={'#aaa'} />
            </View>
          </View>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}>
        <Header
          showBack={true}
          title={'Shared Zone'}
          {...this.props}
          style={styles.bgHeader}
        />
        <View style={styles.pageContent}>
          <View searchBar style={styles.searchbarCard}>
            <Item style={styles.searchbarInputBox}>
              <Feather style={styles.searchbarIcon} name="search" />
              <Input
                style={styles.searchbarInput}
                placeholder="Search your maps"
                value={this.state.searchTerm}
                onChangeText={searchTerm =>
                  this.setState({searchTerm}, () => {
                    this.searchSharedMaps();
                  })
                }
              />
            </Item>
          </View>
          <View style={{paddingTop: 20}}>
            {carouselItems && carouselItems.length > 0 ? (
              <Carousel
                data={this.state.carouselItems}
                sliderWidth={width}
                itemWidth={310}
                firstItem={1}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                renderItem={this._renderItem.bind(this)}
              />
            ) : (
              <View style={styles.container}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                    marginBottom: 50,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 18,
                      color: '#aaa',
                      marginRight: 10,
                    }}>
                    No Maps found
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.maps.categories,
    userData: state.user.userData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyMapShareList);
