import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Item, Input, Button, Content, Accordion, CheckBox} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Switch from './../../../components/Switch';
import styles from './MyTravel.style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../../components/header/header';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import Spinner from './../../../components/Loader';
import _ from 'underscore';
import {getBoundingBox} from 'geolocation-utils';
import MapboxGL from '@react-native-mapbox-gl/maps';
//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZGlzY292ZXItaW5uIiwiYSI6ImNrOHBhbTB1ZDFpOHkzZ253azNiZWwwajcifQ.4Ajx3MymPUgns4rNashfLA'
);
import * as mapActions from '../../../actions/mapActions';
// MapboxGL.offlineManager.setTileCountLimit(10000);
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class MyTravel extends React.Component {
  constructor(props) {
    super(props);
    this.onDownloadProgress = this.onDownloadProgress.bind(this);
  }
  pageNo = 1;
  state = {
    pageNo: 1,
    search: '',
    currentMap: {},
    selected: 'User Picture',
    dataArray: [
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
      },
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
      },
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
      },
    ],
    fetchingMaps: false,
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  componentDidMount() {
    this.fetchFirstMaps();
  }

  _renderHeader(item, expanded) {
    return (
      <View
        style={[
          styles.accordionCardHeader,
          expanded
            ? styles.accordionCardHeaderOpen
            : styles.accordionCardHeaderClose,
        ]}>
        <Feather style={styles.mapIcon} name="map" />
        <Text style={styles.accordionCardtitle}> {item.name}</Text>
        {expanded ? (
          <Feather style={styles.accordionCardHeaderIcon} name="chevron-up" />
        ) : (
          <Feather style={styles.accordionCardHeaderIcon} name="chevron-down" />
        )}
      </View>
    );
  }

  changeMapStatus(mapID) {
    this.props.mapAction.changeMapStatus({
      user_id: this.props.userData.id,
      map_id: mapID,
    });
  }

  async downloadMap(mapData) {
    console.log('mapdata => ', mapData);
    MapboxGL.offlineManager.deletePack(`${mapData.id}${mapData.name}`);
    let packs = await MapboxGL.offlineManager.getPacks();
    let isDownloaded = packs.find(
      pack => pack.name == `${mapData.id}${mapData.name}`,
    );
    if (isDownloaded) {
      alert('This map is already downloaded');
    } else {
      this.props.mapAction
        .getMapPins({
          map_id: mapData.id,
          user_id: this.props.userData && this.props.userData.id,
        })
        .then(data => {
          console.log("data => ",data)
          let pinList = data.mapID.pin_list || [];

          let featureCollections = [],
            pinLatLongs = [],
            topLeft = null,
            bottomRight = null;

          if (pinList && pinList.length > 0) {
            this.setState({mapDownloadInProgress:true,downloadSpinnerMsg:`Preparing to download map.`})
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
            let boundsResult = getBoundingBox(pinLatLongs, 10000);
            topLeft = boundsResult.topLeft;
            bottomRight = boundsResult.bottomRight;
            let filteredCollections = featureCollections.filter(
              collection =>
                collection &&
                collection.features &&
                collection.features.length > 0,
            );

            const options = {
              name: `${mapData.id}${mapData.name}`,
              styleURL: MapboxGL.StyleURL.Dark,
              bounds: [
                [topLeft.lon, topLeft.lat],
                [bottomRight.lon, bottomRight.lat],
              ],
              minZoom: 5,
              maxZoom: 5,
            };
            console.log("options => ", options);
            MapboxGL.offlineManager.createPack(
              options,
              (offlineRegion, offlineRegionStatus) => {
                console.log("offlineRegionStatus => ",offlineRegionStatus)
                this.setState({
                  name: offlineRegion.name,
                  offlineRegion,
                  offlineRegionStatus,
                  downloadSpinnerMsg:
                    Math.floor(offlineRegionStatus.percentage) + '% downloaded',
                });
                if (offlineRegionStatus.percentage == 100) {
                  this.setState({downloadSpinnerMsg:"Storing map locally"})
                  this.props.mapAction
                    .storeOfflineMapData({
                      mapData,
                      pinData: filteredCollections,
                      bounds:{
                        ne: [topLeft.lon, topLeft.lat],
                        sw: [bottomRight.lon, bottomRight.lat],
                      }
                    })
                    .then(data => {
                      setTimeout(() => {
                        this.setState({mapDownloadInProgress: false});
                      }, 1500);
                    });
                }
              },
            );
          } else {
            alert("This map can't be downloaded as it doesn't have any pin")
          }
        })
        .catch(err => {
          this.setState({mapDownloadInProgress: false});
        });
    }
  }

  onDownloadProgress(offlineRegion, offlineRegionStatus) {
    console.log('offlineRegionStatus => ', offlineRegionStatus);
    this.setState({
      name: offlineRegion.name,
      offlineRegion,
      offlineRegionStatus,
    });
  }

  _renderContent = item => {
    return (
      <View style={styles.accordionCardBody}>
        <View style={styles.myTravelCard}>
          <View style={styles.myTravelItem}>
            <Text style={styles.myTravelItemTitle}>Public</Text>
            <Switch
              styles={styles.myTravelItemSwitch}
              changeMapStatus={() => {
                this.changeMapStatus(item.id);
              }}
              value={item.status == '1'}
            />
          </View>
        </View>
        <View style={styles.myTravelAction}>
          <View style={styles.myTravelActionLeft}>
            <TouchableOpacity
              style={[styles.buttonIcon, styles.buttonIconPrimary]}
              onPress={() => this.downloadMap(item)}>
              <Feather style={styles.buttonIconText} name="download-cloud" />
            </TouchableOpacity>
          </View>
          <View style={styles.myTravelActionRight}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSm, styles.buttonPrimary]}
              onPress={() => {
                this.props.navigation.navigate('MapView', {
                  mapID: item.id,
                  mapName: item.name,
                  fromMyTravel: true,
                });
              }}>
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonSm,
                styles.buttonSuccess,
                {marginLeft: 5},
              ]}
              onPress={() => {
                this.props.navigation.navigate('EditMyTravel', {
                  type: 'edit',
                  mapData: item,
                });
              }}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonSm,
                styles.buttonDanger,
                {marginLeft: 5},
              ]}
              onPress={() => {
                this.setState({showDeleteModal: true, selectedMap: item});
              }}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextProps => ', nextProps);
    if (nextProps.fetchingMaps != this.state.fetchingMaps) {
      this.setState({fetchingMaps: nextProps.fetchingMaps});
    }
  }

  fetchFirstMaps() {
    this.props.mapAction.fetchMyFirstMaps({
      user_id: this.props.userData.id,
      search: this.state.search,
      page: 1,
    });
  }

  fetchMaps(showLoader = false) {
    if (showLoader) {
      this.setState({fetchingMaps: true});
    }
    this.props.mapAction.fetchMyMaps({
      user_id: this.props.userData.id,
      search: this.state.search,
      page: this.pageNo,
    });
  }

  deleteMap() {
    this.setState({deleteInProgrss: true});
    this.props.mapAction
      .removeMap({
        map_id: this.state.selectedMap.id,
        user_id: this.props.userData.id,
      })
      .then(data => {
        this.setState({deleteInProgrss: false, showDeleteModal: false});
      })
      .catch(err => {
        this.setState({deleteInProgrss: false, showDeleteModal: false}, () => {
          alert(err);
        });
      });
  }

  render() {
    return (
      <Fragment>
        <Header
          showBack={true}
          title={'My Travel'}
          {...this.props}
          style={styles.bgTransfrent}
          rightEmpty={true}
          showRightButton={false}
        />
        <View style={styles.container}>
          <View style={styles.pageContent}>
            <ScrollView
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}
              showsVerticalScrollIndicator={false}
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent) && !this.state.fetchingMaps) {
                  console.log('scrolled to bottom');
                  this.pageNo += 1;
                  this.fetchMaps(true);
                }
              }}
              scrollEventThrottle={400}>
              <Spinner
                visible={this.state.fetchingMaps}
                textContent={'Fetching more maps...'}
                textStyle={{color: '#fff'}}
              />
              <Spinner
                visible={this.state.mapDownloadInProgress}
                textContent={this.state.downloadSpinnerMsg}
                textStyle={{color: '#fff'}}
              />
              <View searchBar style={styles.searchbarCard}>
                <Item style={styles.searchbarInputBox}>
                  <Feather style={styles.searchbarIcon} name="search" />
                  <Input
                    style={styles.searchbarInput}
                    placeholder="Search your maps"
                    value={this.state.search}
                    onChangeText={search => this.setState({search})}
                  />
                </Item>
                <Button
                  style={styles.searchbarCardButton}
                  onPress={() => {
                    this.pageNo = 1;
                    this.fetchMaps();
                  }}>
                  <Feather
                    style={styles.searchbarCardButtonIcon}
                    name="arrow-right"
                  />
                </Button>
              </View>

              {this.props.myMaps && this.props.myMaps.length > 0 ? (
                <Content style={styles.accordionCard}>
                  <Accordion
                    style={styles.accordionCardContent}
                    dataArray={this.props.myMaps}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                    contentStyle={{marginBottom: 10}}
                  />
                </Content>
              ) : (
                <Text
                  style={[
                    styles.buttonText,
                    {
                      marginTop: 20,
                      fontSize: 16,
                      color: 'grey',
                      alignSelf: 'center',
                    },
                  ]}>
                  No Maps Found.
                </Text>
              )}
            </ScrollView>
          </View>
          <View style={styles.footerButton}>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary, styles.buttonNewMap]}
              onPress={() => {
                this.props.navigation.navigate('EditMyTravel', {type: 'add'});
              }}>
              <Text style={styles.buttonText}>Add New Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Dialog
          rounded={false}
          visible={this.state.uploadCoverModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ uploadCoverModal: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 200, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ uploadCoverModal: false });
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>
                Upload Map Cover Image
              </Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({ uploadCoverModal: false })}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>

            <View style={[styles.coverImageCard]}>
              <Image
                style={[styles.coverImageCardBox]}
                source={{ uri: this.state.currentMap.cover_image }}
              />
              <View style={[styles.addPlusIcon]}>
                <AntDesign name={'pluscircleo'} size={36} color={'#fff'} />
                <Text style={[styles.addPlusText]}>Add Cover Image</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonPrimary,
                styles.buttonLg,
                { marginTop: 25 },
              ]}
              onPress={() => this.setState({ saveToListModal: false })}>
              <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
          </DialogContent>
        </Dialog> */}

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
                Are you sure you want to remove this map?
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
                  Decline
                </Text>
              </Button>
              <Button
                style={[styles.button, styles.buttonDanger, styles.buttonSave]}
                onPress={() => {
                  this.deleteMap();
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
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  console.log('state.maps => ', state.maps.offlineMaps);
  return {
    userData: state.user.userData,
    categories: state.maps.categories,
    myMaps: state.maps.ownMaps,
    fetchingMaps: state.maps.fetchingMaps,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTravel);
