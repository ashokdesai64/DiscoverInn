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
} from 'react-native';
import Share from 'react-native-share';
import {Item, Input, Button, Icon, Textarea, List, CheckBox} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './MapList.style';
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

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as authActions from './../../actions/authActions';
import * as mapActions from './../../actions/mapActions';

class MapList extends React.Component {
  constructor(props) {
    super(props);
    this.pageNo = 1;
    const {params} = props.navigation.state;
    console.log('params => ', params);
    this.state = {
      showTripList: false,
      shareModal: false,
      searchTerm: (params && params.searchTerm) || '',
      query: '',
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
    };
  }

  navigateToMap(mapID, mapName) {
    this.props.navigation.navigate('MapView', {mapID, mapName});
  }

  _renderItem(item, index) {
    let avgReview = parseInt(item.avrage_review);
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
              thumbnailSource={{uri: 'https://picsum.photos/id/1/50/50'}}
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
                {item.views} <Feather style={styles.badgeIcon} name="eye" />
              </Text>
            </View>
            <View style={[styles.badgeGreen, styles.badge]}>
              <Text style={[styles.badgeText, styles.badgeGreenText]}>
                {item.avrage_review}{' '}
                <Feather style={styles.badgeIcon} name="star" />
              </Text>
            </View>
          </View>
          <Text style={styles.mapSlideCardTitle}>{item.name}</Text>
          <TouchableOpacity
            style={styles.rateList}
            onPress={() => this.setState({showReviewModal: true})}>
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
              ({item.total_review} Reviews)
            </Text>
          </TouchableOpacity>
          <View style={styles.mapPins}>
            {item.categories &&
              item.categories.map(category => {
                let categoryIcon = this.state.carouselCateItems.find(
                  c => c.title == category.name,
                );
                let isCategoryActive = parseInt(category.disabled) || 0;
                return (
                  <View
                    style={[
                      styles.singlePin,
                      {
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
                  </View>
                );
              })}
          </View>
          <View style={styles.mapDetaileGrid}>
            <View style={[styles.mapDetaileItem, styles.mapDetaileItemTop]}>
              <View
                style={[styles.mapDetaileChild, styles.mapDetaileChildLeft]}>
                <Text style={[styles.mapDetaileTitle]}>Travel Type</Text>
                <Text style={[styles.mapDetaileValue]}>
                  {item.travel_type || '-'}
                </Text>
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
                  {moment(item.date_created).fromNow() || '-'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.buttonReview, styles.buttonPrimary]}
              onPress={() =>
                this.setState({showAddReviewModal: true, selectedMap: item})
              }>
              <Text style={styles.buttonText}>Add Review</Text>
            </TouchableOpacity>
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
      user_id: this.props.userData.id,
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
        this.setState({fetchingMaps: false});
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
      index == this.props.mapList.length - 2
    ) {
      this.pageNo += 1;
      this.fetchMapList();
    }
  }

  addReview() {
    const {reviewText, addReviewValue, selectedMap} = this.state;
    if (!reviewText || !reviewText.trim()) {
      alert("Review can't be empty");
      return;
    }
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
        this.setState({addingReview: false, showAddReviewModal: false});
      })
      .catch(err => {
        console.log('err => ', err);
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
        url: `https://discover-inn.com/search-maps?map-id=${map.id}&fb=true&appId=1223643894484714`,
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
        url: `https://discover-inn.com/search-maps?map-id=${map.id}&fb=true&appId=1223643894484714`,
      })
        .then(res => {
          this.setState({shareModal: false});
        })
        .catch(err => {
          this.setState({shareModal: false});
          console.log('err => ', err);
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
          console.log('share complete ', data);
          this.setState({
            shareModal: false,
            selectedUserNames: [],
            query: '',
            sharingMap: false,
          });
        })
        .catch(err => {
          console.log('got error while sharing map ', err);
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
          keyboardShouldPersistTaps={'always'}>
          <View style={styles.searchSection}>
            <View searchBar style={styles.searchbarCard}>
              <Item style={styles.searchbarInputBox}>
                <Feather style={styles.searchbarIcon} name="search" />
                <Input
                  style={styles.searchbarInput}
                  placeholder="Type in your next destination!"
                  value={this.state.searchTerm}
                  onChangeText={searchTerm => this.setState({searchTerm})}
                />
              </Item>
              <Button
                style={styles.searchbarCardButton}
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

          <View style={styles.searchresultCard}>
            <Text style={styles.searchresultText}>
              {this.props.mapListCount || 0} Results Found
            </Text>
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
          </View>
          <View style={styles.shareMapContant}>
            <Carousel
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
                <Text style={styles.orDividerBorder}></Text>
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
              <Text style={styles.orDividerBorder}></Text>
              <Text style={styles.orDividerText}>OR</Text>
            </View>

            <ScrollView style={{height: 200}}>
              <View style={styles.selectListItem}>
                <Text style={styles.selectListText}>Manali</Text>
              </View>
              <View style={styles.selectListItem}>
                <Text style={styles.selectListText}>Leh Ladakh</Text>
              </View>
              <View style={styles.selectListItem}>
                <Text style={styles.selectListText}>Karala</Text>
              </View>
              <View style={styles.selectListItem}>
                <Text style={styles.selectListText}>Sikkim</Text>
              </View>
              <View style={styles.selectListItem}>
                <Text style={styles.selectListText}>Sikkim</Text>
              </View>
              <View style={styles.selectListItem}>
                <Text style={styles.selectListText}>Sikkim</Text>
              </View>
              <View style={styles.selectListItem}>
                <Text style={styles.selectListText}>Sikkim</Text>
              </View>

              <View style={styles.selectListItem}>
                <Text style={styles.selectListText}>Sikkim</Text>
              </View>
              <View style={styles.selectListItem}>
                <Text style={styles.selectListText}>Sikkim</Text>
              </View>
              <View style={[styles.selectListItem, {borderBottomWidth: 0}]}>
                <Text style={styles.selectListText}>Sikkim</Text>
              </View>
            </ScrollView>
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
              <View style={styles.selectListItem}>
                <CheckBox
                  checked={this.state.sortBy == 'popularity'}
                  color={'#2F80ED'}
                  style={[styles.selectListRadioButton, {marginRight: 10}]}
                  onPress={() => this.sortBy('popularity')}
                />
                <Text style={styles.selectListText}>Popularity</Text>
              </View>
              <View style={styles.selectListItem}>
                <CheckBox
                  checked={this.state.sortBy == 'rating'}
                  color={'#2F80ED'}
                  style={[styles.selectListRadioButton, {marginRight: 10}]}
                  onPress={() => this.sortBy('rating')}
                />
                <Text style={styles.selectListText}>Rating</Text>
              </View>
              <View style={[styles.selectListItem, {borderBottomWidth: 0}]}>
                <CheckBox
                  checked={this.state.sortBy == 'distance'}
                  color={'#2F80ED'}
                  style={[styles.selectListRadioButton, {marginRight: 10}]}
                  onPress={() => this.sortBy('distance')}
                />
                <Text style={styles.selectListText}>Distance</Text>
              </View>
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
            this.setState({showAddReviewModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({showAddReviewModal: false});
            return true;
          }}
          dialogStyle={[styles.customPopup]}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Add Review</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({showAddReviewModal: false})}>
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
                        name={addReviewValue >= i + 1 ? 'star' : 'star-outline'}
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

              <View style={styles.orDivider}>
                <Text style={styles.orDividerBorder}></Text>
                <Text style={styles.orDividerText}>OR</Text>
              </View>

              <View style={[styles.formGroup, {marginBottom: 5}]}>
                <Text style={styles.formLabel}>Registered Users Name</Text>
                <AutoComplete
                  autoCapitalize="none"
                  autoCorrect={false}
                  // containerStyle={styles.autocompleteContainer}
                  data={
                    userNames.length === 1 && comp(query, userNames[0].username)
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
                    {borderColor: this.state.wrongEmail ? 'red' : '#BDBDBD'},
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
              style={{backgroundColor: 'white'}}
              showsVerticalScrollIndicator={false}>
              <View style={(styles.mdPopupImgCard, {height: 180})}>
                <ImageBlurLoading
                  withIndicator
                  style={styles.mdPopupImages}
                  source={{uri: selectedMap && selectedMap.cover_image}}
                  thumbnailSource={{uri: 'https://picsum.photos/id/1/50/50'}}
                />
              </View>

              <Text style={styles.mdPopupTitle}>
                {selectedMap && selectedMap.name}
              </Text>
              <View style={styles.mdPopupAuthor}>
                <Text style={styles.mdPopupAuthorLabel}>Traveller: </Text>
                <Text style={styles.mdPopupAuthorName}>
                  {' '}
                  {selectedMap && selectedMap.username}
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
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authActions, dispatch),
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapList);
