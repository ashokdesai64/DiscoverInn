import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
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
import {NavigationEvents} from 'react-navigation';

const height = Dimensions.get('window').height;

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as authActions from './../../actions/authActions';
import * as mapActions from './../../actions/mapActions';

class MapList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTripList: false,
      shareModal: false,
      searchTerm: '',
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
      selectedCategory: '',
      selectedCreatedWithin: '',
      selectedTravelType: '',
      addReviewValue: 0,
    };
  }

  navigateToMap() {
    this.props.navigation.navigate('MapView');
  }

  _renderItem(item, index) {
    let avgReview = parseInt(item.avrage_review);

    return (
      <View style={[styles.mapSlideCard]}>
        <View style={styles.mapSlideCardHeader}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.shareButton}
            onPress={() => this.setState({shareModal: true})}>
            <Feather style={styles.shareButtonText} name="share-2" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.navigateToMap()}>
            <Image
              style={styles.mapSlideCardImg}
              source={{uri: item.cover_image}}
            />
            <View style={styles.mapSlideCardImg_overlay} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.mapButton}
            onPress={() => this.setState({mapDetailsModal: true})}>
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
              onPress={() => this.setState({showAddReviewModal: true})}>
              <Text style={styles.buttonText}>Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  sortBy(sortBy) {
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

    let apiData = {
      user_id: this.props.userData.id,
      sort_by: this.state.sortBy || 'rating',
      page: 1,
      search: this.state.searchTerm || '',
    };
    if ((params && params.category) || selectedCategory) {
      apiData['categorie'] = selectedCategory || (params && params.category);
    }
    if (selectedAge && !!selectedAge.length) {
      apiData['age_at_travel'] = selectedAge
    }
    if (selectedBudget && !!selectedBudget.length) {
      apiData['budget_limit'] = selectedBudget
    }
    if (selectedCreatedWithin && !!selectedCreatedWithin.length) {
      apiData['when_travel'] = selectedCreatedWithin
    }
    if (selectedTravelType && !!selectedTravelType.length) {
      apiData['travel_type'] = selectedTravelType
    }

    this.props.mapAction.fetchMapList(apiData);
  }

  setParams = filterParams => {
    this.setState({...filterParams}, () => {
      this.fetchMapList();
    });
  };

  render() {
    const {width} = Dimensions.get('window');
    const {
      selectedAge,
      selectedBudget,
      selectedCategory,
      selectedCreatedWithin,
      selectedTravelType,
      addReviewValue,
    } = this.state;
    return (
      <Fragment>
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
              />
            </View>
            <View style={styles.customPopupFooter}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => this.setState({showAddReviewModal: false})}>
                <Text style={styles.buttonText}>Submit</Text>
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
            this.setState({shareModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({shareModal: false});
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Share Your Map</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({shareModal: false})}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.formLabel}>Share With:</Text>
              <View style={styles.shareSocial}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonFacebook]}
                  onPress={() => this.setState({saveToListModal: false})}>
                  <Feather name={'facebook'} color={'white'} size={16} />
                  <Text style={[styles.buttonText]}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonTwitter]}
                  onPress={() => this.setState({saveToListModal: false})}>
                  <Feather name={'twitter'} color={'white'} size={16} />
                  <Text style={[styles.buttonText]}>Twitter</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.orDivider}>
              <Text style={styles.orDividerBorder}></Text>
              <Text style={styles.orDividerText}>OR</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Registered Users Name</Text>
              <TextInput
                style={styles.formControl}
                placeholder={'Enter Name'}
                placeholderTextColor={'#828894'}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Not Registered Users Email:</Text>
              <TextInput
                style={styles.formControl}
                placeholder={'Enter Email'}
                placeholderTextColor={'#828894'}
              />
            </View>
            <View style={styles.customPopupFooter}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => this.setState({shareModal: false})}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
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
                <Image
                  resizeMode={'stretch'}
                  style={styles.mdPopupImages}
                  source={require('./../../Images/place.jpg')}
                />
              </View>

              <Text style={styles.mdPopupTitle}>Planet - Bangkok</Text>
              <View style={styles.mdPopupAuthor}>
                <Text style={styles.mdPopupAuthorLabel}>Traveller: </Text>
                <Text style={styles.mdPopupAuthorName}> Admin Discover</Text>
              </View>
              <Text style={styles.mdPopupDis}>
                This imposing early-20th-century Italianate stone mansion, set
                discreetly back from the street, belonged to Don José Lázaro
                Galdiano (1862–1947), a successful businessman and passionate
                patron of the arts. His astonishing private collection, which he
                bequeathed to the city upon his death, includes 13,000 works of
                art and objets d’art, a quarter of which are on show at any
                time. This imposing early-20th-century Italianate stone mansion,
                set discreetly back from the street, belonged to Don José Lázaro
                Galdiano (1862–1947), a successful businessman and passionate
                patron of the arts. His astonishing private collection, essful
                businessman and passionate patron of the arts. His astonishing
                private collection, which he bequeathed to the city upon his
                death, includes 13,000 works of art and objets d’art, a quarter
                of which are on show at any time. This imposing
                early-20th-century Italianate stone mansion, set discreetly back
                from the street, belonged to Don José Lázaro Galdiano
                (1862–1947), a successful businessman and passionate patron of
                the arts. His astonishing private collection,which he bequeathed
                to the city upon his death, includes 13,000 works of art and
                objets d’art, a quarter of which are on show at any time.
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
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authActions, dispatch),
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapList);
