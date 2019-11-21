import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './Screens/HomeScreen/HomeScreen';
import EditProfile from './Screens/AuthScreens/EditProfile/EditProfile';
import AddMymaps from './Screens/AuthScreens/AddMymaps/AddMymaps';
import EditMymaps from './Screens/AuthScreens/EditMymaps/EditMymaps';
import MyReviews from './Screens/AuthScreens/MyReviews/MyReviews';
import MyTripList from './Screens/AuthScreens/MyTripList/MyTripList';
import LoginScreen from './Screens/UnauthScreens/LoginScreen';
import SignupScreen from './Screens/UnauthScreens/SignupScreen';
import ForgotPassScreen from './Screens/UnauthScreens/ForgotPassScreen';
import SetPassScreen from './Screens/UnauthScreens/SetPassScreen';
import MyMapShareList from './Screens/ShareList/MyMapShareList';
import MapList from './Screens/MapList/MapList';
import MapView from './Screens/MapView/MapView';
import PinView from './Screens/PinView/PinView';
import UploadMap from './Screens/HomeScreen/UploadMap/UploadMap';
import PinCategories from './Screens/AuthScreens/PinCategories/PinCategories';
import Sights from './Screens/AuthScreens/Sights/Sights';
import FilterScreen from './Screens/FilterScreen/FilterScreen';
import SideMenu from './components/SideMenu/SideMenu';
import {Router, Scene, Stack, Drawer} from 'react-native-router-flux';
import MenuIcon from '../src/Images/hamburger.png';

const userStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    EditProfile: {
      screen: EditProfile,
    },
    EditMymaps: {
      screen: EditMymaps,
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
    PinCategories: {
      screen: PinCategories,
    },
    Sights: {
      screen: Sights,
    },
    FilterScreen: {
      screen: FilterScreen,
    },
    UploadMap: {
      screen: UploadMap,
    },
    PinView: {
      screen: PinView,
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

const authStack = createStackNavigator(
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
    headerMode: 'none',
  },
);

const DrawerStack = createDrawerNavigator(
  {
    userStack: {screen: userStack},
  },
  {
    gesturesEnabled: false,
    contentComponent: SideMenu,
  },
);

const App = createSwitchNavigator({
  DrawerStack: {
    screen: DrawerStack,
  },
  Auth: {
    screen: authStack,
  },
});

export default createAppContainer(App);
