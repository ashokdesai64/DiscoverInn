import React from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ImageBlurLoading from './../../components/ImageLoader';

import styles from './OfflineMapView.styles';
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

class OfflineMapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTripList: false,
      pinList: [],
      mapPinsInProgress: false,
      followUserLocation: false,
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

  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
      console.log("params => ", params);
      this.setState({mapData:params.mapData,filteredCollections:params.mapData.pinData})
  }

  render() {
    let { params } = this.props.navigation.state;
    params = params || {};
      let { topLeft, bottomRight, filteredCollections,mapData } = this.state;
      console.log("filteredCollections => ",filteredCollections)
    return (
      <View style={styles.page}>
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
            title={params.mapData.name}
            {...this.props}
            absoluteHeader={true}
          />

          {/* {
            this.state.filteredCollections.length > 0 ? */}

              <MapboxGL.MapView
                style={styles.map}
                styleURL={MapboxGL.StyleURL.Street}
                logoEnabled={false}
                attributionEnabled={false}
                rotateEnabled={false}
                onDidFinishRenderingMapFully={r => {
                  this.setState({ followUserLocation: true });
                }}>

                {
                  mapData.bounds &&
                  <MapboxGL.Camera
                    bounds={mapData.bounds}
                  />
                }

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
                            iconAllowOverlap: false
                          }}
                        />
                        <MapboxGL.SymbolLayer
                          id={`singlePointSelected${collection.id}`}
                          filter={['!has', 'point_count']}
                          style={{
                            iconImage: ['get', 'category'],
                            iconAllowOverlap: true,
                            textAllowOverlap: true,
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
              {/* :
              null
          } */}
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
                        {/* <Image
                          style={styles.mapViewCardImg}
                          source={image}
                        /> */}
                        <ImageBlurLoading
                          withIndicator
                          style={styles.mapViewCardImg}
                          source={image}
                          thumbnailSource={{
                            uri: 'https://discover-inn.com/upload/cover/map-image.jpeg',
                          }}
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
export default connect(mapStateToProps, mapDispatchToProps)(OfflineMapView);
