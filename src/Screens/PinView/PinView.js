import React, {Fragment, useRef} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import {getStatusBarHeight} from './../../config/statusbar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RNFetchBlob from 'rn-fetch-blob';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import fontelloConfig from '../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import ImageBlurLoading from '../../components/ImageLoader';
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
import Spinner from '../../components/Loader';
import styles from './PinView.styles';
//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from '../../actions/mapActions';

class PinView extends React.Component {
  constructor(props) {
    super(props);
    const {params} = props.navigation.state;
    this.state = {
      saveToListModal: false,
      activeSlide: 0,
      selectedCategory: false,
      carouselItems: [
        {
          image: 'https://discover-inn.com/assets/images/map-image.jpeg ',
        },
      ],
      listToAdded: [],
      tripListName: '',
      pinLoader: false,
      loaderMsg: '',
      isOffline: params.isOffline,
      mapPins: [],
      firstItem: 0,
      keyboardHeight:0
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );

    if (this.state.isOffline) {
      const {params} = this.props.navigation.state;
      let allPins = params.allPins || [];
      let pinIndex = allPins.findIndex(p => p.id == params.pinID);
      this.setPinData(allPins, pinIndex);
    } else {
      this.fetchSinglePinData();
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({keyboardOpened: true,keyboardHeight: e.endCoordinates.height});
  }

  _keyboardDidHide() {
    this.setState({keyboardOpened: false});
  }

  setPinData(pins, index) {
    this.setState({
      mapPins: pins,
      currentPinData: pins[index],
      pinTitle: pins[index].name,
      pinDescription: pins[index].description,
      selectedCategory: pins[index].categories,
      loaderMsg: '',
      pinLoader: false,
      addedFrom: pins[index].added_from,
      isSaved: pins[index].save_triplist,
      firstItem: index,
    });
  }

  fetchSinglePinData() {
    const {params} = this.props.navigation.state;
    let pinID = params.pinID;
    let mapID = params.mapID;
    let fromFav = params.fromFav;

    if (pinID && mapID) {
      if (fromFav) {
        let pinData = params.pinList || [];
        let pinIndex = pinData.findIndex(p => p.id == pinID);
        this.setPinData(pinData, pinIndex);
      } else {
        this.setState({loaderMsg: 'Fetching Pin Data', pinLoader: true});
        this.props.mapAction
          .fetchMapPinList({
            user_id: this.props.userData && this.props.userData.id,
            map_id: mapID,
          })
          .then(data => {
            let pinData = (data && data.mapID && data.mapID.pin_list) || [];
            let pinIndex = pinData.findIndex(p => p.id == pinID);
            this.setPinData(pinData, pinIndex);
          })
          .catch(err => {
            this.setState({loaderMsg: '', pinLoader: false});
            console.log('err => ', err);
          });
      }
    }
  }

  _renderItemCate = ({item, index}) => {
    return (
      <ImageBlurLoading
        withIndicator
        style={styles.cateSlideCardIcon}
        source={{uri: item.thumb_image || item.image}}
        thumbnailSource={{
          uri: 'https://discover-inn.com/upload/cover/map-image.jpeg',
        }}
      />
    );
  };

  addToTrip(tripID) {
    let {params} = this.props.navigation.state;
    if (
      params &&
      params.mapID &&
      this.state.currentPinData &&
      this.state.currentPinData.id &&
      tripID
    ) {
      this.props.mapAction
        .addRemoveToTrip({
          map_id: params.mapID,
          pin_id: this.state.currentPinData.id,
          favorite_id: tripID,
          user_id: this.props.userData.id,
        })
        .then(data => {
          this.setState({saveToListModal: false,tripInputFocus:false}, () => {
            this.fetchSinglePinData();
            this.props.mapAction.fetchTripList();
          });
        })
        .catch(err => {
          console.log('err => ', err);
        });
    }
  }

  saveToNewTripList() {
    if (!this.state.tripListName.trim()) {
      return alert('Please enter trip list name');
    }
    this.setState({creatingTripList: true});
    let {params} = this.props.navigation.state;
    this.props.mapAction
      .createFavouriteList({
        user_id: this.props.userData.id,
        name: this.state.tripListName,
      })
      .then(data => {
        let tripListID = data.id;
        this.props.mapAction
          .addRemoveToTrip({
            map_id: params.mapID,
            pin_id: params.pinID,
            favorite_id: tripListID,
            user_id: this.props.userData.id,
          })
          .then(data => {
            this.props.mapAction.fetchTripList();
            this.setState(
              {saveToListModal: false, creatingTripList: false,tripInputFocus:false},
              () => {
                this.fetchSinglePinData();
              },
            );
          })
          .catch(err => {
            alert(err);
            this.setState({saveToListModal: false,tripInputFocus:false, creatingTripList: false});
          });
      })
      .catch(err => {
        alert(err);
        this.setState({saveToListModal: false, tripInputFocus:false,creatingTripList: false});
      });
  }

  removeFromTrip(tripListID) {
    let {params} = this.props.navigation.state;
    this.setState({loaderMsg: 'Removing pin...', pinLoader: true});
    this.props.mapAction
      .addRemoveToTrip({
        map_id: params.mapID,
        pin_id: params.pinID,
        favorite_id: tripListID,
        user_id: this.props.userData.id,
      })
      .then(data => {
        this.setState({loaderMsg: '', pinLoader: false}, () => {
          this.fetchSinglePinData();
        });
      })
      .catch(err => {
        alert(err);
      });
  }

  openSaveToListModal() {
    if (this.state.isOffline) {
      return alert('Please connect to internet');
    }
    if (this.props.userData && this.props.userData.id) {
      this.setState({saveToListModal: true});
    } else {
      alert('You need to login to access this feature');
    }
  }

  renderImages(pinData) {
    let sliderData =
      pinData.images || pinData.pin_images || this.state.carouselItems;
    let pathToDisplay = '';

    if (this.state.isOffline) {
      let imagePath = '';
      if (typeof pinData.images == 'string') {
        imagePath = pinData.images;
      } else if (Array.isArray(pinData.images) && pinData.images.length > 0) {
        imagePath = pinData.images[0].thumb_image || pinData.images[0].image;
      }

      let fileName = imagePath.split('/').pop();
      let endPath = RNFetchBlob.fs.dirs.CacheDir + '/discover/' + fileName;
      pathToDisplay = Platform.OS === 'android' ? 'file://' + endPath : endPath;
    }

    return (
      <>
        {this.state.isOffline ? (
          <ImageBlurLoading
            withIndicator
            style={styles.cateSlideCardIcon}
            source={{uri: pathToDisplay}}
            thumbnailSource={{
              uri: pathToDisplay,
            }}
          />
        ) : (
          <PinImages
            data={sliderData}
            renderItem={this._renderItemCate}
            onSnapToItem={index => this.setState({activeSlide: index})}
          />
        )}
      </>
    );
  }

  renderPagination(pinData) {
    let sliderData =
      pinData.images || pinData.pin_images || this.state.carouselItems;
    return (
      <Pagination
        dotsLength={sliderData.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{
          position: 'absolute',
          top: 280,
          left: -5,
          zIndex: 999999,
        }}
        dotStyle={{
          width: 15,
          height: 3,
          backgroundColor: '#2F80ED',
          margin: 0,
        }}
        inactiveDotOpacity={1}
        inactiveDotStyle={{
          width: 12,
          height: 3,
          backgroundColor: 'white',
          margin: 0,
        }}
        inactiveDotScale={1}
      />
    );
  }

  renderPinContent(pinData) {
    let {categories} = this.props;

    let selectedCategory =
      categories && categories.find(c => c.id == pinData.categories);
    let categoryName = (selectedCategory && selectedCategory.name) || '';
    return (
      <ScrollView
        style={styles.pinScrollView}
        contentContainerStyle={{
          justifyContent: 'center',
          // alignItems: 'center',
          // alignSelf: 'center',
          borderRadius: 100,
        }}
        nestedScrollEnabled={true}>
        <Text style={styles.pinViewTitle}>{pinData.name}</Text>
        <View style={styles.pinViewCate}>
          <IconMoon
            name={categoryName.toLowerCase()}
            style={styles.pinViewCateIcon}
          />
          <Text style={styles.pinViewCateText}> {categoryName}</Text>
        </View>
        {pinData.name && pinData.added_from && (
          <Text
            style={[
              styles.pinViewCateText,
              {marginBottom: 15, paddingLeft: 15},
            ]}>
            {' '}
            Added From: {pinData.added_from || ''}
          </Text>
        )}
        <Text style={styles.pinViewContent}>{pinData.description}</Text>
      </ScrollView>
    );
  }

  renderPin(pinData) {
    return (
      <>
        {this.renderImages(pinData)}
        {!this.state.isOffline && this.renderPagination(pinData)}
        {this.renderPinContent(pinData)}
      </>
    );
  }

  setIsSaved(index) {
    let allMapPins = [...this.state.mapPins];
    let currentPinData = allMapPins[index];
    this.setState({isSaved: currentPinData.save_triplist, currentPinData});
  }

  render() {
    let paddingTop = 0,
      height = 60;
    if (Platform.OS === 'ios') {
      paddingTop = getStatusBarHeight();
      height = 80;
    }
    return (
      <>
        <View style={[styles.pinHeader, {paddingTop, height}]}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather name={'arrow-left'} size={24} color={'white'} />
          </TouchableOpacity>

          {!this.state.isOffline &&
            (this.state.isSaved ? (
              <TouchableOpacity
                onPress={() => this.removeFromTrip(this.state.isSaved)}>
                <AntDesign name={'heart'} size={24} color={'white'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.openSaveToListModal()}>
                <AntDesign name={'hearto'} size={24} color={'white'} />
              </TouchableOpacity>
            ))}
        </View>
        <Spinner
          visible={this.state.pinLoader}
          textContent={this.state.loaderMsg}
          textStyle={{color: '#fff'}}
        />

        {this.state.mapPins.length > 0 && (
          <View style={{position: 'relative'}}>
            <Carousel
              data={this.state.mapPins}
              sliderWidth={DEVICE_WIDTH}
              itemWidth={DEVICE_WIDTH}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              firstItem={this.state.firstItem}
              renderItem={({item, index}) => this.renderPin(item)}
              onSnapToItem={index => this.setIsSaved(index)}
              useScrollView
              nestedScrollEnabled={true}
            />
          </View>
        )}

        <Dialog
          rounded={false}
          visible={this.state.saveToListModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({saveToListModal: false,tripInputFocus:false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({saveToListModal: false,tripInputFocus:false});
            return true;
          }}
          dialogStyle={[styles.customPopup,{bottom:this.state.tripInputFocus ? this.state.keyboardHeight:0}]}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Save to list</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({saveToListModal: false,tripInputFocus:false})}>
                <Feather style={styles.buttonCloseIcon} name={'x'} />
              </TouchableOpacity>
            </View>
            {!this.state.keyboardOpened &&
              this.props.tripList &&
              this.props.tripList.length > 0 && (
                <>
                  <ScrollView
                    style={styles.MVTripList}
                    contentContainerStyle={{maxHeight: 200, flexGrow: 0}}
                    showsVerticalScrollIndicator={true}>
                    {this.props.tripList.map(trip => {
                      return (
                        <TouchableOpacity
                          style={styles.MVTripListItem}
                          onPress={() => this.addToTrip(trip.id)}
                          key={trip.id}>
                          <Text style={styles.MVTripListItemTitle}>
                            {trip.name}
                          </Text>
                          <View>
                            {this.state.isSaved == trip.id ? (
                              <AntDesign
                                name={'heart'}
                                color={'#2F80ED'}
                                size={15}
                              />
                            ) : (
                              <AntDesign
                                name={'hearto'}
                                color={'#2F80ED'}
                                size={15}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                  <View style={styles.orDivider}>
                    <Text style={styles.orDividerBorder} />
                    <Text style={styles.orDividerText}>OR</Text>
                  </View>
                </>
              )}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Name</Text>
              <TextInput
                style={styles.formControl}
                placeholder={'Enter trip list name'}
                placeholderTextColor={'#828894'}
                onChangeText={tripListName => this.setState({tripListName})}
                onFocus={() => {
                  this.setState({tripInputFocus: true});
                }}
                onBlur={() => {
                  this.setState({tripInputFocus: false});
                }}
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
                onPress={() => this.setState({saveToListModal: false,tripInputFocus:false})}>
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
                onPress={() => this.saveToNewTripList()}>
                {this.state.creatingTripList ? (
                  <ActivityIndicator color={'white'} size={'small'} />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View  >

          </DialogContent>
        </Dialog>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
    categories: state.maps.categories,
    tripList: state.maps.tripList,
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
)(PinView);

const PinImages = props => {
  const carRef = useRef(null);
  console.log(props.data);
  return (
    <View style={{position: 'relative'}}>
      <Carousel
        sliderWidth={DEVICE_WIDTH}
        itemWidth={DEVICE_WIDTH}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        containerCustomStyle={{
          height: 450,
          width: DEVICE_WIDTH,
          top: 0,
          position: 'absolute',
        }}
        useScrollView={true}
        nestedScrollEnabled={true}
        firstItem={0}
        ref={carRef}
        {...props}
      />
      {props.data && props.data.length > 1 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: DEVICE_WIDTH,
            height: 350,
            alignItems: 'center',
            position: 'absolute',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={() => carRef.current.snapToPrev(false)}
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              height: 40,
              width: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign size={18} color={'white'} name={'left'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => carRef.current.snapToNext(false)}
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              height: 40,
              width: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign size={18} color={'white'} name={'right'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
