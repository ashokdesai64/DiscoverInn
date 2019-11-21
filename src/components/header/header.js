import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuIcon from './../../Images/hamburger.png';
import colors from './../../config/colors';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';
import styles from './header.style.js';
const { width } = Dimensions.get('window');

//REDUX
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as authActions from './../../actions/authActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authModal: false,
    };
    this.popupDialog = null;
  }

  componentDidMount() {
  }

  goToSignup() {
    this.setState({ authModal: false }, () => {
      setTimeout(() => {
        this.props.navigation.navigate('SignupScreen');
      }, 100);
    });
  }

  goToLogin() {
    this.setState({ authModal: false }, () => {
      setTimeout(() => {
        this.props.navigation.navigate('LoginScreen');
      }, 100);
    });
  }

  render() {
    let headerStyles = { ...styles.headerContainer };
    if (this.props.style) {
      headerStyles = { ...headerStyles, ...this.props.style }
    }

    let rightTextStyles = { ...styles.headerRightText };
    if (this.props.rightTextStyle) {
      rightTextStyles = { ...rightTextStyles, ...this.props.rightTextStyle }
    }
    return (
      <SafeAreaView style={headerStyles}>
        {this.props.showBack ? (
          <TouchableOpacity
            style={styles.headerLeftIcon}
            onPress={() => this.props.navigation.goBack()}>
            <MaterialIcons name={'arrow-back'} size={25} />
          </TouchableOpacity>
        ) : this.props.showMenu ? (
          <TouchableOpacity
            style={[styles.headerLeftIcon, styles.headerLeftIconMenu]}
            onPress={() => this.props.navigation.openDrawer()}>
            <Image source={MenuIcon} style={styles.headerLeftIconImage} />
          </TouchableOpacity>
        ) : (
              <View></View>
            )}

        <Text style={styles.headerTitle}>{this.props.title}</Text>

        {
          this.props.rightEmpty ?
          this.props.showRightButton ? (
            <TouchableOpacity
              onPress={() => this.props.onRightPress && this.props.onRightPress()}
              style={styles.headerRightIcon}>
              <Text
                style={rightTextStyles}>
                {this.props.rightButtonText}
              </Text>
            </TouchableOpacity>
          ) : (
              <TouchableOpacity
                onPress={() => this.setState({ authModal: true })}
                style={styles.headerUserIcon}>
                <Icon name={'user'} size={20} color={colors.themeColor} />
              </TouchableOpacity>
            ) : <View><Text> </Text></View>
        }

        <Dialog
          rounded={false}
          visible={this.state.authModal}
          hasOverlay={true}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ authModal: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ authModal: false });
            return true;
          }}
          dialogStyle={{
            width: width,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            height: 220,
            position: 'absolute',
            bottom: -5,
            elevation: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10,
          }}>
          <DialogContent style={styles.loginDialogContent}>
            <View style={styles.loginDialogContentInner}>
              <TouchableOpacity
                onPress={() => this.goToLogin()}
                style={styles.loginDialogLink}>
                <SimpleLineIcons
                  name={'login'}
                  color={'#828282'}
                  style={styles.loginDialogLinkIcon}
                  size={25}
                />
                <Text style={styles.loginDialogLinkText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.goToSignup()}
                style={styles.loginDialogLink}>
                <Icon
                  name={'user-plus'}
                  color={'#828282'}
                  style={styles.loginDialogLinkIcon}
                  size={25}
                />
                <Text style={styles.loginDialogLinkText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => console.log('test')}
                style={styles.loginDialogLink}>
                <AntDesign
                  name={'customerservice'}
                  color={'#828282'}
                  style={styles.loginDialogLinkIcon}
                  size={25}
                />
                <Text style={styles.loginDialogLinkText}>How It Work</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
      </SafeAreaView>
    );
  }
}
export default Header;
// function mapStateToProps(state) {
//     return {
//         userData: state.user.userData,
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         authAction: bindActionCreators(authActions, dispatch),
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
