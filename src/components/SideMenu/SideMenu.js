import React, {Component} from 'react';
import {View, ScrollView, Text, Image, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './SideMenu.style';
import {Actions} from 'react-native-router-flux';

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from './../../actions/authActions';
import {TouchableOpacity} from 'react-native-gesture-handler';

class SideMenu extends Component {
  render() {
    return (
      <SafeAreaView style={styles.menuWrapper}>
        <ScrollView>
          <View style={styles.profileHeader}>
            <View style={styles.profileHeader_img}>
              <Image
                source={require('../../Images/profile.png')}
                style={styles.profileAvatar}
              />
            </View>
            <View style={styles.profileHeader_text}>
              <Text style={styles.profileHeader_name}>
                Welcome, Kylie Jenner!
              </Text>
              <Text style={styles.profileHeader_email}>
                kyliejenner@gmail.com
              </Text>
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
            </View>
          </View>

          <View style={styles.menuList}>
            <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="plus-circle"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() => this.props.navigation.navigate('UploadMap')}>
                <Text style={styles.menuList_LinkText}>Upload Map</Text>
              </Icon.Button>
            </View>
            <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="map-pin"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() => this.props.navigation.navigate('EditMymaps')}>
                <Text style={styles.menuList_LinkText}>Edit Mymaps</Text>
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
                onPress={() => this.props.navigation.navigate('MyTripList')}>
                <Text style={styles.menuList_LinkText}>My Trip List</Text>
              </Icon.Button>
            </View>
            <View style={styles.menuList_Item}>
              <Icon.Button
                style={styles.menuList_Link}
                color="#828282"
                name="plus-circle"
                size={12}
                paddingRight={0}
                backgroundColor="#ffffff"
                onPress={() => this.props.navigation.navigate('AddMymaps')}>
                <Text style={styles.menuList_LinkText}>Add MyMap</Text>
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
                onPress={() => this.props.navigation.navigate('MyReviews')}>
                <Text style={styles.menuList_LinkText}>My Reviews</Text>
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
                onPress={() =>
                  this.props.navigation.navigate('MyMapShareList')
                }>
                <Text style={styles.menuList_LinkText}>Shared Zone</Text>
              </Icon.Button>
            </View>
            <View style={styles.menuList_Item}>
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
            </View>
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
              onPress={() =>
                this.props.navigation.navigate('HowItWorksScreen')
              }>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
