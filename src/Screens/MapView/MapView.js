import React, { Fragment } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import styles from './MapView.style';
import geoViewport from '@mapbox/geo-viewport';
import Carousel from 'react-native-snap-carousel';
import sights1 from './../../Images/sights1.png';
import activities1 from './../../Images/activities1.png';
import restaurants1 from './../../Images/restaurants1.png';
import nightlife1 from './../../Images/nightlife1.png';
import transportations1 from './../../Images/transportations1.png';
import shopping1 from './../../Images/shopping1.png';
import other1 from './../../Images/other1.png';
import Header from './../../components/header/header';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Spinner from './../../components/Loader';
import _ from 'underscore';
import {
  getBoundingBox
} from 'geolocation-utils'

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWJyaWxsbyIsImEiOiJjanNlbHVjb28wanFwNDNzNzkyZzFnczNpIn0.39svco2wAZvwcrFD6qOlMw',
);

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../actions/mapActions';
const CENTER_COORD = [-73.970895, 40.723279];
const MAPBOX_VECTOR_TILE_SIZE = 512;

const customIcons = ['😀', '🤣', '😋', '😢', '😬'];
const DEVICE_WIDTH = Dimensions.get('window').width;
class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTripList: false,
      currentLat: 21.2148224,
      currentLong: 72.8629248,
      isSelected: '1',
      // featureCollection: MapboxGL.geoUtils.makeFeatureCollection(),
      showDestination: true,
      pinList: [],
      mapPinsInProgress: false,
      followUserLocation: false,
      featureCollection: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              coordinates: [-73.970895, 40.723279],
              type: 'Point',
            },
            id: 1,
            properties: {
              customIcon: customIcons[0],
            },
          },
        ],
      },
      carouselItems: [
        {
          title: 'Lonely Planet - Bangkok',
        },
        {
          title: 'Lonely Planet - Franch',
        },
        {
          title: 'Lonely Planet - Maxico',
        },
        {
          title: 'Lonely Planet - India',
        },
      ],
      filteredCollections: []
    };
    this.categoryImages = {
      '1': sights1,
      '2': activities1,
      '3': restaurants1,
      '4': nightlife1,
      '5': transportations1,
      '6': shopping1,
      '7': other1,
    };

    this.onSourceLayerPress = this.onSourceLayerPress.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onPress(e) {
    const feature = {
      type: 'Feature',
      geometry: e.geometry,
      id: Date.now(),
      properties: {
        customIcon: customIcons[this.state.featureCollection.features.length],
      },
    };

    this.setState(({ featureCollection }) => ({
      featureCollection: {
        type: 'FeatureCollection',
        features: [...featureCollection.features, feature],
      },
    }));
  }

  //pin destination on the map
  pinDestination = () => {
    if (!this.state.showDestination) {
      return;
    }
    return (
      <MapboxGL.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={[this.state.currentLong, this.state.currentLat]}>
        <Image
          source={require('./../../Images/transportations1.png')}
          style={{ height: 16, width: 16 }}
        />
        {/* <Icon style={styles.search} name="location-on" size={16} color="red" /> */}
        <MapboxGL.Callout title={'From'} />
      </MapboxGL.PointAnnotation>
    );
  };

  loadMapPins(mapID) {
    if (mapID) {
      this.setState({ mapPinsInProgress: true });
      this.props.mapAction
        .fetchMapPinList({ map_id: mapID, user_id: this.props.userData.id })
        .then(data => {
          let pinList = data.mapID.pin_list || [];
          let { params } = this.props.navigation.state;
          params = params || {};

          let featureCollections = [], pinLatLongs = [], topLeft = null, bottomRight = null;

          if (pinList && pinList.length > 0) {

            var splitByString = function (source, splitBy) {
              var splitter = splitBy.split('');
              splitter.push([source]); //Push initial value

              return splitter.reduceRight(function (accumulator, curValue) {
                var k = [];
                accumulator.forEach(v => k = [...k, ...v.split(curValue)]);
                return k;
              });
            }

            let groupedPins = _.groupBy(pinList, pin => pin.categories);
            Object.keys(groupedPins).map((categoryID, index) => {
              let randomId = Math.floor(Math.random() * 90000) + 10000;
              let pins = groupedPins[categoryID];
              let temp = [];
              pins.map(pin => {
                if (pin.longitude && pin.latitude) {
                  let exploded = splitByString(pin.name, '.,-');
                  let parsed = parseInt(exploded[0]);
                  temp.push({
                    type: 'Feature',
                    id: pin.id,
                    properties: {
                      id: pin.id,
                      mapName: params.mapName,
                      mapID: params.mapID,
                      hasNumber: !isNaN(parsed),
                      number: parsed
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
                category: categoryID,
                id: randomId,
              });
            });

            pinList.map((t) => {
              if (t.latitude && t.longitude) {
                pinLatLongs.push({ lat: parseFloat(t.latitude), lon: parseFloat(t.longitude) })
              }
            })
            let boundsResult = getBoundingBox(pinLatLongs, 10000);
            topLeft = boundsResult.topLeft;
            bottomRight = boundsResult.bottomRight;
          }

          let filteredCollections = featureCollections.filter(
            collection =>
              collection && collection.features && collection.features.length > 0,
          );
          this.setState({ mapPinsInProgress: false, pinList, filteredCollections, topLeft, bottomRight });
        })
        .catch(err => {
          console.log('error => ', err);
          this.setState({ mapPinsInProgress: false, pinList: [] });
        });
    }
  }

  async onDidFinishLoadingStyle() {
    const { width, height } = Dimensions.get('window');
    const bounds = geoViewport.bounds(
      CENTER_COORD,
      12,
      [width, height],
      MAPBOX_VECTOR_TILE_SIZE,
    );

    const options = {
      name: Math.random().toString(),
      styleURL: MapboxGL.StyleURL.Street,
      bounds: [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      minZoom: 10,
      maxZoom: 20,
    };

    // start download
    MapboxGL.offlineManager.createPack(options, this.onDownloadProgress);
  }

  onDownloadProgress = (offlineRegion, offlineRegionStatus) => {
    this.setState({
      name: offlineRegion.name,
      offlineRegion,
      offlineRegionStatus,
    });
  };

  addNewPin() {
    let { params } = this.props.navigation.state;
    this.props.navigation.navigate('AddMapDetail', {
      mapID: params.mapID,
      mapName: params.mapName,
    });
  }

  editPins() {
    let { params } = this.props.navigation.state;
    this.props.navigation.navigate('MapPins', {
      mapID: params.mapID,
      mapName: params.mapName,
    });
  }

  onSourceLayerPress(e) {
    const feature = e.nativeEvent.payload;
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.loadMapPins(params && params.mapID);
  }

  render() {
    let { params } = this.props.navigation.state;
    params = params || {};
    let { topLeft, bottomRight, filteredCollections } = this.state;
    return (
      <View style={styles.page}>
        {/* <NavigationEvents
          onWillFocus={payload =>
            // this.loadMapPins(payload.state.params && payload.state.params.mapID)
          }
        /> */}
        <View style={styles.container}>
          <Spinner
            visible={this.state.mapPinsInProgress}
            textContent={'Fetching Pins...'}
            textStyle={{ color: '#fff' }}
          />

          <Header
            showBack={true}
            rightEmpty={true}
            showRightButton={false}
            title={params.mapName}
            {...this.props}
            absoluteHeader={true}
          />

          {
            this.state.filteredCollections.length > 0 ?

              <MapboxGL.MapView
                style={styles.map}
                styleURL={MapboxGL.StyleURL.Street}
                logoEnabled={false}
                attributionEnabled={false}
                onDidFinishRenderingMapFully={r => {
                  this.setState({ followUserLocation: true });
                }}>

                {
                  topLeft && bottomRight &&
                  <MapboxGL.Camera
                    bounds={{
                      ne: [topLeft.lon, topLeft.lat],
                      sw: [bottomRight.lon, bottomRight.lat],
                    }}
                  />
                }


                {filteredCollections && filteredCollections.length > 0
                  ? filteredCollections.map(collection => {
                    let random = Math.floor(Math.random() * 90000) + 10000;
                    return (
                      <MapboxGL.ShapeSource
                        id={'symbolLocationSource' + random}
                        hitbox={{ width: 20, height: 20 }}
                        shape={collection}
                        cluster
                        clusterMaxZoomLevel={14}
                        clusterRadius={40}
                        onPress={e => {

                          let payload = e.nativeEvent.payload;
                          if (!payload.properties.cluster) {
                            this.props.navigation.navigate('PinView', {
                              pinID: payload.id,
                              mapID: payload.properties.mapID,
                              mapName: params.mapName
                            });
                          }

                        }}>

                        <MapboxGL.CircleLayer
                          id={`singlePoint${Math.random()}`}
                          filter={['has', 'point_count']}
                          style={{
                            circleColor: 'rgba(47,128,237,1)',
                            circleRadius: 20,
                            circleStrokeWidth: 2,
                            circleStrokeColor: 'white',
                          }}
                        />
                        <MapboxGL.SymbolLayer
                          id={`pointCount${Math.random()}`}
                          filter={['has', 'point_count']}
                          style={{
                            textField: '{point_count}',
                            textSize: 14,
                            textHaloColor: '#fff',
                            textHaloWidth: 0.3,
                            textColor: '#fff',
                            iconAllowOverlap:false
                          }}
                        />
                        <MapboxGL.SymbolLayer
                          id={`singlePointSelected${collection.id}`}
                          filter={['!has', 'point_count']}
                          style={{
                            iconImage: this.categoryImages[collection.category],
                            iconAllowOverlap: true,
                            textAllowOverlap:true,
                            iconSize: 0.4
                          }}
                        />

                        <MapboxGL.SymbolLayer
                          id={`singleNumberSelected${collection.id}`}
                          filter={['==', 'hasNumber', true]}
                          style={{
                            textField: '{number}',
                            textColor: 'white',
                            textJustify: 'left',
                            textAnchor: 'bottom-right',
                            textOffset: [-0.5, -1],
                            textHaloColor: 'rgba(47,128,237,1)',
                            textHaloWidth: 5,
                            textTranslate: [-0.5, -0.5],
                            textPadding: 2,
                          }}
                        />

                      </MapboxGL.ShapeSource>
                    );
                  })
                  : null}
                {/* <MapboxGL.UserLocation visible animated /> */}
              </MapboxGL.MapView>
              :
              null
          }
          {
            params.fromMyTravel ?
              <View style={[styles.mapControlButton]}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonOutline,
                    styles.buttonOutlineGray,
                    styles.buttonDecline,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    this.editPins();
                  }}>
                  <Text style={[styles.buttonText, styles.buttonTextGray]}>
                    Edit Pins
              </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonOutline,
                    styles.buttonOutlineGray,
                    styles.buttonDecline,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    this.addNewPin();
                  }}>
                  <Text style={[styles.buttonText, styles.buttonTextGray]}>
                    Add Pin
              </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonOutline,
                    styles.buttonOutlineGray,
                    styles.buttonDecline,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    this.loadMapPins(params.mapID);
                  }}>
                  <Text style={[styles.buttonText, styles.buttonTextGray]}>
                    Reload Map
              </Text>
                </TouchableOpacity>
              </View>
              :
              <ScrollView
                horizontal={true}
                style={{ height: 95, position: 'absolute', bottom: 30, paddingRight: 30 }}>
                {
                  this.state.pinList.map(pin => {
                    let category = this.props.categories.find(c => c.id == pin.categories);
                    let image = pin.pin_image ? { uri: pin.pin_image } : require('./../../Images/login-bg.jpg')
                    return (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.mapViewCard}
                        onPress={() => this.props.navigation.navigate('PinView', {
                          pinID: pin.id,
                          mapID: params.mapID,
                          mapName: params.mapName
                        })}>
                        <Image
                          style={styles.mapViewCardImg}
                          source={image}
                        />
                        <View style={styles.mapViewCardContent}>
                          <View style={styles.mapViewTitle}>
                            <Text style={styles.mapViewTitleText} numberOfLines={1} ellipsizeMode={'tail'}> {pin.name} </Text>
                          </View>
                          <View style={styles.mapViewCate}>
                            <IconMoon name={category.name && category.name.toLowerCase()} style={styles.mapViewCateIcon} />
                            <Text style={styles.mapViewCateText}> {category.name || ''}</Text>
                          </View>
                          <Text style={styles.mapViewContentText} numberOfLines={3} ellipsizeMode={'tail'}>{pin.description}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
          }

        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.maps.categories,
    userData: state.user.userData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapView);
