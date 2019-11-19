import React, { Fragment } from 'react';
import { View, Dimensions, StyleSheet, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';

import exampleIcon from './marker.png';
import exampleIcon1 from './marker1.png';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

import MapboxGL from '@react-native-mapbox-gl/maps';
import { ScrollView } from 'react-native-gesture-handler';

MapboxGL.setAccessToken('pk.eyJ1IjoiYWJyaWxsbyIsImEiOiJjanNlbHVjb28wanFwNDNzNzkyZzFnczNpIn0.39svco2wAZvwcrFD6qOlMw')


class MapView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTripList: false,
            currentLat: 21.2148224,
            currentLong: 72.8629248,
            isSelected: '1',
            featureCollection: MapboxGL.geoUtils.makeFeatureCollection(),
            showDestination: true
        };

    }
    componentDidMount() {
        console.log("map loaded")
    }

    //pin destination on the map
    pinDestination = () => {

        if (!this.state.showDestination) { return }
        return (
            <MapboxGL.PointAnnotation
                key='pointAnnotation'
                id='pointAnnotation'
                coordinate={[this.state.currentLong, this.state.currentLat]}
            >
                <Image source={require('./marker.png')} style={{ height: 16, width: 16 }} />
                {/* <Icon style={styles.search} name="location-on" size={16} color="red" /> */}
                <MapboxGL.Callout title={'From'} />
            </MapboxGL.PointAnnotation>
        )
    }

    onSourceLayerPress(e) {
        const feature = e.nativeEvent.payload;
        console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
    }

    render() {
        const featureCollection = {
            "type": "FeatureCollection",
            "features": [
                {
                    type: "Feature",
                    id: `asdf`,
                    properties: {
                        id: `asdf`
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [this.state.currentLong, this.state.currentLat]
                    }
                },
                {
                    type: "Feature",
                    id: `asdf`,
                    properties: {
                        id: `asdf`
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [this.state.currentLat, this.state.currentLong]
                    }
                }
            ]
        }
        const featureCollection1 = {
            "type": "FeatureCollection",
            "features": [
                {
                    type: "Feature",
                    id: `asdf`,
                    properties: {
                        id: `asdf`
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [72.9583783, 21.1998507]
                    }
                }
            ]
        }
        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <MapboxGL.MapView
                        style={styles.map}
                        styleURL={MapboxGL.StyleURL.Light}
                        logoEnabled={false}
                        attributionEnabled={false}
                    >
                        <MapboxGL.Camera
                            centerCoordinate={[this.state.currentLong, this.state.currentLat]}
                            zoomLevel={10}
                            animationMode={'flyTo'}
                        />

                        <MapboxGL.ShapeSource
                            id="symbolLocationSource"
                            hitbox={{ width: 20, height: 20 }}
                            shape={featureCollection}
                        >
                            <MapboxGL.SymbolLayer
                                id="symbolLocationSymbols"
                                minZoomLevel={1}
                                style={{ iconImage: exampleIcon, iconAllowOverlap: true, iconSize: 0.05 }}
                            />
                        </MapboxGL.ShapeSource>

                        <MapboxGL.ShapeSource
                            id="symbolLocationSource1"
                            hitbox={{ width: 20, height: 20 }}
                            shape={featureCollection1}
                        >
                            <MapboxGL.SymbolLayer
                                id="symbolLocationSymbols1"
                                minZoomLevel={1}
                                style={{ iconImage: exampleIcon1, iconAllowOverlap: true, iconSize: 0.05 }}
                            />
                        </MapboxGL.ShapeSource>

                    </MapboxGL.MapView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    container: {
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
        backgroundColor: "tomato"
    },
    map: {
        flex: 1
    }
});

export default MapView;
