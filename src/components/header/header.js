import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from './../../config/colors';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import styles from './header.style.js';
//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from './../../actions/authActions';
import ImageBlurLoading from '../ImageLoader';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authModal: false,
      headerTitle: props.title || '',
      editHeader: false,
    };
    this.popupDialog = null;
  }

  componentDidMount() {}

  goToSignup() {
    this.setState({authModal: false}, () => {
      setTimeout(() => {
        this.props.navigation.navigate('SignupScreen');
      }, 100);
    });
  }

  goToLogin() {
    this.setState({authModal: false}, () => {
      setTimeout(() => {
        this.props.navigation.navigate('LoginScreen');
      }, 100);
    });
  }

  signOut() {
    Alert.alert('Signout', 'Are you sure to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          this.props.authAction.userLogout();
          this.setState({authModal: false}, () => {
            setTimeout(() => {
              this.props.navigation.navigate('Auth');
            }, 100);
          });
        },
      },
    ]);
  }

  render() {
    const {userData} = this.props;
    let headerStyles = {...styles.headerContainer};
    if (this.props.style) {
      headerStyles = {...headerStyles, ...this.props.style};
    }
    let headerStylesInner = {...styles.headerContainerInner};
    if (this.props.style) {
      headerStylesInner = {...headerStylesInner, ...this.props.style};
    }
    let rightTextStyles = {...styles.headerRightText};
    if (this.props.rightTextStyle) {
      rightTextStyles = {...rightTextStyles, ...this.props.rightTextStyle};
    }
    if (this.props.absoluteHeader) {
      headerStyles = {
        ...headerStyles,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999,
      };
    }
    return (
      <SafeAreaView style={headerStyles}>
        <View style={headerStylesInner}>
          {this.props.showBack ? (
            <TouchableOpacity
              style={styles.headerLeftIcon}
              onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons
                name={'arrow-back'}
                size={25}
                style={styles.headerLeftIcons}
              />
            </TouchableOpacity>
          ) : this.props.showMenu ? (
            <TouchableOpacity
              style={[styles.headerLeftIcon, styles.headerLeftIconMenu]}
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon
                name={'bar-chart-2'}
                size={25}
                color={colors.themeColor}
                style={styles.menuIcon}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {this.props.headerEditable ? (
            this.state.editHeader ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={[
                    styles.formControl,
                    {borderWidth: 0, borderBottomWidth: 1, minWidth: 200},
                  ]}
                  placeholderTextColor={'#828894'}
                  onChangeText={headerTitle => this.setState({headerTitle})}
                  value={this.state.headerTitle}
                  placeholder={'Trip List Name'}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({editHeader: false}, () => {
                      this.props.onHeaderEditSubmit(this.state.headerTitle);
                    })
                  }>
                  <Feather
                    name="check"
                    style={{color: '#2F80ED', fontSize: 18, marginLeft: 15}}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => this.setState({editHeader: true})}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}>
                <Text
                  style={styles.editHeaderTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {this.state.headerTitle}
                </Text>
                <Feather
                  name={'edit'}
                  color={'#2F80ED'}
                  size={14}
                  style={{paddingLeft: 5}}
                />
              </TouchableOpacity>
            )
          ) : (
            <Text
              style={styles.headerTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {this.props.title}
            </Text>
          )}

          {this.props.rightEmpty ? (
            this.props.showRightButton ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.onRightPress && this.props.onRightPress()
                }
                style={styles.headerRightIcon}>
                <Text style={rightTextStyles}>
                  {this.props.rightButtonText}
                </Text>
              </TouchableOpacity>
            ) : this.props.customButton ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.onRightPress && this.props.onRightPress()
                }>
                {this.props.customIcon}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.setState({authModal: true})}>
                {userData && userData.image ? (
                  <ImageBlurLoading
                    withIndicator
                    style={[
                      styles.headerUserIcon,
                      {height: 30, width: 30, borderWidth: 0},
                    ]}
                    source={{uri: userData.image}}
                    thumbnailSource={{
                      uri:
                        'https://discover-inn.com/upload/cover/map-image.jpeg',
                    }}
                  />
                ) : (
                  <View style={styles.headerUserIcon}>
                    <Icon name={'user'} size={20} color={colors.themeColor} />
                  </View>
                )}
              </TouchableOpacity>
            )
          ) : (
            <View>
              <Text> </Text>
            </View>
          )}

          <Dialog
            rounded={false}
            visible={this.state.authModal}
            hasOverlay={true}
            ref={popupDialog => {
              this.popupDialog = popupDialog;
            }}
            animationDuration={1}
            onTouchOutside={() => {
              this.setState({authModal: false});
            }}
            dialogAnimation={
              new FadeAnimation({
                initialValue: 0, // optional
                animationDuration: 150, // optional
                useNativeDriver: true, // optional
              })
            }
            onHardwareBackPress={() => {
              this.setState({authModal: false});
              return true;
            }}
            dialogStyle={styles.customPopup}>
            <DialogContent style={styles.customPopupContent}>
              <View style={styles.loginDialogContentInner}>
                {userData && userData.id ? (
                  <TouchableOpacity
                    onPress={() => this.signOut()}
                    style={styles.loginDialogLink}>
                    <SimpleLineIcons
                      name={'login'}
                      color={'#828282'}
                      style={styles.loginDialogLinkIcon}
                      size={18}
                    />
                    <Text style={styles.loginDialogLinkText}>Sign Out</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => this.goToLogin()}
                      style={styles.loginDialogLink}>
                      <SimpleLineIcons
                        name={'login'}
                        color={'#828282'}
                        style={styles.loginDialogLinkIcon}
                        size={18}
                      />
                      <Text style={styles.loginDialogLinkText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.goToSignup()}
                      style={styles.loginDialogLink}>
                      <Icon
                        name={'user-plus'}
                        color={'#828282'}
                        style={styles.loginDialogLinkIcon}
                        size={18}
                      />
                      <Text style={styles.loginDialogLinkText}>Sign Up</Text>
                    </TouchableOpacity>
                  </>
                )}

                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {
                        authModal: false,
                      },
                      () => {
                        setTimeout(() => {
                          this.props.navigation.navigate('WalkThrough');
                        }, 500);
                      },
                    );
                  }}
                  style={[styles.loginDialogLink, styles.loginDialogLinkLast]}>
                  <AntDesign
                    name={'customerservice'}
                    color={'#828282'}
                    style={styles.loginDialogLinkIcon}
                    size={18}
                  />
                  <Text style={styles.loginDialogLinkText}>How It Works</Text>
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>
        </View>
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
)(Header);
