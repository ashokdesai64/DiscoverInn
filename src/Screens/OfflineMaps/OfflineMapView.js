import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import ImageBlurLoading from './../../components/ImageLoader';
import RNFetchBlob from 'rn-fetch-blob';

import styles from './OfflineMapView.styles';
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

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
MapboxGL.setAccessToken(
  'sk.eyJ1IjoicmF2aXNvaml0cmF3b3JrIiwiYSI6ImNrYTByeHVxZjBqbGszZXBtZjF3NmJleWgifQ.idSimILJ3_sk1gSWs2sMsQ',
);

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../actions/mapActions';

class OfflineMapView extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    let pinList = params.mapData.pinList || [];
    if (
      params &&
      params.filterCategories &&
      params.filterCategories.length > 0
    ) {
      pinList = pinList.filter(
        pin => params.filterCategories.indexOf(pin.categories) >= 0,
      );
    }

    this.state = {
      showTripList: false,
      mapPinsInProgress: false,
      followUserLocation: false,
      mapData: params.mapData,
      filteredCollections: params.mapData.pinData,
      pinList: pinList,
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

  render() {
    let { params } = this.props.navigation.state;
    console.log("🚀 ~ file: OfflineMapView.js:69 ~ OfflineMapView ~ render ~ params:", params)
    // console.log("Pin Data::::", map.pinData);
    params = params || {};

    let { filteredCollections, mapData, pinList } = this.state;
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
              this.setState({ followUserLocation: false });
            }}
            onRegionDidChange={() => {
              if (!this.state.followUserLocation) {
                this.setState({ followUserLocation: false });
              }
            }}>
            {mapData.bounds && (
              <MapboxGL.Camera
                bounds={mapData.bounds}
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
                          mapName: params.mapData.name,
                          isOffline: true,
                          allPins: params.mapData.pinList,
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
          {/* :
              null
          } */}
          <TouchableOpacity
            onPress={() => this.setState({ followUserLocation: true })}
            style={{
              position: 'absolute',
              bottom: 140,
              right: 15,
              height: 50,
              width: 50,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <MaterialIcons
              name={'my-location'}
              style={{ color: '#2F80ED' }}
              size={25}
            />
          </TouchableOpacity>
          {pinList && pinList.length > 0 ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                height: 95,
                position: 'absolute',
                bottom: 30,
                paddingRight: 30,
              }}>
              {pinList.map(pin => {
                let category = this.props.categories.find(
                  c => c.id == pin.categories,
                );

                let imagePath = '';
                if (typeof pin.images == 'string') {
                  imagePath = pin?.images;
                } else if (Array.isArray(pin.images) && pin.images.length > 0) {
                  imagePath = pin?.images[0].image || pin.images[0].thumb_image;
                }
                let fileName = imagePath.split('/').pop();
                let endPath = RNFetchBlob.fs.dirs.CacheDir + '/discover/' + fileName;
                let pathToDisplay = Platform.OS === 'android' ? 'file://' + endPath : endPath;
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.mapViewCard}
                    onPress={() =>
                      //     this.setState({ followUserLocation: true })
                      // return
                      this.props.navigation.navigate('PinView', {
                        pinID: pin.id,
                        mapID: params.mapData.id,
                        mapName: params.mapData.name,
                        isOffline: true,
                        offlinePath: pathToDisplay,
                        allPins: params.mapData.pinList,
                        displayImg: params.mapData.cover_image,
                      })
                    }>
                    <ImageBlurLoading
                      withIndicator
                      style={styles.mapViewCardImg}
                      source={{
                        uri: imagePath,
                      }}
                      thumbnailSource={{
                        uri: imagePath,
                      }}
                    />
                    <View style={styles.mapViewCardContent}>
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
                          name={
                            category &&
                            category.name &&
                            category.name.toLowerCase()
                          }
                          style={styles.mapViewCateIcon}
                        />
                        <Text style={styles.mapViewCateText}>
                          {' '}
                          {(category && category.name) || ''}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OfflineMapView);
