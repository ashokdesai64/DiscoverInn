import React from 'react';
import { View } from 'react-native';
import styles from './FavouritePinMap.style';

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
import { getBoundingBox } from 'geolocation-utils';
MapboxGL.setAccessToken(
  'sk.eyJ1IjoicmF2aXNvaml0cmF3b3JrIiwiYSI6ImNrYTByeHVxZjBqbGszZXBtZjF3NmJleWgifQ.idSimILJ3_sk1gSWs2sMsQ',
);

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../actions/mapActions';

class FavouritePinMap extends React.Component {
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
      mapPinsInProgress: true,
      followUserLocation: false,
      filteredCollections: [],
      allPins: []
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
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    let tripID = params.tripID;
    if (tripID) {
      this.props.mapAction
        .singleFavouritePinList({
          user_id: this.props.userData.id,
          favorite_id: tripID,
          page: 1,
        })
        .then(data => {
          this.setState({
            allPins: data.favorite_pin || [],
            pinList: data.favorite_pin || [],
            mapPinsInProgress: false,
          });
          let pinList = data.favorite_pin || [];
          let { params } = this.props.navigation.state;
          params = params || {};

          let featureCollections = [],
            pinLatLongs = [],
            topLeft = null,
            bottomRight = null;

          if (pinList && pinList.length > 0) {
            var splitByString = function (source, splitBy) {
              var splitter = splitBy.split('');
              splitter.push([source]); //Push initial value

              return splitter.reduceRight(function (accumulator, curValue) {
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
                    mapName: data.mapName,
                    mapID: pin.map_id,
                    hasNumber: !isNaN(parsed),
                    number: parsed,
                    category: pin.categories
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
          this.setState({ pinList: [], isPinListFetching: false });
        });
    }
  }

  render() {
    let { params } = this.props.navigation.state;
    params = params || {};
    let { topLeft, bottomRight, filteredCollections } = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.mapPinsInProgress}
            textContent={'Fetching Pins...'}
            textStyle={{ color: '#fff' }}
            onClose={() => {
              this.setState({ mapPinsInProgress: false });
            }}
          />

          <Header
            showBack={true}
            rightEmpty={true}
            showRightButton={false}
            title={params.tripName || ''}
            {...this.props}
            absoluteHeader={true}
          />

          {this.state.filteredCollections.length > 0 ? (
            <MapboxGL.MapView
              style={styles.map}
              styleURL={MapboxGL.StyleURL.Street}
              logoEnabled={false}
              rotateEnabled={false}
              attributionEnabled={false}
              onDidFinishRenderingMapFully={r => {
                this.setState({ followUserLocation: true });
              }}>
              {topLeft && bottomRight && (
                <MapboxGL.Camera
                  bounds={{
                    ne: [topLeft.lon, topLeft.lat],
                    sw: [bottomRight.lon, bottomRight.lat],
                  }}
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
                  '7': this.categoryImages['7']
                }}
              />

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
                            mapName: params.mapName,
                            fromFav: true,
                            pinList: this.state.allPins
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
              {/* <MapboxGL.UserLocation visible animated /> */}
            </MapboxGL.MapView>
          ) : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(FavouritePinMap);
