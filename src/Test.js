// import React from 'react';
// import {
//   View,
//   Dimensions,
//   Text,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';

// import styles from './MapView.style';
// import geoViewport from '@mapbox/geo-viewport';
// import MapboxGL from '@react-native-mapbox-gl/maps';
// import _ from 'underscore';
// import {getBoundingBox} from 'geolocation-utils';

// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import fontelloConfig from './../../selection.json';
// MapboxGL.setAccessToken(
//   'pk.eyJ1IjoiYWJyaWxsbyIsImEiOiJjanNlbHVjb28wanFwNDNzNzkyZzFnczNpIn0.39svco2wAZvwcrFD6qOlMw',
// );

// const CENTER_COORD = [-73.970895, 40.723279];
// const MAPBOX_VECTOR_TILE_SIZE = 512;

// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showTripList: false,
//       pinList: [],
//       mapPinsInProgress: false,
//       followUserLocation: false,
//       filteredCollections: [],
//     };
//   }

//   async onDidFinishLoadingStyle() {
//     const {width, height} = Dimensions.get('window');
//     const bounds = geoViewport.bounds(
//       CENTER_COORD,
//       12,
//       [width, height],
//       MAPBOX_VECTOR_TILE_SIZE,
//     );

//     const options = {
//       name: Math.random().toString(),
//       styleURL: MapboxGL.StyleURL.Street,
//       bounds: [
//         [bounds[0], bounds[1]],
//         [bounds[2], bounds[3]],
//       ],
//       minZoom: 10,
//       maxZoom: 20,
//     };

//     // start download
//     MapboxGL.offlineManager.createPack(options, this.onDownloadProgress);
//   }

//   onDownloadProgress = (offlineRegion, offlineRegionStatus) => {
//     this.setState({
//       name: offlineRegion.name,
//       offlineRegion,
//       offlineRegionStatus,
//     });
//   };

//   componentWillMount() {}

//   render() {
//     return (
//       <View style={styles.page}>
//         <View style={styles.container}>
//           <MapboxGL.MapView
//             style={styles.map}
//             styleURL={MapboxGL.StyleURL.Street}
//             logoEnabled={false}
//             attributionEnabled={false}
//             rotateEnabled={false}
//             onDidFinishRenderingMapFully={r => {
//               this.setState({followUserLocation: true});
//             }}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// export default Test;

import React from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import geoViewport from '@mapbox/geo-viewport';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWJyaWxsbyIsImEiOiJjanNlbHVjb28wanFwNDNzNzkyZzFnczNpIn0.39svco2wAZvwcrFD6qOlMw',
);
import styles1 from './MapView.style';

const CENTER_COORD = [-73.970895, 40.723279];
const MAPBOX_VECTOR_TILE_SIZE = 512;

const styles = StyleSheet.create({
  percentageText: {
    padding: 8,
    textAlign: 'center',
  },
  buttonCnt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: 'blue',
    padding: 8,
  },
  buttonTxt: {
    color: 'white',
  },
});

export default class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: `test-${Date.now()}`,
      offlineRegion: null,
      offlineRegionStatus: null,
    };

    this.onDownloadProgress = this.onDownloadProgress.bind(this);
    this.onDidFinishLoadingStyle = this.onDidFinishLoadingStyle.bind(this);

    this.onResume = this.onResume.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onStatusRequest = this.onStatusRequest.bind(this);
  }

  componentWillUnmount() {
    // avoid setState warnings if we back out before we finishing downloading
    MapboxGL.offlineManager.deletePack(this.state.name);
    MapboxGL.offlineManager.unsubscribe('test');
  }

  async onDidFinishLoadingStyle() {
    MapboxGL.offlineManager.deletePack(this.state.name);
    MapboxGL.offlineManager.unsubscribe('test');
    let d = await MapboxGL.offlineManager.getPacks();
    console.log('packs => ', d);
    const {width, height} = Dimensions.get('window');
    const bounds = geoViewport.bounds(
      CENTER_COORD,
      12,
      [width, height],
      MAPBOX_VECTOR_TILE_SIZE,
    );

    const options = {
      name: this.state.name,
      test: 123,
      styleURL: MapboxGL.StyleURL.Dark,
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

  onDownloadProgress(offlineRegion, offlineRegionStatus) {
    console.log(offlineRegionStatus);
    this.setState({
      name: offlineRegion.name,
      offlineRegion,
      offlineRegionStatus,
    });
  }

  onResume() {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.resume();
    }
  }

  onPause() {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.pause();
    }
  }

  async onStatusRequest() {
    if (this.state.offlineRegion) {
      const offlineRegionStatus = await this.state.offlineRegion.status();
      Alert.alert('Get Status', JSON.stringify(offlineRegionStatus, null, 2));
    }
  }

  _formatPercent() {
    if (!this.state.offlineRegionStatus) {
      return '0%';
    }
    return Math.round(this.state.offlineRegionStatus.percentage / 10) / 10;
  }

  _getRegionDownloadState(downloadState) {
    switch (downloadState) {
      case MapboxGL.OfflinePackDownloadState.Active:
        return 'Active';
      case MapboxGL.OfflinePackDownloadState.Complete:
        return 'Complete';
      default:
        return 'Inactive';
    }
  }

  render() {
    const {offlineRegionStatus} = this.state;

    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          style={styles1.map}
          //   styleURL={MapboxGL.StyleURL.Street}
          logoEnabled={false}
          attributionEnabled={false}
          rotateEnabled={false}
          onDidFinishLoadingMap={this.onDidFinishLoadingStyle}
          onDidFinishRenderingMapFully={r => {
            this.setState({followUserLocation: true});
          }}>
          <MapboxGL.Camera zoomLevel={10} centerCoordinate={CENTER_COORD} />
        </MapboxGL.MapView>

        {offlineRegionStatus !== null ? (
          <View style={{flex: 1}}>
            <Text>
              Download State:{' '}
              {this._getRegionDownloadState(offlineRegionStatus.state)}
            </Text>
            <Text>Download Percent: {offlineRegionStatus.percentage}</Text>
            <Text>
              Completed Resource Count:{' '}
              {offlineRegionStatus.completedResourceCount}
            </Text>
            <Text>
              Completed Resource Size:{' '}
              {offlineRegionStatus.completedResourceSize}
            </Text>
            <Text>
              Completed Tile Count: {offlineRegionStatus.completedTileCount}
            </Text>
            <Text>
              Required Resource Count:{' '}
              {offlineRegionStatus.requiredResourceCount}
            </Text>

            <View style={styles.buttonCnt}>
              <TouchableOpacity onPress={this.onResume}>
                <View style={styles.button}>
                  <Text style={styles.buttonTxt}>Resume</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onStatusRequest}>
                <View style={styles.button}>
                  <Text style={styles.buttonTxt}>Status</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPause}>
                <View style={styles.button}>
                  <Text style={styles.buttonTxt}>Pause</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
