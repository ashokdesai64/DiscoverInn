import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Share from 'react-native-share';
import {checkIfHasPermission} from './../../config/permission';

import {Item, Input, Button, Icon, Textarea, List, CheckBox} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './MapList.style';
import RNFetchBlob from 'rn-fetch-blob';
import Carousel from 'react-native-snap-carousel';
import Header from './../../components/header/header';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import fontelloConfig from './../../selection.json';
import moment from 'moment';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
import ImageBlurLoading from './../../components/ImageLoader';
import Spinner from './../../components/Loader';
import AutoComplete from './../../components/AutoComplete';
import axios from 'axios';
import _ from 'underscore';
import {getBoundingBox} from 'geolocation-utils';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoicmF2aXNvaml0cmF3b3JrIiwiYSI6ImNrYTByeHVxZjBqbGszZXBtZjF3NmJleWgifQ.idSimILJ3_sk1gSWs2sMsQ',
);

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as authActions from './../../actions/authActions';
import * as mapActions from './../../actions/mapActions';
import {callAPI} from '../../Services/network';
import {apiUrls} from '../../config/api';
import KeyboardSpacer from '../PinView/KeyboardSpacer';
MapboxGL.offlineManager.setTileCountLimit(15000);

class MapList extends React.Component {
  constructor(props) {
    super(props);
    this.pageNo = 1;
    this.carousel = null;
    this.mounted = null;
    const {params} = props.navigation.state;
    const searchTerm = (params && params.searchTerm) || '';
    this.state = {
      showTripList: false,
      shareModal: false,
      searchTerm:
        (params.searchObj && params.searchObj.searchUserId ? '@' : '') +
        searchTerm,
      query: '',
      keyboardHeight: 250,
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
      selectedAge: '',
      selectedBudget: '',
      selectedCategory: (params && params.category) || [],
      selectedCreatedWithin: '',
      selectedTravelType: '',
      addReviewValue: 0,
      selectedMap: null,
      addingReview: false,
      fetchingMaps: false,
      selectedUserNames: [],
      selectedUserEmails: [],
      registeredEmail: '',
      wrongEmail: false,
      sharingMap: false,
      showPlaces: false,
      selectedMapCategories: {map_id: null, categories: []},
      sortBy:
        (params && params.searchObj && params.searchObj.sort_by) ||
        'popularity',
      reviewText: '',
    };
  }

  navigateToMap(mapID, mapName) {
    let categories = [];
    if (mapID == this.state.selectedMapCategories.map_id) {
      categories = this.state.selectedMapCategories.categories;
    }
    this.props.navigation.navigate('MapView', {
      mapID,
      mapName,
      filterCategories: categories,
    });
  }

  componentWillMount() {
    let {params} = this.props.navigation.state;
    if (params && params.searchObj) {
      const {searchUserId} = params.searchObj;
      this.setState({fetchingMaps: true});
      if (!!searchUserId) {
        this.props.mapAction
          .fetchUserMapList({userid: searchUserId})
          .then(data => {
            this.setState({fetchingMaps: false});
          })
          .catch(err => {
            this.setState({fetchingMaps: false});
            alert(err);
          });
      } else {
        this.props.mapAction
          .fetchMapList(params.searchObj)
          .then(data => {
            this.setState({fetchingMaps: false});
          })
          .catch(err => {
            this.setState({fetchingMaps: false});
            alert(err);
          });
      }
    }
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
      this._keyboardDidShow(e),
    );
  }
  _keyboardDidShow(e) {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
    });
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    this.keyboardDidShowListener.remove();
  }

  pinToggle(categoryID, mapID, mapName) {
    let {selectedMapCategories} = this.state;
    if (selectedMapCategories.map_id != mapID) {
      this.setState({
        selectedMapCategories: {map_id: mapID, categories: [categoryID]},
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
        selectedMapCategories: {map_id: mapID, categories: [...categories]},
      });
    }
  }

  async downloadAssets(pinImages = []) {
    let downloadPromises = [];
    pinImages.map(pinURL => {
      if (pinURL) {
        let fileName = pinURL.split('/').pop();
        downloadPromises.push(
          RNFetchBlob.config({
            fileCache: true,
            path: RNFetchBlob.fs.dirs.CacheDir + '/discover/' + fileName,
          }).fetch('GET', pinURL),
        );
      }
    });
    return await Promise.all(downloadPromises);
  }

  async downloadMap(mapData) {
    this.setState({
      mapDownloadInProgress: true,
      downloadSpinnerMsg: `Preparing to download map.`,
      downloadSpinnerMsg: 'Downloading map...',
      canGoBack: true,
    });

    if (!this.props.userData || !this.props.userData.id) {
      return alert('You need to login to access this feature');
    }
    let packs = await MapboxGL.offlineManager.getPacks();
    let isDownloaded = packs.find(
      pack => pack.name == `${mapData.id}${mapData.name}`,
    );
    if (isDownloaded) {
      alert('This map is already downloaded');
    } else {
      let hasPermission = await checkIfHasPermission('write_storage');
      if ((Platform.OS == 'android' && hasPermission) || Platform.OS == 'ios') {
        this.props.mapAction
          .getMapPins({
            map_id: mapData.id,
            user_id: this.props.userData && this.props.userData.id,
          })
          .then(async data => {
            let pinList = data.mapID.pin_list || [];

            let featureCollections = [],
              pinLatLongs = [],
              topLeft = null,
              bottomRight = null;

            if (pinList && pinList.length > 0) {
              this.setState({
                mapDownloadInProgress: true,
                downloadSpinnerMsg: `Preparing to download map.`,
              });
              var splitByString = function(source, splitBy) {
                var splitter = splitBy.split('');
                splitter.push([source]); //Push initial value

                return splitter.reduceRight(function(accumulator, curValue) {
                  var k = [];
                  accumulator.forEach(v => (k = [...k, ...v.split(curValue)]));
                  return k;
                });
              };

              let temp = [];
              let pinImages = [];
              pinImages.push(
                mapData.cover_image || mapData.thumb_cover_image || '',
              );
              pinList.map(pin => {
                if (pin.longitude && pin.latitude) {
                  let exploded = splitByString(pin.name, '.,-');
                  let parsed = parseInt(exploded[0]);
                  temp.push({
                    type: 'Feature',
                    id: pin.id,
                    properties: {
                      id: pin.id,
                      mapName: mapData.name,
                      mapID: mapData.id,
                      hasNumber: !isNaN(parsed),
                      number: parsed,
                      category: pin.categories,
                    },
                    geometry: {
                      type: 'Point',
                      coordinates: [
                        parseFloat(pin.longitude),
                        parseFloat(pin.latitude),
                      ],
                    },
                  });
                  if (typeof pin.images == 'string') {
                    pinImages.push(pin.images);
                  } else if (
                    Array.isArray(pin.images) &&
                    pin.images.length > 0
                  ) {
                    pinImages.push(
                      pin.images[0].image || pin.images[0].thumb_image,
                    );
                  }
                }
              });

              featureCollections.push({
                type: `FeatureCollection`,
                features: temp,
                id: Math.random(),
              });

              pinList.map(t => {
                if (t.latitude && t.longitude) {
                  pinLatLongs.push({
                    lat: parseFloat(t.latitude),
                    lon: parseFloat(t.longitude),
                  });
                }
              });
              let boundsResult = getBoundingBox(pinLatLongs);
              topLeft = boundsResult.topLeft;
              bottomRight = boundsResult.bottomRight;
              let filteredCollections = featureCollections.filter(
                collection =>
                  collection &&
                  collection.features &&
                  collection.features.length > 0,
              );

              await this.downloadAssets(pinImages);

              await this.props.mapAction.storeOfflineMapData({
                mapData,
                pinData: filteredCollections,
                pinList,
                bounds: {
                  ne: [topLeft.lon, topLeft.lat],
                  sw: [bottomRight.lon, bottomRight.lat],
                },
              });

              const options = {
                name: `${mapData.id}${mapData.name}`,
                styleURL: MapboxGL.StyleURL.Dark,
                bounds: [
                  [topLeft.lon, topLeft.lat],
                  [bottomRight.lon, bottomRight.lat],
                ],
                minZoom: 10,
                maxZoom: 15,
              };

              this.setState({
                downloadSpinnerMsg: 'Downloading map...',
                canGoBack: true,
              });

              MapboxGL.offlineManager.createPack(
                options,
                async (offlineRegion, offlineRegionStatus) => {
                  if (this.mounted) {
                    this.setState({
                      name: offlineRegion.name,
                      offlineRegion,
                      offlineRegionStatus,
                      downloadSpinnerMsg:
                        Math.floor(offlineRegionStatus.percentage) +
                        '% map downloaded',
                    });
                  }
                  let areAllResourcesDownloaded =
                    offlineRegionStatus.requiredResourceCount ==
                    offlineRegionStatus.completedResourceCount;
                  if (
                    offlineRegionStatus.state == 3 ||
                    areAllResourcesDownloaded
                  ) {
                    alert('Map downloaded Successfully.');
                    if (this.mounted) {
                      this.setState({
                        mapDownloadInProgress: false,
                        canGoBack: false,
                      });
                    }
                  }
                },
              );
            } else {
              alert("This map can't be downloaded as it doesn't have any pin");
            }
          })
          .catch(err => {
            this.setState({mapDownloadInProgress: false});
          });
      } else {
        alert(
          'Please Go into Settings -> Applications -> DiscoverInn -> Permissions and Allow permissions to continue',
        );
      }
    }
  }

  _renderItem(item, index) {
    let avgReview = parseInt(item.avrage_review) || 0;
    let {selectedMapCategories} = this.state;
    let travelType = item.travel_type == '0' ? '-' : item.travel_type;
    return (
      <View style={[styles.mapSlideCard]}>
        <View style={styles.mapSlideCardHeader}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.shareButton}
            onPress={() =>
              this.setState({shareModal: true, shareSelectedMap: item})
            }>
            <Feather style={styles.shareButtonText} name="share-2" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.navigateToMap(item.id, item.name)}>
            <ImageBlurLoading
              withIndicator
              style={styles.mapSlideCardImg}
              source={{uri: item.cover_image}}
              thumbnailSource={{
                uri: 'https://discover-inn.com/upload/cover/map-image.jpeg',
              }}
            />
            <View style={styles.mapSlideCardImg_overlay} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.mapButton}
            onPress={() =>
              this.setState({selectedMap: item, mapDetailsModal: true})
            }>
            <Feather
              style={[styles.shareButtonText, {fontSize: 18}]}
              name="info"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mapSlideCardBody}>
          <View style={styles.mapSlideBadgeGroup}>
            <View style={[styles.badgeRed, styles.badge]}>
              <Text style={[styles.badgeText, styles.badgeRedText]}>
                {item.views || 0}{' '}
                <Feather style={styles.badgeIcon} name="eye" />
              </Text>
            </View>
            <View style={[styles.badgeGreen, styles.badge]}>
              <Text style={[styles.badgeText, styles.badgeGreenText]}>
                {item.avrage_review || 0}{' '}
                <Feather style={styles.badgeIcon} name="star" />
              </Text>
            </View>
          </View>
          <Text
            style={styles.mapSlideCardTitle}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {item.name}
          </Text>
          <Text style={styles.mapSlideCardAuthor} numberOfLines={1}>
            {item.owner || item.username}
          </Text>
          <TouchableOpacity
            style={styles.rateList}
            onPress={() => {
              // this.setState({showReviewModal: true})
              this.props.navigation.navigate('MapReviews', {mapData: item});
            }}>
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
              ({item.total_review || 0} Reviews)
            </Text>
          </TouchableOpacity>
          <View style={styles.mapPins}>
            {item.categories &&
              item.categories.map(category => {
                let categoryIcon = this.state.carouselCateItems.find(
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
                        isCategoryActive &&
                        this.pinToggle(category.id, item.id, item.name)
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
                  {item.budget || '-'}
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
                  {item.date_of_travel ||
                    moment(item.date_created).fromNow() ||
                    '-'}
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.buttonIcon, styles.buttonIconPrimary]}
                onPress={() => this.downloadMap(item)}>
                <Feather style={styles.buttonIconText} name="download-cloud" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonReview,
                  styles.buttonPrimary,
                ]}
                onPress={() => {
                  if (this.props.userData && this.props.userData.id) {
                    this.setState({
                      showAddReviewModal: true,
                      selectedMap: item,
                    });
                  } else {
                    alert('You need to login to access this feature.');
                  }
                }}>
                <Text style={styles.buttonText}>Add Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  sortBy(sortBy) {
    this.pageNo = 1;
    this.setState(
      {sortBy: sortBy == this.state.sortBy ? null : sortBy, sortByModal: false},
      () => {
        this.fetchMapList();
      },
    );
  }

  fetchMapList() {
    const {params} = this.props.navigation.state;
    const {
      selectedAge,
      selectedBudget,
      selectedCategory,
      selectedCreatedWithin,
      selectedTravelType,
    } = this.state;

    this.setState({fetchingMaps: true});

    let apiData = {
      // user_id: this.props.userData.id,
      sort_by: this.state.sortBy || 'rating',
      page: this.pageNo,
      search: this.state.searchTerm || '',
    };
    if (selectedCategory || (params && params.category)) {
      let category = selectedCategory || (params && params.category);
      if (category && category.length) {
        apiData['categorie'] = category;
      }
    }
    if (selectedAge && !!selectedAge.length) {
      apiData['age_at_travel'] = selectedAge;
    }
    if (selectedBudget && !!selectedBudget.length) {
      apiData['budget_limit'] = selectedBudget;
    }
    if (selectedCreatedWithin && !!selectedCreatedWithin.length) {
      apiData['when_travel'] = selectedCreatedWithin;
    }
    if (selectedTravelType && !!selectedTravelType.length) {
      apiData['travel_type'] = selectedTravelType;
    }
    this.props.mapAction
      .fetchMapList(apiData)
      .then(data => {
        this.setState({fetchingMaps: false}, () => {
          if (this.pageNo == 1) {
            this.carousel && this.carousel.snapToItem(0, false);
          }
        });
      })
      .catch(err => {
        this.setState({fetchingMaps: false});
        alert(err);
      });
  }

  fetchUsersMap(userid) {
    this.setState({fetchingMaps: true});
    this.props.mapAction
      .fetchUserMapList({userid})
      .then(data => {
        this.setState({fetchingMaps: false}, () => {
          this.carousel && this.carousel.snapToItem(0, false);
        });
      })
      .catch(err => {
        this.setState({fetchingMaps: false});
        alert(err);
      });
  }

  setParams = filterParams => {
    this.pageNo = 1;
    this.setState({...filterParams}, () => {
      this.fetchMapList();
    });
  };

  loadMoreMaps(index) {
    if (
      parseInt(this.props.mapListCount) > this.props.mapList.length &&
      index + 1 == this.props.mapList.length
    ) {
      this.pageNo += 1;
      this.fetchMapList();
    }
  }

  addReview() {
    const {reviewText, addReviewValue, selectedMap} = this.state;
    if (!addReviewValue) {
      alert('Please select review rate');
      return;
    }
    this.setState({addingReview: true});
    this.props.mapAction
      .addReview({
        map_id: selectedMap.id,
        user_id: this.props.userData.id,
        ratings: addReviewValue,
        review: reviewText.trim(),
      })
      .then(data => {
        this.setState({
          addingReview: false,
          showAddReviewModal: false,
          reviewFocus: false,
        });
      })
      .catch(err => {
        alert(err);
        this.setState({addingReview: false});
      });
  }

  shareToSocial(type) {
    let map = this.state.shareSelectedMap;
    if (type == 'facebook') {
      Share.shareSingle({
        social: Share.Social.FACEBOOK,
        message: map.name,
        url: `https://discover-inn.com/search-maps?map-id=${
          map.id
        }&fb=true&appId=1223643894484714`,
      })
        .then(res => {
          this.setState({shareModal: false});
        })
        .catch(err => {
          this.setState({shareModal: false});
          alert(`Can't share to ${type} because, ${err.error.message}`);
        });
    } else {
      Share.shareSingle({
        social: Share.Social.TWITTER,
        message: map.name,
        url: `https://discover-inn.com/search-maps?map-id=${
          map.id
        }&fb=true&appId=1223643894484714`,
      })
        .then(res => {
          this.setState({shareModal: false});
        })
        .catch(err => {
          this.setState({shareModal: false});
          alert(`Can't share to ${type} because, ${err.error.message}`);
        });
    }
  }

  findUsers(query) {
    if (query === '') {
      return [];
    }
    const {selectedUserNames} = this.state;
    const {allUserNames} = this.props;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return allUserNames.filter(
      user =>
        user.username.search(regex) >= 0 &&
        !selectedUserNames.find(u => u.id == user.id),
    );
  }

  selectedShareUserName(user) {
    let {selectedUserNames} = this.state;
    let userNames = [...selectedUserNames];
    userNames.push(user);
    this.setState({query: '', selectedUserNames: userNames});
  }

  removeSelectedUserName(user) {
    const {selectedUserNames} = this.state;
    let userNames = [...selectedUserNames];
    let selectedIndex = userNames.findIndex(u => u.id == user.id);
    userNames.splice(selectedIndex, 1);
    this.setState({selectedUserNames: userNames});
  }

  shareNewEmail() {
    let {selectedUserEmails, registeredEmail} = this.state;
    let emails = [...selectedUserEmails];
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({wrongEmail: false});
    if (reg.test(registeredEmail)) {
      emails.push(registeredEmail);
      this.setState({selectedUserEmails: emails, registeredEmail: ''});
    } else {
      this.setState({wrongEmail: true});
    }
  }

  removeSelectedEmail(email) {
    const {selectedUserEmails} = this.state;
    let userEmails = [...selectedUserEmails];
    let selectedIndex = userEmails.findIndex(e => e == email);
    userEmails.splice(selectedIndex, 1);
    this.setState({selectedUserEmails: userEmails});
  }

  shareMap() {
    this.setState({sharingMap: true});

    let {shareSelectedMap, selectedUserNames, selectedUserEmails} = this.state;

    if (
      shareSelectedMap.id &&
      (selectedUserNames.length > 0 || selectedUserEmails.length > 0)
    ) {
      this.props.mapAction
        .shareMap({
          user_id: this.props.userData.id,
          map_id: shareSelectedMap.id,
          share_user_id: selectedUserNames.map(u => u.id).join(','),
          email: selectedUserEmails.join(','),
        })
        .then(data => {
          this.setState({
            shareModal: false,
            selectedUserNames: [],
            query: '',
            sharingMap: false,
          });
        })
        .catch(err => {
          this.setState({
            shareModal: false,
            selectedUserNames: [],
            query: '',
            sharingMap: false,
          });
        });
    } else {
      alert("can't share map, invalid request");
    }
  }

  renderResultList() {
    const {placeList} = this.state;
    return (
      <FlatList
        data={placeList}
        keyboardShouldPersistTaps={'always'}
        renderItem={({item, i}) => (
          <TouchableOpacity
            style={{marginBottom: 10, padding: 5}}
            onPress={() =>
              this.setState(
                {searchTerm: item.description, showPlaces: false},
                () => {
                  this.pageNo = 1;
                  this.fetchMapList();
                },
              )
            }>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 16}}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
        renderSeparator={null}
        style={styles.list}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', color: '#bbb', fontSize: 14}}>
            No Places Found
          </Text>
        )}
      />
    );
  }

  renderUsersList() {
    const {placeList} = this.state;
    return (
      <FlatList
        data={placeList}
        keyboardShouldPersistTaps={'always'}
        renderItem={({item, i}) => (
          <TouchableOpacity
            style={{marginBottom: 10, padding: 5}}
            onPress={() =>
              this.setState(
                {searchTerm: '@' + item.name, showPlaces: false},
                () => {
                  this.pageNo = 1;
                  this.fetchUsersMap(item.id);
                },
              )
            }>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 16}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        renderSeparator={null}
        style={styles.list}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', color: '#bbb', fontSize: 14}}>
            No Users Found
          </Text>
        )}
      />
    );
  }

  async fetchUsers(search_value) {
    callAPI(apiUrls.searchUsers, {search_value}).then(result => {
      this.setState({placeList: result.data, showPlaces: true});
    });
  }

  searchPlaces = _.debounce(async () => {
    let searchTerm = this.state.searchTerm && this.state.searchTerm.trim();

    if (searchTerm != '') {
      if (searchTerm[0] == '@') {
        if (searchTerm == '@') {
          this.fetchUsers('@');
        } else {
          this.fetchUsers(searchTerm.replace(/@/g, ''));
        }
      } else {
        this.fetchPlaces(searchTerm.trim());
      }
    } else {
      this.setState({showPlaces: false});
    }
  }, 250);

  async fetchPlaces(search) {
    const APIKey = 'AIzaSyAWb4AJLePv_NjMW00JHNWp6TS_g1x3h60';
    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeURIComponent(
      search,
    )}&key=${APIKey}`;
    try {
      let result = await axios.get(url);
      let places = result.data.predictions || [];
      this.setState({placeList: places, showPlaces: true});
    } catch (err) {
      this.setState({placeList: []});
    }
  }

  render() {
    const {width} = Dimensions.get('window');
    const {
      selectedAge,
      selectedBudget,
      selectedCategory,
      selectedCreatedWithin,
      selectedTravelType,
      addReviewValue,
      selectedMap,
    } = this.state;
    const {query, selectedUserNames, selectedUserEmails} = this.state;
    const userNames = this.findUsers(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <Fragment>
        <Spinner
          visible={this.state.fetchingMaps}
          textContent={'Loading maps...'}
          textStyle={{color: '#fff'}}
        />
        <Spinner
          visible={this.state.mapDownloadInProgress}
          textContent={this.state.downloadSpinnerMsg}
          textStyle={{color: '#fff'}}
          canGoBack={this.state.canGoBack}
          backButtonText={'Download in background'}
          onGoBack={() =>
            this.setState({mapDownloadInProgress: false, canGoBack: false})
          }
        />
        <Header
          showBack={true}
          title={'Discover Inn'}
          {...this.props}
          style={{backgroundColor: '#F3F4F6'}}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.searchSection}>
            <View searchBar style={styles.searchbarCard}>
              <Item style={styles.searchbarInputBox}>
                <Feather style={styles.searchbarIcon} name="search" />
                <Input
                  style={styles.searchbarInput}
                  placeholder="Discover maps or search @user_name"
                  value={this.state.searchTerm}
                  onChangeText={searchTerm =>
                    this.setState({searchTerm}, () => {
                      this.searchPlaces();
                    })
                  }
                />
              </Item>
              <Button
                style={styles.searchbarCardButton}
                disabled={this.state.searchTerm[0] === '@'}
                onPress={() => this.fetchMapList()}>
                <Feather
                  style={styles.searchbarCardButtonIcon}
                  name="arrow-right"
                />
              </Button>
            </View>
            <View style={styles.searchSectionAction}>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  styles.iconButtonWhite,
                  styles.iconbuttonShort,
                ]}
                activeOpacity={0.8}
                onPress={() => this.setState({sortByModal: true})}>
                <Feather style={styles.iconButtonIcon} name="sliders" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  styles.iconButtonWhite,
                  styles.iconbuttonFilter,
                ]}
                activeOpacity={0.8}
                onPress={() =>
                  this.props.navigation.navigate('FilterScreen', {
                    setParams: this.setParams,
                    selectedAge,
                    selectedBudget,
                    selectedCategory,
                    selectedCreatedWithin,
                    selectedTravelType,
                  })
                }>
                <Feather style={styles.iconButtonIcon} name="filter" />
              </TouchableOpacity>
            </View>
          </View>

          {this.state.showPlaces && (
            <ScrollView
              nestedScrollEnabled={true}
              style={{
                maxHeight: 200,
                position: 'absolute',
                zIndex: 99999,
                top: 45,
                marginHorizontal: 10,
                borderWidth: 1,
                borderColor: '#ddd',
                width:width-20
              }}
              keyboardShouldPersistTaps={'always'}>
              {this.state.searchTerm[0] == '@'
                ? this.renderUsersList()
                : this.renderResultList()}
            </ScrollView>
          )}

          <View style={styles.searchresultCard}>
            <Text style={styles.searchresultText}>
              {this.props.mapListCount || 0} Results Found
            </Text>
            {/* {this.props.userData && this.props.userData.id && (
              <TouchableOpacity
                style={styles.searchresultSelect}
                onPress={() => this.setState({showTripList: true})}>
                <Text style={styles.searchresultSelectText}>
                  Select Trip List
                </Text>
                <Feather
                  style={styles.searchresultSelectIcon}
                  name="chevron-down"
                />
              </TouchableOpacity>
            )} */}
          </View>
          <View style={[styles.shareMapContant, {flex: 1}]}>
            {this.props.mapList && this.props.mapList.length > 0 ? (
              <Carousel
                ref={c => (this.carousel = c)}
                data={this.props.mapList}
                sliderWidth={width}
                itemWidth={310}
                firstItem={0}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                renderItem={({item, index}) => this._renderItem(item, index)}
                onSnapToItem={index => {
                  this.loadMoreMaps(index);
                }}
              />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
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
                  No Maps Found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* show trip list modal */}
        <Dialog
          rounded={false}
          visible={this.state.showTripList}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({showTripList: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 200, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({showTripList: false});
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>
                Select Trip List
              </Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({showTripList: false})}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.createListButton}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() =>
                  this.setState({showTripList: false, saveToListModal: true})
                }>
                <Text style={styles.buttonText}>Create a New List</Text>
              </TouchableOpacity>
            </View>

            {this.props.tripList && (
              <View style={styles.orDivider}>
                <Text style={styles.orDividerBorder} />
                <Text style={styles.orDividerText}>OR</Text>
              </View>
            )}

            <View style={styles.selectList}>
              {this.props.tripList
                ? this.props.tripList.map(trip => {
                    let tripID = trip.id;
                    return (
                      <View style={styles.selectListItem}>
                        <CheckBox
                          checked={this.state.selectedTripID == tripID}
                          color={'#2F80ED'}
                          style={[
                            styles.selectListRadioButton,
                            {marginRight: 10},
                          ]}
                          onPress={() =>
                            this.setState({
                              selectedTripID:
                                this.state.selectedTripID == tripID
                                  ? null
                                  : tripID,
                            })
                          }
                        />
                        <Text style={styles.selectListText}>{trip.name}</Text>
                      </View>
                    );
                  })
                : null}
            </View>
          </DialogContent>
        </Dialog>

        {/* save to trip list modal */}
        <Dialog
          rounded={false}
          visible={this.state.saveToListModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({saveToListModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 200, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({saveToListModal: false});
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>
                Select Trip List
              </Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({saveToListModal: false})}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Name</Text>
              <TextInput
                style={styles.formControl}
                placeholder={'Enter trip list name'}
                placeholderTextColor={'#828894'}
              />
            </View>

            <View style={styles.buttonCTGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonCT,
                  styles.buttonCTCancel,
                  styles.buttonOutline,
                ]}
                onPress={() => this.setState({saveToListModal: false})}>
                <Text style={[styles.buttonText, styles.buttonTextDark]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonCT,
                  styles.buttonCTSubmit,
                  styles.buttonPrimary,
                ]}
                onPress={() => this.setState({saveToListModal: false})}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.orDivider}>
              <Text style={styles.orDividerBorder} />
              <Text style={styles.orDividerText}>OR</Text>
            </View>
          </DialogContent>
        </Dialog>

        {/* sort by modal */}
        <Dialog
          rounded={false}
          visible={this.state.sortByModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({sortByModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 200, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({sortByModal: false});
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Sort By</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({sortByModal: false})}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.selectList}>
              <TouchableOpacity
                onPress={() => this.sortBy('popularity')}
                style={styles.selectListItem}>
                <CheckBox
                  checked={this.state.sortBy == 'popularity'}
                  color={'#2F80ED'}
                  style={[styles.selectListRadioButton, {marginRight: 10}]}
                  onPress={() => this.sortBy('popularity')}
                />
                <Text style={styles.selectListText}>Popularity</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.sortBy('rating')}
                style={styles.selectListItem}>
                <CheckBox
                  checked={this.state.sortBy == 'rating'}
                  color={'#2F80ED'}
                  style={[styles.selectListRadioButton, {marginRight: 10}]}
                />
                <Text style={styles.selectListText}>Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.sortBy('distance')}
                style={[styles.selectListItem, {borderBottomWidth: 0}]}>
                <CheckBox
                  checked={this.state.sortBy == 'distance'}
                  color={'#2F80ED'}
                  style={[styles.selectListRadioButton, {marginRight: 10}]}
                />
                <Text style={styles.selectListText}>Distance</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>

        {/* show add review modal */}
        <Dialog
          rounded={false}
          visible={this.state.showAddReviewModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({showAddReviewModal: false, reviewFocus: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({showAddReviewModal: false, reviewFocus: false});
            return true;
          }}
          dialogStyle={[styles.customPopup, {bottom: 0}]}>
          <DialogContent style={styles.customPopupContent}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>Add Review</Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() =>
                    this.setState({
                      showAddReviewModal: false,
                      reviewFocus: false,
                    })
                  }>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Rating</Text>
                <View style={{flexDirection: 'row'}}>
                  {Array(5)
                    .fill(1)
                    .map((d, i) => {
                      return (
                        <MaterialCommunityIcons
                          onPress={() => this.setState({addReviewValue: i + 1})}
                          style={styles.starIcon}
                          name={
                            addReviewValue >= i + 1 ? 'star' : 'star-outline'
                          }
                          size={22}
                          color="#FFAF2C"
                        />
                      );
                    })}
                </View>
              </View>
              <View>
                <Text style={styles.formLabel}>Review:</Text>
                <Textarea
                  placeholder={'Type your review'}
                  placeholderTextColor={'#828894'}
                  rowSpan={5}
                  onFocus={() => {
                    this.setState({reviewFocus: true});
                  }}
                  onBlur={() => {
                    this.setState({reviewFocus: false});
                  }}
                  style={styles.formControlTextarea}
                  onChangeText={reviewText => this.setState({reviewText})}
                />
              </View>
              <View style={styles.customPopupFooter}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => this.addReview()}>
                  {this.state.addingReview ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <KeyboardSpacer />
          </DialogContent>
        </Dialog>

        {/* share modal */}
        <Dialog
          rounded={false}
          visible={this.state.shareModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({
              shareModal: false,
              selectedUserNames: [],
              query: '',
            });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({
              shareModal: false,
              selectedUserNames: [],
              query: '',
            });
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>
                  Share Your Map
                </Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() =>
                    this.setState({
                      shareModal: false,
                      selectedUserNames: [],
                      query: '',
                    })
                  }>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.formLabel}>Share With:</Text>
                <View style={styles.shareSocial}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonFacebook]}
                    onPress={() => this.shareToSocial('facebook')}>
                    <Feather name={'facebook'} color={'white'} size={16} />
                    <Text style={[styles.buttonText]}>Facebook</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonTwitter]}
                    onPress={() => this.shareToSocial('twitter')}>
                    <Feather name={'twitter'} color={'white'} size={16} />
                    <Text style={[styles.buttonText]}>Twitter</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {this.props.userData && this.props.userData.id && (
                <>
                  <View style={styles.orDivider}>
                    <Text style={styles.orDividerBorder} />
                    <Text style={styles.orDividerText}>OR</Text>
                  </View>

                  <View style={[styles.formGroup, {marginBottom: 5}]}>
                    <Text style={styles.formLabel}>Registered Users Name</Text>
                    <AutoComplete
                      autoCapitalize="none"
                      autoCorrect={false}
                      data={
                        userNames.length === 1 &&
                        comp(query, userNames[0].username)
                          ? []
                          : userNames
                      }
                      defaultValue={query}
                      onChangeText={text => this.setState({query: text})}
                      placeholder="Enter Name"
                      renderItem={({item, i}) => (
                        <TouchableOpacity
                          style={{flex: 1, margin: 5, padding: 5}}
                          onPress={() => this.selectedShareUserName(item)}>
                          <Text style={{fontFamily: 'Montserrat-Medium'}}>
                            {item.username}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    {selectedUserNames &&
                      selectedUserNames.length > 0 &&
                      selectedUserNames.map(user => {
                        return (
                          <View
                            style={{
                              height: 30,
                              flexDirection: 'row',
                              backgroundColor: '#ccc',
                              borderRadius: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingHorizontal: 5,
                              margin: 5,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Medium',
                                marginRight: 10,
                              }}>
                              {user.username}
                            </Text>
                            <TouchableOpacity
                              onPress={() => this.removeSelectedUserName(user)}
                              style={{
                                backgroundColor: '#aaa',
                                height: 20,
                                width: 20,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Feather name={'x'} color={'white'} />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </View>
                  <View style={[styles.formGroup, {marginBottom: 5}]}>
                    <Text style={styles.formLabel}>
                      Not Registered Users Email:
                    </Text>
                    <TextInput
                      style={[
                        styles.formControl,
                        {
                          borderColor: this.state.wrongEmail
                            ? 'red'
                            : '#BDBDBD',
                        },
                      ]}
                      placeholder={'Enter Email'}
                      placeholderTextColor={'#828894'}
                      returnKeyType={'done'}
                      onChangeText={registeredEmail =>
                        this.setState({registeredEmail})
                      }
                      value={this.state.registeredEmail}
                      onSubmitEditing={() => this.shareNewEmail()}
                      blurOnSubmit={false}
                      autoCompleteType={'email'}
                      keyboardType={'email-address'}
                      textContentType={'emailAddress'}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    {selectedUserEmails &&
                      selectedUserEmails.length > 0 &&
                      selectedUserEmails.map(email => {
                        return (
                          <View
                            style={{
                              height: 30,
                              flexDirection: 'row',
                              backgroundColor: '#ccc',
                              borderRadius: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingHorizontal: 5,
                              margin: 5,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Medium',
                                marginRight: 10,
                              }}>
                              {email}
                            </Text>
                            <TouchableOpacity
                              onPress={() => this.removeSelectedEmail(email)}
                              style={{
                                backgroundColor: '#aaa',
                                height: 20,
                                width: 20,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Feather name={'x'} color={'white'} />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </View>
                  <View style={styles.customPopupFooter}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonPrimary]}
                      onPress={() => this.shareMap()}>
                      {this.state.sharingMap ? (
                        <ActivityIndicator size={'small'} color={'white'} />
                      ) : (
                        <Text style={styles.buttonText}>Submit</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </DialogContent>
        </Dialog>

        {/* map details modal */}
        <Dialog
          rounded={false}
          visible={this.state.mapDetailsModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({mapDetailsModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({mapDetailsModal: false});
            return true;
          }}
          dialogStyle={[styles.customPopup]}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Map Details</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({mapDetailsModal: false})}>
                <Feather
                  style={styles.buttonCloseIcon}
                  name={'x'}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{backgroundColor: 'white' ,paddingBottom: 20}}>
              <View style={(styles.mdPopupImgCard, {height: 180})}>
                <ImageBlurLoading
                  withIndicator
                  style={styles.mdPopupImages}
                  source={{uri: selectedMap && selectedMap.cover_image}}
                  thumbnailSource={{
                    uri: 'https://discover-inn.com/upload/cover/map-image.jpeg',
                  }}
                />
              </View>

              <Text style={styles.mdPopupTitle}>
                {selectedMap && selectedMap.name}
              </Text>
              <View style={styles.mdPopupAuthor}>
                <Text style={styles.mdPopupAuthorLabel}>Traveller: </Text>
                <Text style={styles.mdPopupAuthorName}>
                  {' '}
                  {selectedMap && (selectedMap.owner || selectedMap.username)}
                </Text>
              </View>
              <Text style={styles.mdPopupDis}>
                {selectedMap && selectedMap.description}{' '}
              </Text>
            </ScrollView>
          </DialogContent>
        </Dialog>

        {/* show review modal */}
        <Dialog
          rounded={false}
          visible={this.state.showReviewModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({showReviewModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({showReviewModal: false});
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Map Review</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({showReviewModal: false})}>
                <Feather
                  style={styles.buttonCloseIcon}
                  name={'x'}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.reviewCard}>
              <View style={styles.reviewCardHeader}>
                <View style={styles.reviewCardHeaderLeft}>
                  <Image
                    style={styles.reviewCardAvatar}
                    source={require('./../../Images/place.jpg')}
                  />
                  <View style={styles.reviewCardHeading}>
                    <Text style={styles.reviewCardTitle}>
                      Meadow Rain Walker
                    </Text>
                    <View style={styles.reviewCardRateList}>
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
                    </View>
                  </View>
                </View>

                <Text style={styles.reviewTime}>4 Weeks</Text>
              </View>
              <View style={styles.reviewCardBody}>
                <Image
                  style={styles.reviewExclamationmark}
                  source={require('./../../Images/exclamation.png')}
                />
                <Text style={styles.reviewCardText}>
                  {' '}
                  The sun soaked in the sea and sands of Goa beckon a thirsty
                  traveler(pun intended) from around the world, including yours
                  truly! I have been to Goa at least four times but this was my
                  first visit after eight long years. Yes friends, the waitwas
                  excruciating for the sun, sand and the beer lover{' '}
                </Text>
              </View>
            </View>

            <Text style={styles.reviewReport}>Report Abuse</Text>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
    mapList: state.maps.mapList,
    mapListCount: state.maps.mapListCount,
    tripList: state.maps.tripList,
    mapListLoaded: state.maps.mapListLoaded,
    allUserNames: state.maps.allUserNames,
    travelTypes: state.maps.travelTypes,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authActions, dispatch),
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapList);
