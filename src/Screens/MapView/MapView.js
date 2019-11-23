import React, {Fragment} from 'react';
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
import Carousel from 'react-native-snap-carousel';
import styles1 from './MapView.style';
import exampleIcon from './marker.png';
import exampleIcon1 from './marker1.png';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWJyaWxsbyIsImEiOiJjanNlbHVjb28wanFwNDNzNzkyZzFnczNpIn0.39svco2wAZvwcrFD6qOlMw',
);

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
    };
  }
  componentDidMount() {
    console.log('map loaded');
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
          source={require('./marker.png')}
          style={{height: 16, width: 16}}
        />
        {/* <Icon style={styles.search} name="location-on" size={16} color="red" /> */}
        <MapboxGL.Callout title={'From'} />
      </MapboxGL.PointAnnotation>
    );
  };

  onSourceLayerPress(e) {
    const feature = e.nativeEvent.payload;
    console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
  }

  _renderItem({item, index}) {
    return (
      <View style={styles1.mapSlidCard}>
        <View style={styles1.mapSlidCardInner}>
          <Image
            style={styles1.mapSlideCardImg}
            source={require('./../../Images/login-bg.jpg')}
          />
          <View style={styles1.mapSlideCardContent}>
            <Text style={styles1.mapSlideCardTitle}>{item.title}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const featureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: `asdf`,
          properties: {
            id: `asdf`,
          },
          geometry: {
            type: 'Point',
            coordinates: [this.state.currentLong, this.state.currentLat],
          },
        },
        {
          type: 'Feature',
          id: `asdf`,
          properties: {
            id: `asdf`,
          },
          geometry: {
            type: 'Point',
            coordinates: [this.state.currentLat, this.state.currentLong],
          },
        },
      ],
    };
    const featureCollection1 = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: `asdf`,
          properties: {
            id: `asdf`,
          },
          geometry: {
            type: 'Point',
            coordinates: [72.9583783, 21.1998507],
          },
        },
      ],
    };
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View
            style={{
              top: 20,
              zIndex: 9999999,
              backgroundCoor: 'red',
              position: 'absolute',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: DEVICE_WIDTH,
              padding: 15,
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name={'arrow-back'} size={25} color={'black'} />
            </TouchableOpacity>
          </View>
          <MapboxGL.MapView
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Light}
            logoEnabled={false}
            attributionEnabled={false}>
            <MapboxGL.Camera
              centerCoordinate={[this.state.currentLong, this.state.currentLat]}
              zoomLevel={10}
              animationMode={'flyTo'}
            />

            <MapboxGL.ShapeSource
              id="symbolLocationSource"
              hitbox={{width: 20, height: 20}}
              shape={featureCollection}>
              <MapboxGL.SymbolLayer
                id="symbolLocationSymbols"
                minZoomLevel={1}
                style={{
                  iconImage: exampleIcon,
                  iconAllowOverlap: true,
                  iconSize: 0.05,
                }}
              />
            </MapboxGL.ShapeSource>

            <MapboxGL.ShapeSource
              id="symbolLocationSource1"
              hitbox={{width: 20, height: 20}}
              shape={featureCollection1}>
              <MapboxGL.SymbolLayer
                id="symbolLocationSymbols1"
                minZoomLevel={1}
                style={{
                  iconImage: exampleIcon1,
                  iconAllowOverlap: true,
                  iconSize: 0.05,
                }}
              />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{height: 95, position: 'absolute', bottom: 30}}>
            {[1, 2, 3, 4, 5].map(i => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles1.mapSlidCard}
                  onPress={() => this.props.navigation.navigate('PinView')}>
                  <Image
                    style={styles1.mapSlideCardImg}
                    source={require('./../../Images/login-bg.jpg')}
                  />
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: 200,
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: 200 - 20,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                        Planet - Bangkok
                      </Text>
                      <SimpleLineIcons
                        name={'heart'}
                        size={15}
                        color={'#EB5757'}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <Icon name={'camera'} />
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          fontSize: 12,
                          color: '#828282',
                        }}>
                        {' '}
                        Sights
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-Regular',
                        color: '#828282',
                      }}>
                      Australian chef-author David Thompson is the man behind
                      one of Bangkok's
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* <Carousel
                        data={this.state.carouselItems}
                        sliderWidth={DEVICE_WIDTH}
                        sliderHeight={95}
                        itemWidth={300}
                        firstItem={0}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        renderItem={this._renderItem}
                        contentContainerStyle={{ position: 'absolute', height: 95, flex: 0.05 }}
                        contentContainerCustomStyle={{ position: 'absolute', bottom: 30, height: 95, }}
                    /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  map: {
    flex: 1,
  },
});

export default MapView;
