import React from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ImageBlurLoading from './../../components/ImageLoader';

import styles from './MapView.style';
import geoViewport from '@mapbox/geo-viewport';
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
import {getBoundingBox} from 'geolocation-utils';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
MapboxGL.setAccessToken(
  'pk.eyJ1IjoicmF2aXNvaml0cmF3b3JrIiwiYSI6ImNrYTByc3RqNjBldGozbHBtcmgwZXA0cGQifQ.6p5CTW54hkMu5Q00dKD0ew',
);

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as mapActions from './../../actions/mapActions';

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTripList: false,
      pinList: [],
      mapPinsInProgress: false,
      followUserLocation: false,
      filteredCollections: [],
      mapHasLoaded: false,
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
    this.cameraRef = null;
  }

  loadMapPins(mapID) {
    if (mapID) {
      this.setState({mapPinsInProgress: true});
      this.props.mapAction
        .fetchMapPinList({
          map_id: mapID,
          user_id: this.props.userData && this.props.userData.id,
        })
        .then(data => {
          let pinList = data.mapID.pin_list || [];
          let {params} = this.props.navigation.state;
          params = params || {};

          let featureCollections = [],
            pinLatLongs = [],
            topLeft = null,
            bottomRight = null;

          if (pinList && pinList.length > 0) {
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

            if (
              params &&
              params.filterCategories &&
              params.filterCategories.length > 0
            ) {
              pinList = pinList.filter(
                pin => params.filterCategories.indexOf(pin.categories) >= 0,
              );
            }

            pinList.map(pin => {
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
          }

          let filteredCollections = featureCollections.filter(
            collection =>
              collection &&
              collection.features &&
              collection.features.length > 0,
          );
          this.setState({
            mapPinsInProgress: false,
            pinList,
            filteredCollections,
            topLeft,
            bottomRight,
          });
        })
        .catch(err => {
          console.log('error => ', err);
          this.setState({mapPinsInProgress: false, pinList: []});
        });
    }
  }

  addNewPin() {
    let {params} = this.props.navigation.state;
    this.props.navigation.navigate('AddMapDetail', {
      mapID: params.mapID,
      mapName: params.mapName,
    });
  }

  editPins() {
    let {params} = this.props.navigation.state;
    this.props.navigation.navigate('MapPins', {
      mapID: params.mapID,
      mapName: params.mapName,
    });
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.loadMapPins(params && params.mapID);
  }

  render() {
    let {params} = this.props.navigation.state;
    params = params || {};
    let {topLeft, bottomRight, filteredCollections, mapHasLoaded} = this.state;
    let hasCollection = filteredCollections && filteredCollections.length > 0;
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.mapPinsInProgress}
            textContent={'Fetching Pins...'}
            textStyle={{ color: '#fff' }}
            onClose={() => {
              this.setState({mapPinsInProgress:false})
            }}
          />

          <Header
            showBack={true}
            rightEmpty={true}
            showRightButton={false}
            // title={params.mapName}
            {...this.props}
            absoluteHeader={true}
          />

          {this.state.filteredCollections.length > 0 ? (
            <MapboxGL.MapView
              style={styles.map}
              styleURL={MapboxGL.StyleURL.Street}
              logoEnabled={false}
              attributionEnabled={false}
              rotateEnabled={false}
              onDidFinishRenderingMapFully={r => {
                this.setState({followUserLocation: false, mapHasLoaded: true});
              }}
              onRegionDidChange={() => {
                if (!this.state.followUserLocation) {
                  this.setState({followUserLocation: false});
                }
              }}>
              {topLeft && bottomRight && hasCollection && mapHasLoaded && (
                <MapboxGL.Camera
                  bounds={{
                    ne: [topLeft.lon, topLeft.lat],
                    sw: [bottomRight.lon, bottomRight.lat],
                  }}
                  followUserMode={'normal'}
                  followUserLocation={this.state.followUserLocation}
                />
              )}

              <MapboxGL.Images
                images={{
                  '1': this.categoryImages['1'],
                  '2': this.categoryImages['2'],
                  '3': this.categoryImages['3'],
                  '4': this.categoryImages['4'],
                  '5': this.categoryImages['5'],
                  '6': this.categoryImages['6'],
                  '7': this.categoryImages['7'],
                }}
              />

              {hasCollection
                ? filteredCollections.map(collection => {
                    let random = Math.floor(Math.random() * 90000) + 10000;
                    return (
                      <MapboxGL.ShapeSource
                        key={collection.id}
                        id={'symbolLocationSource' + random}
                        hitbox={{width: 20, height: 20}}
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
                              mapName: params.mapName,
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
                            iconAllowOverlap: false,
                          }}
                        />
                        <MapboxGL.SymbolLayer
                          id={`singlePointSelected${collection.id}`}
                          filter={['!', ['has', 'point_count']]}
                          style={{
                            iconImage: ['get', 'category'],
                            iconAllowOverlap: true,
                            textAllowOverlap: true,
                            iconSize: 0.4,
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

              <MapboxGL.UserLocation
                visible={true}
                animated
                showsUserHeadingIndicator
                androidRenderMode={'gps'}
              />
            </MapboxGL.MapView>
          ) : null}
          {params.fromMyTravel ? (
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
              {/* <TouchableOpacity
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
                </TouchableOpacity> */}
            </View>
          ) : (
            <ScrollView
              horizontal={true}
              style={{
                height: 95,
                position: 'absolute',
                bottom: 30,
                paddingRight: 30,
              }}>
              {this.state.pinList.map(pin => {
                let category = this.props.categories.find(
                  c => c.id == pin.categories,
                );
                let image = pin.pin_image
                  ? {uri: pin.pin_image}
                  : require('./../../Images/login-bg.jpg');
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.mapViewCard}
                    onPress={
                      () =>
                        this.props.navigation.navigate('PinView', {
                          pinID: pin.id,
                          mapID: params.mapID,
                          mapName: params.mapName,
                        })
                      // this.setState({followUserLocation: true})
                    }>
                    {/* <Image
                          style={styles.mapViewCardImg}
                          source={image}
                        /> */}
                    <ImageBlurLoading
                      withIndicator
                      style={styles.mapViewCardImg}
                      source={image}
                      thumbnailSource={{
                        uri:
                          'https://discover-inn.com/upload/cover/map-image.jpeg',
                      }}
                    />
                    <View style={[styles.mapViewCardContent, {height: 95}]}>
                      <View style={styles.mapViewTitle}>
                        <Text
                          style={styles.mapViewTitleText}
                          numberOfLines={1}
                          ellipsizeMode={'tail'}>
                          {' '}
                          {pin.name}{' '}
                        </Text>
                      </View>
                      <View style={styles.mapViewCate}>
                        <IconMoon
                          name={category.name && category.name.toLowerCase()}
                          style={styles.mapViewCateIcon}
                        />
                        <Text style={styles.mapViewCateText}>
                          {' '}
                          {category.name || ''}
                        </Text>
                      </View>
                      <Text
                        style={styles.mapViewContentText}
                        numberOfLines={3}
                        ellipsizeMode={'tail'}>
                        {pin.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapView);
