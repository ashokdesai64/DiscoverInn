import React, {component} from 'react';
import {TouchableOpacity, Image} from 'react-native';
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
import UploadMap from './Screens/HomeScreen/UploadMap/UploadMap';
import PinCategories from './Screens/AuthScreens/PinCategories/PinCategories';
import Sights from './Screens/AuthScreens/Sights/Sights';
import SideMenu from './Components/SideMenu/SideMenu';
import {Router, Scene, Stack, Drawer} from 'react-native-router-flux';
import MenuIcon from '../src/Images/hamburger.png';

const Routes = () => {
  return (
    <Router
      navigationBarStyle={{
        backgroundColor: 'transfrent',
        borderBottomWidth: 0,
      }}>
      <Stack key="root" hideNavBar>
        <Drawer
          key="drawer"
          contentComponent={SideMenu}
          drawerWidth={300}
          drawerImage={MenuIcon}>
          <Scene key="Home" component={HomeScreen} hideNavBar={false} />
        </Drawer>
        <Scene key="EditProfile" component={EditProfile} />
        <Scene key="EditMymaps" component={EditMymaps} />
        <Scene key="AddMymaps" component={AddMymaps} />
        <Scene key="MyReviews" component={MyReviews} />
        <Scene key="MyTripList" component={MyTripList} />
        <Scene key="LoginScreen" component={LoginScreen} hideNavBar={true} />
        <Scene key="SignupScreen" component={SignupScreen} hideNavBar />
        <Scene key="ForgotPassScreen" component={ForgotPassScreen} hideNavBar />
        <Scene key="SetPassScreen" component={SetPassScreen} />
        <Scene key="MyMapShareList" component={MyMapShareList} />
        <Scene key="PinCategories" component={PinCategories} />
        <Scene key="Sights" component={Sights} />
        <Scene
          contentComponent={SideMenu}
          key="UploadMap"
          component={UploadMap}
        />
      </Stack>
    </Router>
  );
};
export default Routes;
