import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Item, Input, Button, Content, Accordion, CheckBox} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import RNFetchBlob from 'rn-fetch-blob';
import {checkIfHasPermission} from './../../../config/permission';

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
  'sk.eyJ1IjoicmF2aXNvaml0cmF3b3JrIiwiYSI6ImNrYTByeHVxZjBqbGszZXBtZjF3NmJleWgifQ.idSimILJ3_sk1gSWs2sMsQ',
);
import * as mapActions from '../../../actions/mapActions';
MapboxGL.offlineManager.setTileCountLimit(15000);
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
    this.mounted = null;
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
    this.mounted = true;
    this.fetchFirstMaps();
  }

  componentWillUnmount() {
    this.mounted = false;
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

  async downloadAssets(pinImages = []) {
    let downloadPromises = [];
    pinImages.map(pinURL => {
      if (
        pinURL &&
        (pinURL.startsWith('http://') || pinURL.startsWith('https://'))
      ) {
        let fileName = pinURL.split('/').pop();
        downloadPromises.push(
          RNFetchBlob.config({
            fileCache: true,
            path: RNFetchBlob.fs.dirs.DocumentDir + fileName,
          }).fetch('GET', pinURL),
        );
      }
    });
    return await Promise.all(downloadPromises);
  }

  async downloadMap(mapData) {
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
                downloadSpinnerMsg: `Downloading assets...`,
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
                mapData.thumb_cover_image || mapData.cover_image || '',
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
                      pin.images[0].thumb_image || pin.images[0].image,
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

              let boundsResult = getBoundingBox(pinLatLongs, 10000);
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
                      })
              
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
                canGoBack:true
              })

              MapboxGL.offlineManager.createPack(
                options,
                async (offlineRegion, offlineRegionStatus) => {
                  console.log('offlineRegionStatus => ', offlineRegionStatus);
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
                  let areAllResourcesDownloaded = offlineRegionStatus.requiredResourceCount == offlineRegionStatus.completedResourceCount;
                  if (offlineRegionStatus.state == 3 || areAllResourcesDownloaded) {
                    alert("Map downloaded Successfully.")
                    if (this.mounted) {
                      this.setState({ mapDownloadInProgress: false, canGoBack: false })
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
                // this.props.navigation.navigate('Test');
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
    if(!this.props.myMaps || this.props.myMaps.length == 0){
      this.setState({fetchingMaps:true})
    }
    this.props.mapAction.fetchMyFirstMaps({
      user_id: this.props.userData.id,
      search: this.state.search,
      page: 1,
    }).then(d => this.setState({fetchingMaps:false}));
  }

  fetchMaps(showLoader = false) {
    if (showLoader) {
      this.setState({fetchingMaps: true});
    }
    console.log({
      user_id: this.props.userData.id,
      search: this.state.search,
      page: this.pageNo,
    });
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
                textStyle={{ color: '#fff' }}
                canGoBack={this.state.canGoBack}
                backButtonText={'Download in background'}
                onGoBack={()=> this.setState({mapDownloadInProgress:false,canGoBack:false})}
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
                  {this.state.fetchingMaps ? 'Fetching maps...' : 'No Maps Found.'}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTravel);
