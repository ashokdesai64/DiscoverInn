import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Item, Input, Button, Picker} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './MapPins.style';
import Header from '../../components/header/header';
import _ from 'underscore';
import {NavigationEvents} from 'react-navigation';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from './../../actions/mapActions';

class MapPins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinList: [],
      filteredPinList: [],
      fetchingPins: true,
      searchTerm: '',
      showDeleteModal: false,
      selectedPinID: false,
      mapData: {},
    };
  }

  fetchMapPins() {
    const {params} = this.props.navigation.state;
    this.props.mapAction
      .getMapPinsList({
        user_id: this.props.userData && this.props.userData.id,
        map_id: params.mapID,
      })
      .then(data => {
        let mapData = {...data.data};
        delete mapData.pin_list;
        let tripList = mapData.trip_list || '';
        tripList = tripList == '0' ? '' : tripList;
        let allPins = data.data.pin_list || [],
          searchTerm = this.state.searchTerm,
          filteredPinList = data.data.pin_list || [];

        if (allPins && allPins.length > 0 && searchTerm.trim() != '') {
          filteredPinList = allPins.filter(
            pin =>
              pin.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0,
          );
        }

        if (allPins && allPins.length > 0) {
          filteredPinList = allPins.filter(
            p =>
              !p.save_triplist || (p.save_triplist && p.save_triplist == '0'),
          );
        }

        let isPinAdded = false,
          pinCount = 0;
        if (tripList) {
          const currentTrip = this.props.tripList.find(
            trip => trip.id == tripList,
          );
          if (currentTrip) {
            isPinAdded = true;
            pinCount = currentTrip.pins;
          }
        }
        this.setState({
          pinList: data.data.pin_list,
          filteredPinList,
          mapData,
          selectedTripID: tripList,
          fetchingPins: false,
          isPinAdded,
          total_pins: pinCount,
        });
      })
      .catch(err => {
        this.setState({pinList: [], fetchingPins: false});
      });

    this.props.mapAction.fetchTripList();
  }

  deleteMapPin(pinID) {
    if (pinID) {
      const {params} = this.props.navigation.state;
      this.props.mapAction
        .deleteMapPin({
          user_id: this.props.userData.id,
          map_id: params.mapID,
          pin_id: pinID,
        })
        .then(data => {
          this.fetchMapPins();
        })
        .catch(err => {
          alert("can't remove this pin, please try again later.");
          // this.setState({ pinList: [] });
        });
    }
  }

  tripListSelected = tripID => {
    const {params} = this.props.navigation.state;
    this.setState({selectedTripID: tripID});

    this.props.mapAction
      .addPinFromTripList({
        user_id: this.props.userData.id,
        map_id: params.mapID,
        favorite_id: tripID || '0',
      })
      .then(data => {
        let selected = this.props.tripList.find(t => t.id == tripID);
        this.setState(
          {fetchingPins: true, isPinAdded: true, total_pins: selected.pins},
          () => {
            this.fetchMapPins();
          },
        );
      })
      .catch(err => {});
  };

  searchPins = _.debounce(() => {
    let allPins = this.state.pinList,
      searchTerm = this.state.searchTerm,
      filteredPinList = [];
    if (searchTerm.trim() != '') {
      filteredPinList = allPins.filter(
        pin => pin.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0,
      );
    } else {
      filteredPinList = [...allPins];
    }
    this.setState({filteredPinList});
  }, 250);

  render() {
    const {params} = this.props.navigation.state;

    return (
      <>
        <NavigationEvents onWillFocus={payload => this.fetchMapPins()} />
        <Header
          style={{backgroundColor: '#F3F4F6'}}
          showBack={true}
          title={params.mapName || ''}
          {...this.props}
        />
        <View style={styles.pageContent}>
          {this.props.tripList && this.props.tripList.length > 0 ? (
            <>
              <Text style={styles.headingText}>Add from My Trip List</Text>
              <View
                style={[
                  styles.picker,
                  {marginBottom: this.state.isPinAdded ? 0 : 20},
                ]}>
                <Picker
                  style={styles.formDropdown}
                  placeholderStyle={{color: '#2874F0'}}
                  selectedValue={this.state.selectedTripID}
                  textStyle={styles.dropdownText}
                  onValueChange={this.tripListSelected}
                  mode="dropdown"
                  iosHeader="Select a Trip List"
                  iosIcon={
                    <Feather
                      name="chevron-down"
                      style={styles.formDropdownIcon}
                    />
                  }>
                  <Picker.Item label="Select a Trip List" value={''} />
                  {this.props.tripList.map((value, index) => {
                    return (
                      <Picker.Item
                        key={`trip${index}`}
                        label={value.name}
                        value={value.id}
                      />
                    );
                  })}
                </Picker>
              </View>
              {this.state.isPinAdded && (
                <Text style={styles.pinAddedText}>
                  {this.state.total_pins} Pins added
                </Text>
              )}
            </>
          ) : null}

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            {this.state.fetchingPins ? (
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
            ) : (
              <>
                <View searchBar style={styles.searchbarCard}>
                  <Item style={styles.searchbarInputBox}>
                    <Feather style={styles.searchbarIcon} name="search" />
                    <Input
                      style={styles.searchbarInput}
                      placeholder="Search MyTravel Pins"
                      value={this.state.searchTerm}
                      onChangeText={searchTerm =>
                        this.setState({searchTerm}, () => {
                          this.searchPins();
                        })
                      }
                    />
                  </Item>
                  <TouchableOpacity style={styles.searchbarCardButton}>
                    <Feather
                      style={styles.searchbarCardButtonIcon}
                      name="arrow-right"
                    />
                  </TouchableOpacity>
                </View>
                {!this.state.filteredPinList ||
                this.state.filteredPinList.length <= 0 ? (
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
                        No Pins Found
                      </Text>
                    </View>
                  </View>
                ) : (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{marginVertical: 10}}>
                    <View style={styles.categorypinList}>
                      {this.state.filteredPinList.map(pin => (
                        <Item style={styles.categorypinItem}>
                          <Feather name="map-pin" style={styles.pinIcon} />
                          <Text style={styles.categorypinTitle}>
                            {pin.name}
                          </Text>
                          <View style={styles.categorypinAction}>
                            {!pin.latitude || !pin.longitude ? (
                              <Feather
                                size={14}
                                name="alert-triangle"
                                color={'#F2994A'}
                                style={{
                                  marginRight: 5,
                                  alignSelf: 'center',
                                }}
                              />
                            ) : null}
                            <TouchableOpacity
                              style={[
                                styles.iconButton,
                                styles.iconButtonPrimary,
                                {marginRight: 5},
                              ]}
                              onPress={() =>
                                this.props.navigation.navigate('PinView', {
                                  mapID: params.mapID,
                                  mapName: params.mapName,
                                  pinID: pin.id,
                                })
                              }>
                              <Feather
                                style={[
                                  styles.iconButtonIcon,
                                  styles.iconButtonIconPrimary,
                                ]}
                                name="eye"
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.iconButton,
                                styles.iconButtonWarning,
                                {marginRight: 5},
                              ]}
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'EditMapDetails',
                                  {
                                    type: 'add',
                                    mapData: this.state.mapData,
                                    mapID: params.mapID,
                                    mapName: params.mapName,
                                    pinID: pin.id,
                                  },
                                )
                              }>
                              <Feather
                                style={[
                                  styles.iconButtonIcon,
                                  styles.iconButtonIconWarning,
                                ]}
                                name="edit-2"
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.iconButton,
                                styles.iconButtonDanger,
                              ]}
                              onPress={
                                () =>
                                  this.setState({
                                    showDeleteModal: true,
                                    selectedPinID: pin.id,
                                  }) //this.deleteMapPin(pin.id)
                              }>
                              <Feather
                                style={[
                                  styles.iconButtonIcon,
                                  styles.iconButtonIconDanger,
                                ]}
                                name="trash-2"
                              />
                            </TouchableOpacity>
                          </View>
                        </Item>
                      ))}
                    </View>
                  </ScrollView>
                )}
              </>
            )}
            <Dialog
              rounded={false}
              visible={this.state.showDeleteModal}
              hasOverlay={true}
              animationDuration={1}
              onTouchOutside={() => {
                this.setState({showDeleteModal: false});
              }}
              dialogAnimation={
                new FadeAnimation({
                  initialValue: 0, // optional
                  animationDuration: 150, // optional
                  useNativeDriver: true, // optional
                })
              }
              onHardwareBackPress={() => {
                this.setState({showDeleteModal: false});
                return true;
              }}
              dialogStyle={styles.customPopup}>
              <DialogContent style={styles.customPopupContent}>
                <View style={styles.customPopupHeader}>
                  <Text style={styles.customPopupHeaderTitle}>Delete Map</Text>
                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={() => this.setState({showDeleteModal: false})}>
                    <Feather name={'x'} style={styles.buttonCloseIcon} />
                  </TouchableOpacity>
                </View>

                <View style={styles.deleteModalBody}>
                  <Text style={styles.deleteModalBodyText}>
                    {' '}
                    Are you sure you want to delete this pin?{' '}
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
                      this.setState({showDeleteModal: false});
                    }}>
                    <Text style={[styles.buttonText, styles.buttonTextGray]}>
                      {' '}
                      Not Now{' '}
                    </Text>
                  </Button>
                  <Button
                    style={[
                      styles.button,
                      styles.buttonDanger,
                      styles.buttonSave,
                    ]}
                    onPress={() => {
                      this.setState({showDeleteModal: false}, () => {
                        this.deleteMapPin(this.state.selectedPinID);
                      });
                    }}>
                    {this.state.deleteInProgrss ? (
                      <ActivityIndicator size={'small'} color={'white'} />
                    ) : (
                      <Text style={styles.buttonText}>Yes Sure</Text>
                    )}
                  </Button>
                </View>
              </DialogContent>
            </Dialog>
          </ScrollView>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, styles.buttonEditPin]}
            onPress={() =>
              this.props.navigation.navigate('AddMapDetail', {
                type: 'add',
                mapID: params.mapID,
                mapName: params.mapName,
              })
            }>
            <Text style={styles.buttonText}>Add Pins</Text>
          </TouchableOpacity>
        </View>
      </>
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
)(MapPins);
