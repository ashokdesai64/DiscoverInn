import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './SideMenu.style';
import colors from './../../config/colors';
//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from './../../actions/authActions';

class SideMenu extends Component {
  render() {
    const {userData} = this.props;
    return (
      <SafeAreaView style={styles.menuWrapper}>
        <ScrollView>
          <View style={styles.profileHeader}>
            <View style={styles.profileHeader_img}>
              {userData && userData.image ? (
                <Image
                  source={{uri: userData.image}}
                  style={styles.profileAvatar}
                />
              ) : (
                <View style={styles.profileAvatar}>
                  <Icon name={'user'} size={20} color={colors.themeColor} />
                </View>
              )}
            </View>
            <View style={styles.profileHeader_text}>
              <Text style={styles.profileHeader_name}>
                Welcome,{' '}
                {userData
                  ? (userData.firstname || '') + ' ' + (userData.lastname || '')
                  : 'Guest'}
                !
              </Text>
              {userData && userData.email && (
                <Text style={styles.profileHeader_email}>{userData.email}</Text>
              )}
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
                onPress={() => this.props.navigation.navigate('AddMy')}>
                <Text style={styles.menuList_LinkText}>Edit My Maps</Text>
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
                onPress={() => this.props.navigation.navigate('MyTravel')}>
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
                onPress={() => this.props.navigation.navigate('MyTripList')}>
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
                onPress={() => this.props.navigation.navigate('AddMymaps')}>
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
                onPress={() => this.props.navigation.navigate('MyReviews')}>
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
                onPress={() =>
                  this.props.navigation.navigate('MyMapShareList')
                }>
                <Text style={styles.menuList_LinkText}>Shared Maps</Text>
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
