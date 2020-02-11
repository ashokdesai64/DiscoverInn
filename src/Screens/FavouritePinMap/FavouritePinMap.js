import React from 'react';
import { View, } from 'react-native';
import styles from './FavouritePinMap.style';

import sights1 from './../../Images/sights1.png';
import activities1 from './../../Images/activities1.png';
import restaurants1 from './../../Images/restaurants1.png';
import nightlife1 from './../../Images/nightlife1.png';
import transportations1 from './../../Images/transportations1.png';
import shopping1 from './../../Images/shopping1.png';
import other1 from './../../Images/other1.png';
import Header from './../../components/header/header'
import MapboxGL from '@react-native-mapbox-gl/maps';
import Spinner from './../../components/Loader';
import _ from 'underscore'

MapboxGL.setAccessToken('pk.eyJ1IjoiYWJyaWxsbyIsImEiOiJjanNlbHVjb28wanFwNDNzNzkyZzFnczNpIn0.39svco2wAZvwcrFD6qOlMw');

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
            featureCollection: MapboxGL.geoUtils.makeFeatureCollection(),
            showDestination: true,
            pinList: [],
            mapPinsInProgress: true,
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

    componentWillMount() {
        const { params } = this.props.navigation.state;
        let tripID = params.tripID;
        if (tripID) {
            this.props.mapAction.singleFavouritePinList({ user_id: this.props.userData.id, favorite_id: tripID, page: 1 }).then((data) => {
                this.setState({ pinList: data.favorite_pin || [], mapPinsInProgress: false })
                console.log("trip data ", data.favorite_pin);
            }).catch((err) => {
                this.setState({ pinList: [], isPinListFetching: false })
                console.log("err => ", err)
            })
        }
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
                                mapID:pin.map_id
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
                                                console.log("collection => ",e.nativeEvent.payload);
                                                let payload = e.nativeEvent.payload;
                                                this.props.navigation.navigate('PinView',{pinID:payload.id,mapID:payload.properties.mapID});
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
