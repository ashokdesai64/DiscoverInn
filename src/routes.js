import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import EditCategories from './Screens/EditCategories/EditCategories';
import EditProfile from './Screens/AuthScreens/EditProfile/EditProfile';
import AddMymaps from './Screens/AuthScreens/AddMymaps/AddMymaps';
import AddMapDetail from './Screens/AuthScreens/AddMymaps/AddMapDetail';
import EditMapDetails from './Screens/AuthScreens/AddMymaps/EditMapDetails';
import EditMymaps from './Screens/AuthScreens/EditMymaps/EditMymaps';
import MyTravel from './Screens/AuthScreens/MyTravel/MyTravel';
import EditMyTravel from './Screens/AuthScreens/EditMyTravel/EditMyTravel';
import EditMyTravelDetails from './Screens/AuthScreens/EditMyTravelDetails/EditMyTravelDetails';
import MyReviews from './Screens/AuthScreens/MyReviews/MyReviews';
import MyTripList from './Screens/AuthScreens/MyTripList/MyTripList';
import TripPinList from './Screens/AuthScreens/TripPinList/TripPinList';
import LoginScreen from './Screens/UnauthScreens/LoginScreen';
import SignupScreen from './Screens/UnauthScreens/SignupScreen';
import ForgotPassScreen from './Screens/UnauthScreens/ForgotPassScreen';
import ChangePassword from './Screens/UnauthScreens/ChangePassword';
import SetPassScreen from './Screens/UnauthScreens/SetPassScreen';
import MyMapShareList from './Screens/ShareList/MyMapShareList';
import MapList from './Screens/MapList/MapList';
import MapView from './Screens/MapView/MapView';
import FavouritePinMap from './Screens/FavouritePinMap/FavouritePinMap';
import PinView from './Screens/PinView/PinView';
import UploadMap from './Screens/HomeScreen/UploadMap/UploadMap';
import PinCategories from './Screens/AuthScreens/PinCategories/PinCategories';
import SinglePinView from './Screens/AuthScreens/SinglePinView/SinglePinView';
import FilterScreen from './Screens/FilterScreen/FilterScreen';
import AboutUsScreen from './Screens/AboutUsScreen/AboutUsScreen';
import PrivacyPolicyScreen from './Screens/PrivacyPolicyScreen/PrivacyPolicyScreen';
import TermsConditionScreen from './Screens/TermsConditionScreen/TermsConditionScreen';
import MapPins from './Screens/MapPins/MapPins';
import OfflineMaps from './Screens/OfflineMaps/OfflineMaps';
import OfflineMapView from './Screens/OfflineMaps/OfflineMapView';
import SideMenu from './components/SideMenu/SideMenu';
import Test from './Test'
import DefaultScreen from './Screens/DefaultScreen';

const userStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    MapPins: {
      screen: MapPins
    },
    ChangePassword: {
      screen: ChangePassword,
    },
    EditCategories: {
      screen: EditCategories,
    },
    TripPinList: {
      screen: TripPinList,
    },
    EditProfile: {
      screen: EditProfile,
    },
    EditMymaps: {
      screen: EditMymaps,
    },
    MyTravel: {
      screen: MyTravel,
    },
    EditMyTravel: {
      screen: EditMyTravel,
    },
    EditMyTravelDetails: {
      screen: EditMyTravelDetails,
    },
    AddMymaps: {
      screen: AddMymaps,
    },
    MyReviews: {
      screen: MyReviews,
    },
    MyTripList: {
      screen: MyTripList,
    },
    MyMapShareList: {
      screen: MyMapShareList,
    },
    MapList: {
      screen: MapList,
    },
    MapView: {
      screen: MapView,
    },
    FavouritePinMap: {
      screen: FavouritePinMap,
    },
    PinCategories: {
      screen: PinCategories,
    },
    SinglePinView: {
      screen: SinglePinView,
    },
    FilterScreen: {
      screen: FilterScreen,
    },
    UploadMap: {
      screen: UploadMap,
    },
    PinView: {
      screen: PinView,
    },
    AddMapDetail: {
      screen: AddMapDetail,
    },
    EditMapDetails: {
      screen: EditMapDetails,
    },
    AboutUsScreen: {
      screen: AboutUsScreen,
    },
    PrivacyPolicyScreen: {
      screen: PrivacyPolicyScreen,
    },
    TermsConditionScreen: {
      screen: TermsConditionScreen,
    },
    DefaultScreen: {
      screen: DefaultScreen,
    },
    OfflineMaps: {
      screen:OfflineMaps
    },
    OfflineMapView: {
      screen:OfflineMapView
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

const AuthStack = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
    },
    SignupScreen: {
      screen: SignupScreen,
    },
    ForgotPassScreen: {
      screen: ForgotPassScreen,
    },
    SetPassScreen: {
      screen: SetPassScreen,
    },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);

const DrawerStack = createDrawerNavigator(
  {
    userStack: { screen: userStack },
  },
  {
    gesturesEnabled: false,
    contentComponent: SideMenu,
    initialRouteName: 'userStack',
  },
);

const App = createSwitchNavigator(
  {
    AuthLoading: {
      screen: DefaultScreen,
    },
    Test: {
      screen:Test
    },
    App: {
      screen: DrawerStack,
    },
    Auth: {
      screen: AuthStack,
    },
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(App);
