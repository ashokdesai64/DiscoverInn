import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './SideMenu.style';
import ImageBlurLoading from './../ImageLoader';
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from './../../actions/authActions';

class SideMenu extends Component {
  constructor(props) {
    super(props);
  }

  navigateTo(route) {
    if (!this.props.userData || !this.props.userData.id) {
      this.props.navigation.navigate('Auth');
    } else {
      this.props.navigation.navigate(route);
    }
  }

  render() {
    const { userData } = this.props;
    return (
      <SafeAreaView style={styles.menuWrapper}>
        <ScrollView>
          <View style={styles.profileHeader}>
            <View style={styles.profileHeader_img}>
              {userData && userData.image ? (
                <ImageBlurLoading
                  withIndicator
                  style={styles.profileAvatar}
                  source={{ uri: userData.image }}
                  thumbnailSource={{
                    uri: 'https://discover-inn.com/upload/cover/map-image.jpeg',
                  }}
                />
              ) : (
                <View style={styles.guestAvatar}>
                  <Icon name={'user'} size={30} color={'white'} />
                </View>
              )}
            </View>
            <View style={styles.profileHeader_text}>
              <Text style={styles.profileHeader_name}>
                Welcome,{' '}
                {userData && userData.id
                  ? (userData.firstname || '') + ' ' + (userData.lastname || '')
                  : 'Guest'}
                !
              </Text>
              {userData && userData.email && (
                <Text style={styles.profileHeader_email}>{userData.email}</Text>
              )}
              {userData && userData.id && (
                <Icon.Button
                  style={styles.profileHeader_button}
                  name="edit-2"
                  size={12}
                  paddingLeft={0}
                  backgroundColor="#ffffff"
                  color="#EB5757"
                  onPress={() => this.props.navigation.navigate('EditProfile')}>
                  <Text style={styles.profileHeader_buttonText}>
                    Edit Profile
                  </Text>
                </Icon.Button>
              )}
            </View>
          </View>

          <View style={styles.menuList}>
            {/* <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="plus-circle"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() => this.props.navigation.navigate('AddMy')}>
                <Text style={styles.menuList_LinkText}>Edit My Maps</Text>
              </Icon.Button>
            </View> */}
            <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="plus-circle"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() => this.navigateTo('MyTravel')}>
                <Text style={styles.menuList_LinkText}>My Travel</Text>
              </Icon.Button>
            </View>
            <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="heart"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() => this.navigateTo('MyTripList')}>
                <Text style={styles.menuList_LinkText}>My Trip List</Text>
              </Icon.Button>
            </View>
            <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="download-cloud"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() => this.navigateTo('OfflineMaps')}>
                <Text style={styles.menuList_LinkText}>Downloaded Maps</Text>
              </Icon.Button>
            </View>
            <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="star"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() => this.navigateTo('MyReviews')}>
                <Text style={styles.menuList_LinkText}>Reviews</Text>
              </Icon.Button>
            </View>
            <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="share-2"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() => this.navigateTo('MyMapShareList')}>
                <Text style={styles.menuList_LinkText}>Shared Maps</Text>
              </Icon.Button>
            </View>
            {/* <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="key"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() =>
                  this.props.navigation.navigate('ChangePassword')
                }>
                <Text style={styles.menuList_LinkText}>Change Password</Text>
              </Icon.Button>
            </View> */}
            {/* 
            {this.props.userData && this.props.userData.id ? (
              <View style={styles.menuList_Item}>
                <Icon.Button
                  style={styles.menuList_Link}
                  color="#828282"
                  name="share-2"
                  size={12}
                  paddingRight={0}
                  backgroundColor="#ffffff"
                  onPress={() => this.props.authAction.userLogout()}>
                  <Text style={styles.menuList_LinkText}>Logout</Text>
                </Icon.Button>
              </View>
            ) : (
                <View style={styles.menuList_Item}>
                  <Icon.Button
                    style={styles.menuList_Link}
                    color="#828282"
                    name="share-2"
                    size={12}
                    paddingRight={0}
                    backgroundColor="#ffffff"
                    onPress={() =>
                      this.props.navigation.navigate('LoginScreen')
                    }>
                    <Text style={styles.menuList_LinkText}>Login</Text>
                  </Icon.Button>
                </View>
              )}

            <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="share-2"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() =>
                  this.props.navigation.navigate('SignupScreen')
                }>
                <Text style={styles.menuList_LinkText}>Signup</Text>
              </Icon.Button>
            </View> */}
          </View>
          <View style={styles.staticMenu}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AboutUsScreen')}>
              <Text style={styles.staticMenu_Link}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('TermsConditionScreen')
              }>
              <Text style={styles.staticMenu_Link}>Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PrivacyPolicyScreen')
              }>
              <Text style={styles.staticMenu_Link}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('WalkThrough')}>
              <Text style={styles.staticMenu_Link}>How It Works</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);
