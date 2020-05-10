import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Item, Input, Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './OfflineMaps.style';
import Carousel from 'react-native-snap-carousel';
import Header from './../../components/header/header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'underscore';

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from './../../actions/mapActions';
import {TouchableOpacity} from 'react-native-gesture-handler';

class OfflineMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allMaps: [],
      searchTerm: '',
      fetchingMaps: true,
      offlineMaps:props.offlineMaps
    };
  }

  searchSharedMaps = _.debounce(() => {
    let allMaps = this.props.offlineMaps,
      searchTerm = this.state.searchTerm,
      filteredMapList = [];
    if (searchTerm.trim() != '') {
      filteredMapList = allMaps.filter(
        map =>
          map.mapData.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0,
      );
    } else {
      filteredMapList = [...allMaps];
    }
    this.setState({offlineMaps: filteredMapList});
  }, 250);

  navigateToMap(mapID, mapName) {
    this.props.navigation.navigate('MapView', {mapID, mapName});
  }

  navigateToOfflineMap(mapData) {
    console.log("mapData => ", mapData);
    this.props.navigation.navigate('OfflineMapView', {mapData});
  }

  _renderItem({item, index}) {
    let avgReview = item.avrage_review || 0;
    return (
      <View style={[styles.mapSlideCard]}>
        <TouchableOpacity
          style={styles.mapSlideCardHeader}
          activeOpacity={0.5}
          onPress={() => this.navigateToOfflineMap(item)}>
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
    let {offlineMaps} = this.state;
    let maps = (offlineMaps || []).map(data => {
      data.mapData['pinData'] = data.pinData;
      data.mapData['bounds'] = data.bounds;
      return data.mapData
    });
    return (
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}>
        <Header
          showBack={true}
          title={'Downloaded Maps'}
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
            {maps && maps.length > 0 ? (
              <Carousel
                data={maps}
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
    offlineMaps: state.maps.offlineMaps,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OfflineMaps);
