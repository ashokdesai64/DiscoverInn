import React, {Component} from 'react';
import {InteractionManager} from 'react-native';
import Routes from './src/routes';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFileSystem from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';
MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();
AntDesign.loadFont();
SimpleLineIcons.loadFont();
Feather.loadFont();
Ionicons.loadFont();

console.disableYellowBox = true; //get rid of yellow box warnings

//REDUX SETUP
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import reducer from './src/reducers';
import {Alert, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'maps'],
  timeout: 10000,
};
const persistedReducer = persistReducer(persistConfig, reducer);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(persistedReducer);
export let persistor = persistStore(store);
const prefix = 'discoverinn://';

export default class App extends Component {
  componentWillMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert('Connection Issue', 'No Internet connection!');
      }
    });
    Platform.OS === 'android' &&
      RNFetchBlob.fs.unlink(RNFileSystem.CachesDirectoryPath);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 750);
    });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes uriPrefix={prefix} />
        </PersistGate>
      </Provider>
    );
  }
}
