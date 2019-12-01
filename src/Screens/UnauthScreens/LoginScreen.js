import React, { Fragment } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import styles from './Unauthscreens.style';

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from './../../actions/authActions';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.checkLogin(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('login screen props => ', nextProps);
    this.checkLogin(nextProps);
  }

  checkLogin(props) {
    if (props.userData && props.userData.id) {
      this.props.navigation.navigate('Home');
    }
  }

  login() {
    this.props.navigation.navigate('Home');
    return
    let { email, password } = this.state;
    if (!email) {
      return alert('Please enter email');
    }
    if (!password) {
      return alert('Please enter password');
    }
    this.props.authAction.userLogin(email, password);
  }

  render() {
    return (
      <Fragment>
        <ImageBackground
          source={require('../../Images/login-bg.jpg')}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Image
            style={styles.blackOverlay}
            source={require('./../../Images/login-overlay.png')}
            resizeMode="stretch"
          />
          <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
              <View style={styles.unauthContent}>
                <Text style={styles.logoText}>Discover - Inn</Text>
                <View style={styles.unauthForm}>
                  <Text style={styles.formTitle}>Sign in</Text>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput
                      style={styles.formControl}
                      onChangeText={email => {
                        this.setState({ email: email.trim() });
                      }}
                      autoCapitalize={'none'}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>
                      Password
                      <Text
                        style={styles.restoreLink}
                        onPress={() =>
                          this.props.navigation.navigate('ForgotPassScreen')
                        }>
                        {' '}
                        Forgot?
                      </Text>
                    </Text>
                    <TextInput
                      secureTextEntry={true}
                      style={styles.formControl}
                      onChangeText={password => {
                        this.setState({ password: password.trim() });
                      }}
                      autoCapitalize={'none'}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={() => {
                      this.login();
                    }}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.toggleText}>
                  New User?
                  <Text
                    style={styles.toggleTextLink}
                    onPress={() =>
                      this.props.navigation.navigate('SignupScreen')
                    }>
                    {' '}
                    SignUp
                  </Text>
                </Text>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </ImageBackground>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
