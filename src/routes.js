import React from 'react';
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
import MapReviews from './Screens/MapView/MapReviews';
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
import DefaultScreen from './Screens/DefaultScreen';
import WalkThrough from './Screens/WalkThrough';
import GetStarted from './Screens/WalkThrough/GetStarted';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const userStack = () => (
  {
    Home: {
      screen: HomeScreen,
    },
    MapPins: {
      screen: MapPins,
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
      screen: OfflineMaps,
    },
    OfflineMapView: {
      screen: OfflineMapView,
    },
    MapReviews: {
      screen: MapReviews,
    },
  }
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
      path: 'setpass/:email'
    },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);

// const DrawerStack = createDrawerNavigator(
//   {
//     userStack: { screen: userStack },
//   },
//   {
//     gesturesEnabled: false,
//     contentComponent: SideMenu,
//     initialRouteName: 'userStack',
//   },
// );

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    // userStack: {
    //   screen: userStack
    // }
    MapPins: {
      screen: MapPins,
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
      screen: OfflineMaps,
    },
    OfflineMapView: {
      screen: OfflineMapView,
    },
    MapReviews: {
      screen: MapReviews,
    },
  }, {
  headerMode: 'none',
})

const MyTravelStack = createStackNavigator(
  {
    MyTravel: {
      screen: MyTravel,
    },
    Home: {
      screen: HomeScreen,
    },
    MapPins: {
      screen: MapPins,
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
      screen: OfflineMaps,
    },
    OfflineMapView: {
      screen: OfflineMapView,
    },
    MapReviews: {
      screen: MapReviews,
    },
  }, {
  headerMode: 'none',
})

const MyTripListStack = createStackNavigator(
  {
    MyTripList: {
      screen: MyTripList,
    },
    MyTravel: {
      screen: MyTravel,
    },
    Home: {
      screen: HomeScreen,
    },
    MapPins: {
      screen: MapPins,
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
      screen: OfflineMaps,
    },
    OfflineMapView: {
      screen: OfflineMapView,
    },
    MapReviews: {
      screen: MapReviews,
    },
  }, {
  headerMode: 'none',
})

const OfflineMapsStack = createStackNavigator(
  {
    OfflineMaps: {
      screen: OfflineMaps,
    },
    MyTripList: {
      screen: MyTripList,
    },
    MyTravel: {
      screen: MyTravel,
    },
    Home: {
      screen: HomeScreen,
    },
    MapPins: {
      screen: MapPins,
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
    OfflineMapView: {
      screen: OfflineMapView,
    },
    MapReviews: {
      screen: MapReviews,
    },
  }, {
  headerMode: 'none',
})

const MyReviewsStack = createStackNavigator(
  {
    MyReviews: {
      screen: MyReviews,
    },
    OfflineMaps: {
      screen: OfflineMaps,
    },
    MyTripList: {
      screen: MyTripList,
    },
    MyTravel: {
      screen: MyTravel,
    },
    Home: {
      screen: HomeScreen,
    },
    MapPins: {
      screen: MapPins,
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
    EditMyTravel: {
      screen: EditMyTravel,
    },
    EditMyTravelDetails: {
      screen: EditMyTravelDetails,
    },
    AddMymaps: {
      screen: AddMymaps,
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
    OfflineMapView: {
      screen: OfflineMapView,
    },
    MapReviews: {
      screen: MapReviews,
    },
  }, {
  headerMode: 'none',
})

const MyMapShareListStack = createStackNavigator(
  {
    MyMapShareList: {
      screen: MyMapShareList,
    },
    MyReviews: {
      screen: MyReviews,
    },
    OfflineMaps: {
      screen: OfflineMaps,
    },
    MyTripList: {
      screen: MyTripList,
    },
    MyTravel: {
      screen: MyTravel,
    },
    Home: {
      screen: HomeScreen,
    },
    MapPins: {
      screen: MapPins,
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
    EditMyTravel: {
      screen: EditMyTravel,
    },
    EditMyTravelDetails: {
      screen: EditMyTravelDetails,
    },
    AddMymaps: {
      screen: AddMymaps,
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
    OfflineMapView: {
      screen: OfflineMapView,
    },
    MapReviews: {
      screen: MapReviews,
    },
  }, {
  headerMode: 'none',
})

const TabNavigation = createBottomTabNavigator(
  {
    'Home': HomeStack,
    'Travel': MyTravelStack,
    'Trip List': MyTripListStack,
    'Downloaded': OfflineMapsStack,
    'Reviews': MyReviewsStack,
    'Share': MyMapShareListStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialIcons;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused
            ? 'airplanemode-on'
            : 'airplanemode-off';
        } else if (routeName === 'Travel') {
          iconName = focused ? 'airplanemode-on'
            : 'airplanemode-off';
        } else if (routeName === 'Trip List') {
          iconName = focused ? 'airplanemode-on'
            : 'airplanemode-off';
        } else if (routeName === 'Downloaded') {
          iconName = focused ? 'airplanemode-on'
            : 'airplanemode-off';
        } else if (routeName === 'Reviews') {
          iconName = focused ? 'airplanemode-on'
            : 'airplanemode-off';
        } else if (routeName === 'Share') {
          iconName = focused ? 'airplanemode-on'
            : 'airplanemode-off';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  }
)

const App = createSwitchNavigator(
  {
    AuthLoading: {
      screen: DefaultScreen,
    },
    // App: {
    //   screen: DrawerStack,
    // },
    App: {
      screen: TabNavigation,
    },
    Auth: {
      screen: AuthStack,
    },
    GetStarted: {
      screen: GetStarted,
    },
    WalkThrough: {
      screen: WalkThrough,
    },
  },
  {
    initialRouteName: 'GetStarted',
  },
);

export default createAppContainer(App);
