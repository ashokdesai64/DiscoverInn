import React, { Fragment } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './MapView.style';
import geoViewport from '@mapbox/geo-viewport';

import sights1 from './../../Images/sights1.png';
import activities1 from './../../Images/activities1.png';
import restaurants1 from './../../Images/restaurants1.png';
import nightlife1 from './../../Images/nightlife1.png';
import transportations1 from './../../Images/transportations1.png';
import shopping1 from './../../Images/shopping1.png';
import other1 from './../../Images/other1.png';

import MapboxGL from '@react-native-mapbox-gl/maps';
import Spinner from './../../components/Loader';
import _ from 'underscore'
import { NavigationEvents } from 'react-navigation'

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

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTripList: false,
      currentLat: 21.2148224,
      currentLong: 72.8629248,
      isSelected: '1',
      featureCollection: MapboxGL.geoUtils.makeFeatureCollection(),
      showDestination: true,
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
      pinList: [],
      mapPinsInProgress: false,
      followUserLocation: false
    };
    this.categoryImages = {
      '1': sights1,
      '2': activities1,
      '3': restaurants1,
      '4': nightlife1,
      '5': transportations1,
      '6': shopping1,
      '7': other1
    }
  }
  componentDidMount() {
    console.log('map loaded', this.props);
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
      this.setState({ mapPinsInProgress: true })
      this.props.mapAction.getMapPins({ map_id: mapID, user_id: this.props.userData.id }).then((data) => {
        let pinList = data.mapID;
        console.log("data => ", data)
        this.setState({ mapPinsInProgress: false, pinList })
      }).catch((err) => {
        console.log("error => ", err)
        this.setState({ mapPinsInProgress: false, pinList: [] })
      })
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
      bounds: [[bounds[0], bounds[1]], [bounds[2], bounds[3]]],
      minZoom: 10,
      maxZoom: 20,
    };

    // start download
    MapboxGL.offlineManager.createPack(options, this.onDownloadProgress);
  }

  onDownloadProgress = (offlineRegion, offlineRegionStatus) => {
    console.log("offline region => ", offlineRegion)
    console.log("offlineRegionStatus => ", offlineRegionStatus)
    this.setState({
      name: offlineRegion.name,
      offlineRegion,
      offlineRegionStatus,
    });
  }

  render() {
    let { params } = this.props.navigation.state;
    params = params || {};
    let { pinList } = this.state;

    let featureCollections = [];

    if (pinList && pinList.length > 0) {
      let groupedPins = _.groupBy(pinList, (pin) => pin.categories);
      Object.keys(groupedPins).map((categoryID) => {
        let pins = groupedPins[categoryID];
        let temp = [];
        pins.map((pin) => {
          if (pin.longitude && pin.latitude) {
            temp.push({
              type: 'Feature',
              id: pin.id,
              properties: {
                id: pin.id,
              },
              geometry: {
                type: 'Point',
                coordinates: [parseFloat(pin.longitude), parseFloat(pin.latitude)],
              },
            })
          }
        })

        featureCollections.push({
          type: `FeatureCollection`,
          features: temp,
          category: categoryID
        })

      })
    }

    let filteredCollections = featureCollections.filter(collection => collection && collection.features && collection.features.length > 0)
    return (
      <View style={styles.page}>
        <NavigationEvents
          onWillFocus={payload => this.loadMapPins(payload.state.params && payload.state.params.mapID)}
        />
        <View style={styles.container}>
          <Spinner
            visible={this.state.mapPinsInProgress}
            textContent={'Fetching Pins...'}
            textStyle={{ color: '#fff' }}
          />
          <View style={styles.viewMapHeader}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name={'arrow-left'} size={24} color={'#333333'} />
            </TouchableOpacity>
          </View>

          <MapboxGL.MapView
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Street}
            logoEnabled={false}
            attributionEnabled={false}
            onDidFinishRenderingMapFully={(r) => {
              this.setState({ followUserLocation: true })
            }}
          >
            <MapboxGL.Camera
              // followUserLocation={this.state.followUserLocation}
              // followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
              centerCoordinate={
                filteredCollections[0] ?
                  [filteredCollections[0].features[0].geometry.coordinates[0], filteredCollections[0].features[0].geometry.coordinates[1]]
                  :
                  [this.state.currentLong, this.state.currentLat]
              }
              zoomLevel={10}
              animationMode={'flyTo'}
            />
            {
              filteredCollections && filteredCollections.length > 0 ?
                filteredCollections.map((collection) => {
                  let random = Math.floor(Math.random() * 90000) + 10000;
                  return (
                    <MapboxGL.ShapeSource
                      id={"symbolLocationSource" + random}
                      hitbox={{ width: 20, height: 20 }}
                      shape={collection}
                      cluster
                      clusterMaxZoomLevel={14}
                      clusterRadius={50}
                      onPress={e => {
                        this.props.navigation.navigate('PinView');
                      }}>
                      <MapboxGL.SymbolLayer
                        id={"symbolLocationSymbols" + (random + 1)}
                        minZoomLevel={1}
                        style={{
                          iconImage: this.categoryImages[collection.category],
                          iconAllowOverlap: true,
                          iconSize: 0.4,
                        }}
                      />
                      <MapboxGL.Callout title="Rivadavia 1841, 7º Piso, Of. 749." />
                    </MapboxGL.ShapeSource>
                  )
                })
                :
                null
            }
            <MapboxGL.UserLocation visible animated />
          </MapboxGL.MapView>
          <View style={styles.mapActionButton}>
            <TouchableOpacity
              style={[
                styles.iconButton,
                styles.iconButtonPrimary,
                styles.iconButtonView,
              ]}>
              <Icon name={'map-pin'} size={24} color={'#FFF'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.iconButton,
                styles.iconButtonPrimary,
                styles.iconButtonAdd,
              ]}
              onPress={() => this.props.navigation.navigate('AddMapDetail', { ...params })}
            >
              <Icon name={'plus-circle'} size={24} color={'#FFF'} />
            </TouchableOpacity>
          </View>
          <View style={[styles.mapControlButton]}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonOutline,
                styles.buttonOutlineGray,
                styles.buttonDecline,
              ]}
              onPress={() => { this.loadMapPins(params.mapID) }}>
              <Text style={[styles.buttonText, styles.buttonTextGray]}>
                Reload Map
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonDanger, styles.buttonSave]}
              onPress={() => { }}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>

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
