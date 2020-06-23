import React, {Fragment} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Keyboard,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import ImageBlurLoading from './../../components/ImageLoader';
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
import Spinner from './../../components/Loader';
import GestureRecognizer from './../../components/GestureRecognizer';
//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from './../../actions/mapActions';

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
      offlinePath: params.offlinePath,
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
      let pinData = params.pinData || {};
      this.setState({
        pinTitle: pinData.name,
        pinDescription: pinData.description,
        selectedCategory: pinData.categories,
        addedFrom: pinData.added_from,
        isSaved: pinData.save_triplist,
      });
    } else {
      this.fetchSinglePinData();
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({keyboardOpened: true});
  }

  _keyboardDidHide() {
    this.setState({keyboardOpened: false});
  }

  fetchSinglePinData() {
    const { params } = this.props.navigation.state;
    console.log("params => ",params)
    let pinID = params.pinID;
    let mapID = params.mapID;
    let fromFav = params.fromFav;
    const setPinData = (pins, index) => {
      console.log("fromFav => ",pins, index)

      this.setState({
        mapPins: pins,
        currentPinData: pins[index],
        pinTitle: pins[index].name,
        pinDescription: pins[index].description,
        selectedCategory: pins[index].categories,
        webImages: pins[index].images || pins[index].pin_images || this.state.carouselItems,
        loaderMsg: '',
        pinLoader: false,
        addedFrom: pins[index].added_from,
        isSaved: pins[index].save_triplist,
        currentPinIndex: index,
      });
    };

    if (pinID && mapID) {
      if (fromFav) {
        let pinData = params.pinList || [];
        let pinIndex = pinData.findIndex(p => p.id == pinID);
        setPinData(pinData, pinIndex);
      } else {
        this.setState({loaderMsg: 'Fetching Pin Data', pinLoader: true});
        this.props.mapAction
          .fetchMapPinList({
            user_id: this.props.userData && this.props.userData.id,
            map_id: mapID
          })
          .then(data => {
            let pinData = (data && data.mapID && data.mapID.pin_list) || [];
            let pinIndex = pinData.findIndex(p => p.id == pinID);
            setPinData(pinData, pinIndex);
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
          this.setState({saveToListModal: false}, () => {
            this.fetchSinglePinData();
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
        console.log('data => ', data);

        let tripListID = data.id;
        this.props.mapAction
          .addRemoveToTrip({
            map_id: params.mapID,
            pin_id: params.pinID,
            favorite_id: tripListID,
            user_id: this.props.userData.id,
          })
          .then(data => {
            this.setState(
              {saveToListModal: false, creatingTripList: false},
              () => {
                this.fetchSinglePinData();
              },
            );
          })
          .catch(err => {
            alert(err);
            this.setState({saveToListModal: false, creatingTripList: false});
          });
      })
      .catch(err => {
        alert(err);
        this.setState({saveToListModal: false, creatingTripList: false});
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

  onPinSwipe(direction, state) {
    let allPins = [...this.state.mapPins],
      indexToSwipe = -1,
      currentPinIndex = this.state.currentPinIndex;

    if (direction == 'NEXT') {
      if (currentPinIndex == allPins.length - 1) {
        alert('There is no more pin to swipe');
      } else {
        indexToSwipe = currentPinIndex + 1;
      }
    } else if (direction == 'PREV') {
      if (currentPinIndex == 0) {
        alert('There is no previous pin');
      } else {
        indexToSwipe = currentPinIndex - 1;
      }
    }
    if (indexToSwipe != -1 && indexToSwipe != currentPinIndex) {
      let pinData = allPins[indexToSwipe];
      this.setState({
        pinTitle: pinData.name,
        currentPinData: {...pinData},
        pinDescription: pinData.description,
        selectedCategory: pinData.categories,
        webImages: pinData.images || pinData.pin_images || this.state.carouselItems,
        addedFrom: pinData.added_from,
        isSaved: pinData.save_triplist,
        currentPinIndex: indexToSwipe,
      });
    }
  }

  render() {
    let {categories} = this.props;
    let selectedCategory =
      categories && categories.find(c => c.id == this.state.selectedCategory);
    let categoryName = (selectedCategory && selectedCategory.name) || '';

    let isWebImages = this.state.webImages && this.state.webImages.length > 0;
    let sliderData = isWebImages
      ? this.state.webImages
      : this.state.carouselItems;
    return (
      <SafeAreaView>
        <View style={[styles.pinHeader]}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather name={'arrow-left'} size={24} color={'white'} />
          </TouchableOpacity>

          {this.state.isSaved ? (
            <TouchableOpacity
              onPress={() => this.removeFromTrip(this.state.isSaved)}>
              <AntDesign name={'heart'} size={24} color={'white'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.openSaveToListModal()}>
              <AntDesign name={'hearto'} size={24} color={'white'} />
            </TouchableOpacity>
          )}
        </View>
        <Spinner
          visible={this.state.pinLoader}
          textContent={this.state.loaderMsg}
          textStyle={{color: '#fff'}}
        />

        {this.state.isOffline ? (
          <ImageBlurLoading
            withIndicator
            style={styles.cateSlideCardIcon}
            source={{uri: this.state.offlinePath}}
            thumbnailSource={{
              uri: this.state.offlinePath,
            }}
          />
        ) : (
          <Carousel
            data={sliderData}
            sliderWidth={DEVICE_WIDTH}
            itemWidth={DEVICE_WIDTH}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            containerCustomStyle={{
              height: 400,
              width: DEVICE_WIDTH,
              top: 0,
              position: 'absolute',
            }}
            firstItem={0}
            renderItem={this._renderItemCate}
            onSnapToItem={index => this.setState({activeSlide: index})}
          />
        )}

        <Pagination
          dotsLength={this.state.webImages && this.state.webImages.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{
            position: 'absolute',
            top: 250,
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

        <ScrollView style={styles.pinScrollView}>
          <GestureRecognizer
            // onSwipe={(direction, state) => this.onPinSwipe(direction, state)}
            onSwipeLeft={state => this.onPinSwipe('NEXT', state)}
            onSwipeRight={state => this.onPinSwipe('PREV', state)}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{flex: 1}}>
            <Text style={styles.pinViewTitle}>{this.state.pinTitle}</Text>
            <View style={styles.pinViewCate}>
              <IconMoon
                name={categoryName.toLowerCase()}
                style={styles.pinViewCateIcon}
              />
              <Text style={styles.pinViewCateText}> {categoryName}</Text>
            </View>
            {this.state.pinTitle && this.state.addedFrom && (
              <Text style={[styles.pinViewCateText, {marginBottom: 15}]}>
                {' '}
                Added From: {this.state.addedFrom || ''}
              </Text>
            )}
            <Text style={styles.pinViewContent}>
              {this.state.pinDescription}
            </Text>
          </GestureRecognizer>
        </ScrollView>

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
              animationDuration: 150, // optional
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
              <Text style={styles.customPopupHeaderTitle}>Save to list</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({saveToListModal: false})}>
                <Feather style={styles.buttonCloseIcon} name={'x'} />
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Name</Text>
              <TextInput
                style={styles.formControl}
                placeholder={'Enter trip list name'}
                placeholderTextColor={'#828894'}
                onChangeText={tripListName => this.setState({tripListName})}
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
                onPress={() => this.saveToNewTripList()}>
                {this.state.creatingTripList ? (
                  <ActivityIndicator color={'white'} size={'small'} />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>

            {!this.state.keyboardOpened &&
              this.props.tripList &&
              this.props.tripList.length > 0 && (
                <>
                  <View style={styles.orDivider}>
                    <Text style={styles.orDividerBorder} />
                    <Text style={styles.orDividerText}>OR</Text>
                  </View>
                  <ScrollView
                    style={styles.MVTripList}
                    contentContainerStyle={{maxHeight: 200, flexGrow: 0}}
                    showsVerticalScrollIndicator={true}>
                    {this.props.tripList.map(trip => {
                      return (
                        <TouchableOpacity
                          style={styles.MVTripListItem}
                          onPress={() => this.addToTrip(trip.id)}>
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
                </>
              )}

            {!this.state.keyboardOpened && (
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  marginTop: 15,
                  backgroundColor: '#2F80ED',
                  width: 140,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderRadius: 5,
                }}
                onPress={() => this.setState({saveToListModal: false})}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 12,
                    color: 'white',
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            )}
          </DialogContent>
        </Dialog>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  map: {
    flex: 1,
  },
  pinScrollView: {
    padding: 20,
    height: 'auto',
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    position: 'absolute',
    top: 400,
    marginTop: -100,
    minHeight: 200,
  },
  pinViewTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 24,
    marginBottom: 5,
  },
  pinViewCate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  pinViewCateIcon: {
    color: '#2F80ED',
    fontSize: 13,
  },
  pinViewCateText: {
    fontSize: 12,
    color: '#828282',
    fontFamily: 'Montserrat-Regular',
  },
  pinViewContent: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#4F4F4F',
  },
  pinHeader: {
    top: 20,
    zIndex: 9999,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    padding: 15,
  },
  cateSlideCard: {
    height: 375,
    marginBottom: 10,
    shadowOffset: {width: 0, height: 5},
    shadowColor: 'rgba(6, 18, 42, 0.08);',
    shadowOpacity: 1.0,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  cateSlideCardIcon: {
    height: 375,
    width: DEVICE_WIDTH,
    alignSelf: 'center',
  },
  cateSlideCardTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    lineHeight: 12,
    marginTop: 10,
    color: '#333333',
    textAlign: 'center',
  },
  orDivider: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  orDividerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#333333',
    paddingHorizontal: 10,
    zIndex: 7,
    backgroundColor: '#ffffff',
  },
  orDividerBorder: {
    position: 'absolute',
    width: '100%',
    height: 1,
    zIndex: 6,
    backgroundColor: '#C4C4C4',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
  },
  buttonReview: {
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  customPopup: {
    width: DEVICE_WIDTH,
    padding: 0,
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 10,
    maxHeight: DEVICE_HEIGHT - 100,
    overflow: 'scroll',
  },
  customPopupContent: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  customPopupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  customPopupHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#333333',
  },
  buttonClose: {
    width: 24,
    height: 24,
  },
  buttonCloseIcon: {
    color: '#BDBDBD',
    fontSize: 24,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
    paddingLeft: 7,
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    height: 48,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Montserrat-Medium',
    color: '#4F4F4F',
    fontSize: 14,
  },
  buttonCTGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonCT: {
    flex: 1,
  },
  buttonCTCancel: {
    marginRight: 10,
  },
  buttonCTSubmit: {
    marginLeft: 10,
  },
  buttonOutline: {
    borderColor: '#BDBDBD',
    borderWidth: 1,
    color: '#fff',
  },
  buttonTextDark: {
    color: '#333333',
  },
  mapViewCard: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: DEVICE_WIDTH - 40,
    flexDirection: 'row',
    elevation: 3,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'rgba(242, 242, 242, 0.5)',
  },
  mapViewCardImg: {
    width: 120,
    height: 95,
  },
  mapViewCardContent: {
    width: DEVICE_WIDTH - 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  mapViewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DEVICE_WIDTH - 20,
  },
  mapViewTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '500',
  },
  mapViewCate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  mapViewCateIcon: {
    color: '#2F80ED',
    fontSize: 13,
  },
  mapViewCateText: {
    fontSize: 12,
    color: '#828282',
    fontFamily: 'Montserrat-Regular',
  },
  mapViewContentText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#828282',
  },
  MVTripList: {
    marginBottom: 20,
    maxHeight: 100,
  },
  MVTripListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  MVTripListItemTitle: {
    color: '#BDBDBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
});

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
