import React, { component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
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
import FilterScreen from './Screens/FilterScreen/FilterScreen';
import SideMenu from './components/SideMenu/SideMenu';
import {Router, Scene, Stack, Drawer} from 'react-native-router-flux';
import MenuIcon from '../src/Images/hamburger.png';

const Routes = () => {
  return (
    <Router
      navigationBarStyle={{
        backgroundColor: '#F3F4F6',
        borderBottomWidth: 0,
        elevation: 0
      }}
    >
      <Stack key="root1" hideNavBar={true} titleStyle={{ alignSelf: 'center' }}>
        <Stack key="root" hideNavBar={true}>
          <Drawer
            key="drawer"
            contentComponent={SideMenu}
            drawerWidth={300}
            drawerImage={MenuIcon}
            panHandlers={null}
            hideNavBar
          >
            <Scene key="Home" component={HomeScreen} hideNavBar={true} />
            <Scene key="EditProfile" component={EditProfile} hideNavBar={true} />
            <Scene key="EditMymaps" component={EditMymaps} hideNavBar={true} />
            <Scene key="AddMymaps" component={AddMymaps} hideNavBar={true} />
            <Scene key="MyReviews" component={MyReviews} hideNavBar={true} />
            <Scene key="MyTripList" component={MyTripList} hideNavBar={true} />
            <Scene key="MyMapShareList" component={MyMapShareList} hideNavBar={true} />
            <Scene key="PinCategories" component={PinCategories} hideNavBar={true} />
            <Scene key="Sights" component={Sights} hideNavBar={true} />
            <Scene key="FilterScreen" component={FilterScreen} />
            <Scene
              contentComponent={SideMenu}
              key="UploadMap"
              component={UploadMap}
              hideNavBar={true}
            />
          </Drawer>
        </Stack>
        <Stack hideNavBar>
          <Scene key="LoginScreen" component={LoginScreen} hideNavBar={true} />
          <Scene key="SignupScreen" component={SignupScreen} hideNavBar={true} />
          <Scene key="ForgotPassScreen" component={ForgotPassScreen} hideNavBar={true} />
          <Scene key="SetPassScreen" component={SetPassScreen} hideNavBar={true} />
        </Stack>
      </Stack>
    </Router>
  );
};
export default Routes;
