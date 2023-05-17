import React from 'react';
import { View, Text, ScrollView, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { Item, Input, Button } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './OfflineMaps.style';
import Carousel from 'react-native-snap-carousel';
import Header from './../../components/header/header';
import ImageBlurLoading from './../../components/ImageLoader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'underscore';
import RNFetchBlob from 'rn-fetch-blob';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../actions/mapActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

class OfflineMaps extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = null;
    this.state = {
      allMaps: [],
      searchTerm: '',
      fetchingMaps: true,
      offlineMaps: props.offlineMaps,
      deleteInProgrss: false,
      showDeleteModal: false,
      selectedMapCategories: { map_id: null, categories: [] },
      carouselCateItems: [
        {
          title: 'Sights',
          icon: 'sights',
        },
        {
          title: 'Activities',
          icon: 'activities',
        },
        {
          title: 'Restaurants',
          icon: 'restaurants',
        },
        {
          title: 'Nightlife',
          icon: 'nightlife',
        },
        {
          title: 'Transportations',
          icon: 'transportations',
        },
        {
          title: 'Shopping',
          icon: 'shopping',
        },
        {
          title: 'Other',
          icon: 'other',
        },
      ],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.offlineMaps &&
      nextProps.offlineMaps.length != this.state.offlineMaps
    ) {
      this.setState({ offlineMaps: nextProps.offlineMaps });
    }
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
    this.setState({ offlineMaps: filteredMapList });
  }, 250);

  navigateToOfflineMap(mapData, mapID) {
    let categories = [];
    if (mapID == this.state.selectedMapCategories.map_id) {
      categories = this.state.selectedMapCategories.categories;
    }
    this.props.navigation.navigate('OfflineMapView', {
      mapData,
      filterCategories: categories,
    });
  }

  pinToggle(categoryID, mapID) {
    let { selectedMapCategories } = this.state;
    if (selectedMapCategories.map_id != mapID) {
      this.setState({
        selectedMapCategories: { map_id: mapID, categories: [categoryID] },
      });
    } else {
      let categories = selectedMapCategories.categories;
      let categoryIndex = categories.findIndex(a => a == categoryID);
      if (categoryIndex >= 0) {
        categories.splice(categoryIndex, 1);
      } else {
        categories.push(categoryID);
      }
      this.setState({
        selectedMapCategories: { map_id: mapID, categories: [...categories] },
      });
    }
  }

  deleteOfflineMap(mapData) {
    MapboxGL.offlineManager
      .deletePack(`${mapData.id}${mapData.name}`)
      .then(() => {
        this.props.mapAction.removeOfflineMapData(mapData);
        this.setState({ deleteInProgress: false, showDeleteModal: false });
      })
      .catch(err => {
        this.setState({ deleteInProgress: false, showDeleteModal: false }, () => {
          alert(err);
        });
      });
  }

  _renderItem({ item, index }) {
    let avgReview = item.avrage_review || 0;
    let imagePath = item.cover_image || item.thumb_cover_image || '';
    let fileName = imagePath && imagePath.split('/').pop();
    let endPath = RNFetchBlob.fs.dirs.CacheDir + '/discover/' + fileName;
    let displayPath = Platform.OS === 'android' ? 'file://' + endPath : endPath;

    let travelType = item.travel_type == '0' ? '-' : item.travel_type;
    if (this.props.travelTypes) {
      let currentTravelType = this.props.travelTypes.find(
        type => type.id == travelType,
      );
      travelType = (currentTravelType && currentTravelType.name) || '-';
    }
    let { selectedMapCategories } = this.state;


    return (
      <View style={[styles.mapSlideCard]}>
        <TouchableOpacity
          style={styles.mapSlideCardHeader}
          activeOpacity={0.5}
          onPress={() => this.navigateToOfflineMap(item, item.id)}>
          <ImageBlurLoading
            withIndicator
            style={styles.mapSlideCardImg}
            source={{
              uri: imagePath,
            }}
            thumbnailSource={{
              uri: imagePath,
            }}
          />

          <View style={styles.mapSlideCardImg_overlay} />
          {/* <Button style={styles.shareButton}>
            <Feather style={styles.shareButtonText} name="share-2" />
          </Button> */}
        </TouchableOpacity>
        <View style={styles.mapSlideCardBody}>
          {/* <View style={styles.mapSlideBadgeGroup}>
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
          </View> */}
          <Text
            style={styles.mapSlideCardTitle}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {item.name}
          </Text>
          <Text style={styles.mapSlideCardAuthor} numberOfLines={1}>
            {item.username}
          </Text>
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
          <View style={styles.mapPins}>
            {item.categories &&
              item.categories.map(category => {
                let categoryIcon =
                  this.state.carouselCateItems &&
                  this.state.carouselCateItems.find(
                    c => c.title == category.name,
                  );
                let isCategoryActive = category.disabled == '0';
                let isCategorySelected = false;
                if (
                  selectedMapCategories.map_id == item.id &&
                  selectedMapCategories.categories.includes(category.id)
                ) {
                  isCategorySelected = true;
                }
                return (
                  <View
                    style={
                      isCategorySelected
                        ? styles.selectedCat
                        : styles.unSelectedCat
                    }>
                    <TouchableOpacity
                      onPress={() =>
                        isCategoryActive && this.pinToggle(category.id, item.id)
                      }
                      style={[
                        {
                          borderRadius: 3,
                          height: isCategorySelected ? 25 : 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: isCategorySelected ? 25 : 30,
                          backgroundColor: isCategoryActive
                            ? '#2F80ED'
                            : 'rgba(47, 128, 237, 0.1)',
                        },
                      ]}>
                      <IconMoon
                        size={14}
                        name={categoryIcon.icon}
                        color={isCategoryActive ? 'white' : '#2F80ED'}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
          <View style={styles.mapDetaileGrid}>
            <View style={[styles.mapDetaileItem, styles.mapDetaileItemTop]}>
              <View
                style={[styles.mapDetaileChild, styles.mapDetaileChildLeft]}>
                <Text style={[styles.mapDetaileTitle]}>Travel Type</Text>
                <Text style={[styles.mapDetaileValue]}>{travelType}</Text>
              </View>
              <View
                style={[styles.mapDetaileChild, styles.mapDetaileChildRight]}>
                <Text style={[styles.mapDetaileTitle]}>Budget</Text>
                <Text style={[styles.mapDetaileValue]}>
                  {item.budget_limit || '-'}
                </Text>
              </View>
            </View>

            <View style={[styles.mapDetaileItem, styles.mapDetaileItemBottom]}>
              <View
                style={[styles.mapDetaileChild, styles.mapDetaileChildLeft]}>
                <Text style={[styles.mapDetaileTitle]}>Age</Text>
                <Text style={[styles.mapDetaileValue]}>
                  {item.age_at_travel || '-'}
                </Text>
              </View>
              <View
                style={[styles.mapDetaileChild, styles.mapDetaileChildRight]}>
                <Text style={[styles.mapDetaileTitle]}>Created</Text>
                <Text style={[styles.mapDetaileValue]}>
                  {moment(item.date_created).format('YYYY-MM-DD') ||
                    moment(item.date_created).fromNow() ||
                    '-'}
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => {
                  this.setState({
                    showDeleteModal: true,
                  })
                }}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Dialog
          rounded={false}
          visible={this.state.showDeleteModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ showDeleteModal: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ showDeleteModal: false });
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Delete Map</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({ showDeleteModal: false })}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.deleteModalBody}>
              <Text style={styles.deleteModalBodyText}>
                {' '}
                Are you sure you want to delete this downloaded map?{' '}
              </Text>
            </View>

            <View style={[styles.footerButton]}>
              <Button
                style={[
                  styles.button,
                  styles.buttonOutline,
                  styles.buttonOutlineGray,
                  styles.buttonDecline,
                ]}
                onPress={() => {
                  this.setState({ showDeleteModal: false });
                }}>
                <Text style={[styles.buttonText, styles.buttonTextGray]}>
                  {' '}
                  Not Now{' '}
                </Text>
              </Button>
              <Button
                style={[styles.button, styles.buttonDanger, styles.buttonSave]}
                onPress={() => {
                  this.setState({ showDeleteModal: false });
                  this.deleteOfflineMap(item);
                }}
              >
                 {this.state.deleteInProgrss ? (
                      <ActivityIndicator size={'small'} color={'white'} />
                    ) : (
                      <Text style={styles.buttonText}>Yes Sure</Text>
                    )}
              </Button>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }

  render() {
    const { width } = Dimensions.get('window');
    let { offlineMaps } = this.state;
    let maps = (offlineMaps || []).map(data => {
      data.mapData['pinData'] = data.pinData;
      data.mapData['bounds'] = data.bounds;
      data.mapData['pinList'] = data.pinList;
      return data.mapData;
    });
    return (
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}>
        <Header
          showBack={false}
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
                  this.setState({ searchTerm }, () => {
                    this.searchSharedMaps();
                  })
                }
              />
            </Item>
          </View>
          <View style={{ paddingTop: 20 }}>
            {maps && maps.length > 0 ? (
              <Carousel
                ref={c => (this.carousel = c)}
                data={maps}
                sliderWidth={width}
                itemWidth={310}
                firstItem={1}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                renderItem={this._renderItem.bind(this)}
                useScrollView={true}
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
    travelTypes: state.maps.travelTypes,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OfflineMaps);
