import React, {Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import styles from './Unauthscreens.style';

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from './../../actions/authActions';

class ForgotPassScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      inProgress: false,
    };
  }

  forgotPassword() {
    if (!this.state.email) {
      alert('Please enter email.');
      return;
    }
    this.setState({inProgress: true});
    this.props.authAction
      .forgotPassword({email: this.state.email})
      .then(msg => {
        alert(msg);
        this.setState({inProgress: false});
      })
      .catch(e => {
        alert(e);
        this.setState({inProgress: false});
      });
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
          <SafeAreaView
            style={{
              width: '100%',
              height: '100%',
            }}>
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
              <View style={styles.container}>
                <View style={styles.unauthContent}>
                  <Text style={styles.logoText}>Discover - Inn</Text>
                  <View style={styles.unauthForm}>
                    <Text style={styles.formTitle}>Forgot Password</Text>
                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Email</Text>
                      <TextInput
                        style={styles.formControl}
                        value={this.state.email}
                        onChangeText={email => {
                          this.setState({email: email.trim()});
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonPrimary]}
                      onPress={() => this.forgotPassword()}>
                      {this.state.inProgress ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.buttonText}>Submit</Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.fixedFooter}>
                    Back to?
                    <Text
                      style={styles.toggleTextLink}
                      onPress={() =>
                        this.props.navigation.navigate('LoginScreen')
                      }>
                      {' '}
                      SignIn
                    </Text>
                  </Text>

                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassScreen);
