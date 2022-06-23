import React, {Fragment} from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import styles from './TripPinList.style';
import Header from './../../../components/header/header';
import Feather from 'react-native-vector-icons/Feather';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import {option, list} from '../../../Images';
import DraggableFlatList from 'react-native-draggable-flatlist';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from './../../../actions/mapActions';
import {Alert} from 'react-native';

class TripPinList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeletePinModal: false,
      tripName: '',
      pinList: [],
      deletingPin: false,
      isPinListFetching: true,
      switchView: true,
    };
  }

  changeTripName(tripName) {
    const {params} = this.props.navigation.state;
    this.props.mapAction
      .updateFavouriteList({
        user_id: this.props.userData.id,
        name: tripName,
        favorite_id: params.trip.id,
      })
      .then(data => {})
      .catch(err => {});
  }

  UNSAFE_componentWillMount() {
    this.fetchPinList();
  }

  fetchPinList() {
    const {params} = this.props.navigation.state;
    this.props.mapAction
      .singleFavouritePinList({
        user_id: this.props.userData.id,
        favorite_id: params.trip.id,
        page: 1,
      })
      .then(data => {
        data.favorite_pin.map(item => (item.editable = false));
        this.setState({
          pinList: data.favorite_pin || [],
          isPinListFetching: false,
        });
      })
      .catch(err => {
        this.setState({pinList: [], isPinListFetching: false});
      });
  }

  deletePin() {
    let {deletePin} = this.state;

    let {params} = this.props.navigation.state;
    if (deletePin.map_id && deletePin.id && params.trip.id) {
      this.setState({deletingPin: true});
      this.props.mapAction
        .addRemoveToTrip({
          map_id: deletePin.map_id,
          pin_id: deletePin.id,
          favorite_id: params.trip.id,
          user_id: this.props.userData.id,
        })
        .then(data => {
          this.fetchPinList();
          this.props.mapAction.fetchTripList();
          this.setState({showDeletePinModal: false, deletingPin: false});
        })
        .catch(err => {});
    } else {
      alert('Can not remove from trip list');
      this.setState({showDeletePinModal: false, deletingPin: false});
    }
  }

  render() {
    const {params} = this.props.navigation.state;

    if (this.state.isPinListFetching) {
      return (
        <Fragment style={styles.homePage}>
          <Header
            showBack={true}
            title={params.trip.name}
            {...this.props}
            style={{backgroundColor: '#F3F4F6'}}
            rightEmpty={true}
            showRightButton={false}
            headerEditable={true}
            onHeaderEditSubmit={tripName => this.changeTripName(tripName)}
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
                Fetching Pins
              </Text>
              <ActivityIndicator size={'small'} color={'#aaa'} />
            </View>
          </View>
        </Fragment>
      );
    }

    return (
      <Fragment style={styles.homePage}>
        <Header
          showBack={true}
          title={params.trip.name}
          {...this.props}
          style={{backgroundColor: '#F3F4F6'}}
          rightEmpty={true}
          showRightButton={false}
          headerEditable={true}
          onHeaderEditSubmit={tripName => this.changeTripName(tripName)}
        />
        <ScrollView
          style={styles.scrollView}
          scrollEnabled={this.state.switchView ? true : false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
            }}>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={
                  this.state.switchView
                    ? styles.selectedMenu
                    : styles.menuButton
                }
                onPress={() => this.setState({switchView: true})}>
                <Image source={option} style={styles.menuIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !this.state.switchView
                    ? styles.selectedMenu
                    : styles.menuButton
                }
                onPress={() => this.setState({switchView: false})}>
                <Image source={list} style={styles.menuIcon} />
              </TouchableOpacity>
            </View>
            {!this.state.switchView && (
              <Text style={styles.holdDrag}>Hold to drag pin</Text>
            )}
            {this.state.pinList && this.state.pinList.length <= 0 ? (
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
                    No Pins in this list
                  </Text>
                </View>
              </View>
            ) : this.state.switchView ? (
              this.state.pinList.map((pin, index) => {
                let imageSource = require('./../../../Images/map.png');
                if (pin.images && pin.images.length > 0) {
                  let currentPinImages = pin.images[0];
                  imageSource = {
                    uri:
                      currentPinImages.thumb_image ||
                      currentPinImages.image ||
                      'https://discover-inn.com/upload/cover/map-image.jpeg',
                  };
                }
                let nameSplit = pin.name.split(/^\d*\.?/).filter(x => x != '');
                return (
                  <View
                    style={{
                      elevation: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      marginBottom: 20,
                      borderRadius: 10,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      width: DEVICE_WIDTH - 30,
                    }}>
                    <View
                      style={[
                        styles.mymapsAction,
                        {paddingHorizontal: 10, width: DEVICE_WIDTH - 30},
                      ]}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          width: '90%',
                        }}>
                        {index + 1 + '. ' + nameSplit[0]}{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            deletePin: pin,
                            showDeletePinModal: true,
                          })
                        }
                        style={{
                          height: 25,
                          width: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'rgba(235, 87, 87, 0.1)',
                          borderRadius: 5,
                        }}>
                        <Feather name={'trash-2'} color={'#EB5757'} size={14} />
                      </TouchableOpacity>
                    </View>

                    <Image
                      source={imageSource}
                      style={{
                        height: 150,
                        width: DEVICE_WIDTH - 50,
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 14,
                        color: '#828282',
                        marginTop: 10,
                      }}
                      numberOfLines={3}
                      ellipsizeMode={'tail'}>
                      {pin.description}
                    </Text>
                  </View>
                );
              })
            ) : (
              <DraggableFlatList
                style={{height: DEVICE_HEIGHT / 1.5}}
                showsVerticalScrollIndicator={false}
                data={this.state.pinList}
                onDragEnd={({data}) => {
                  this.setState({pinList: data});
                  this.props.mapAction
                    .updateTripOrder(data)
                    .then(value => {})
                    .catch(err => {
                      Alert.alert('Error', err);
                    });
                }}
                keyExtractor={item => item.id}
                renderItem={({item, index, drag, isActive}) => {
                  const pin = item;
                  let imageSource = require('./../../../Images/map.png');
                  if (pin.images && pin.images.length > 0) {
                    let currentPinImages = pin.images[0];
                    imageSource = {
                      uri:
                        currentPinImages.thumb_image ||
                        currentPinImages.image ||
                        'https://discover-inn.com/upload/cover/map-image.jpeg',
                    };
                  }
                  let nameSplit = pin.name
                    .split(/^\d*\.?/)
                    .filter(x => x != '');
                  let name = nameSplit[0];

                  const _changeEditable = index => {
                    let obj = this.state.pinList;
                    obj[index].editable = !obj[index].editable;
                    this.setState({pinList: obj});
                  };

                  const _onChangeText = text => {
                    let obj = this.state.pinList;
                    obj[index].name = text;
                    this.setState({pinList: obj});
                  };

                  return (
                    <TouchableOpacity
                      onLongPress={drag}
                      style={[
                        styles.boxContainer,
                        {
                          marginVertical: 1,
                          padding: pin.editable ? 0 : 12,
                          paddingHorizontal: 12,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: DEVICE_WIDTH - 30,
                        },
                      ]}>
                      <Text>{index + 1}.</Text>
                      <View style={styles.titleContainer}>
                        {pin.editable ? (
                          <TextInput
                            autoCorrect={false}
                            value={name}
                            onChangeText={text => _onChangeText(text)}
                            onBlur={() => _changeEditable(index)}
                          />
                        ) : (
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              fontFamily: 'Montserrat-Regular',
                              width: '90%',
                            }}>
                            {name}
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        style={{alignSelf: 'center'}}
                        onPress={() => _changeEditable(index)}>
                        {pin.editable ? (
                          <Feather
                            name="check"
                            style={{color: '#2F80ED', fontSize: 18}}
                          />
                        ) : (
                          <Feather
                            name={'edit'}
                            color={'#2F80ED'}
                            style={{fontSize: 18}}
                          />
                        )}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>

          <Dialog
            rounded={false}
            visible={this.state.showDeletePinModal}
            hasOverlay={true}
            animationDuration={1}
            onTouchOutside={() => {
              this.setState({showDeletePinModal: false});
            }}
            dialogAnimation={
              new FadeAnimation({
                initialValue: 0, // optional
                animationDuration: 150, // optional
                useNativeDriver: true, // optional
              })
            }
            onHardwareBackPress={() => {
              this.setState({showDeletePinModal: false});
              return true;
            }}
            dialogStyle={styles.customPopup}>
            <DialogContent style={styles.customPopupContent}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>
                  Trip Pin Delete
                </Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => this.setState({showDeletePinModal: false})}>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text
                  style={[
                    styles.formLabel,
                    {
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#333',
                      textAlign: 'center',
                    },
                  ]}>
                  Are you sure you want to remove this pin ?
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    marginTop: 10,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: DEVICE_WIDTH / 2 - 30,
                    alignSelf: 'center',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#BDBDBD',
                    borderRadius: 5,
                  }}
                  onPress={() => this.setState({showDeletePinModal: false})}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#333',
                    }}>
                    Decline
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: DEVICE_WIDTH / 2 - 30,
                    alignSelf: 'center',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#EB5757',
                    backgroundColor: '#EB5757',
                  }}
                  onPress={() => this.deletePin()}>
                  {this.state.deletingPin ? (
                    <ActivityIndicator size={'small'} color={'white'} />
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 12,
                        color: '#fff',
                      }}>
                      {' '}
                      Yes Sure{' '}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>
        </ScrollView>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
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
)(TripPinList);
