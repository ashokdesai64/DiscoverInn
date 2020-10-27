import React, {Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './Unauthscreens.style';

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from './../../actions/authActions';
class SetPassScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      firstname: props.navigation.state.params.firstName,
      lastname: props.navigation.state.params.lastName,
      email: props.navigation.state.params.email,
      signingUp: false,
      fromDeepLink: props.navigation.state.params.deepLink,
    };
  }

  signUp() {
    const {password, confirmPassword, firstname, lastname, email} = this.state;
    if (!password) {
      alert('Please enter password.');
      return;
    }
    if (!confirmPassword) {
      alert('Please enter confirm password.');
      return;
    }
    if (password != confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    this.setState({signingUp: true});

    if (this.state.fromDeepLink) {
      this.props.authAction
        .setPassword({email, new_password:password, confirm_password:password})
        .then(d => {
          this.props.authAction.userLogin(email,new_password)
        })
        .catch(e => {
          alert(JSON.stringify(e));
          this.setState({signingUp: false});
        });
    } else {
      this.props.authAction
        .userSignup({email, password, firstname, lastname})
        .then(d => this.props.navigation.navigate('LoginScreen'))
        .catch(e => {
          alert(JSON.stringify(e));
          this.setState({signingUp: false});
        });
    }
  }

  render() {
    return (
      <Fragment>
        <ImageBackground
          source={require('../../Images/signup-bg-dark.jpg')}
          style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.unauthContent}>
              <Text style={styles.logoText}>Discover - Inn</Text>
              <View style={styles.unauthForm}>
                <Text style={styles.formTitle}>Set Password</Text>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Password</Text>
                  <TextInput
                    style={styles.formControl}
                    secureTextEntry={true}
                    onChangeText={password =>
                      this.setState({password: password.trim()})
                    }
                    autoCapitalize={'none'}
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Repeat Password</Text>
                  <TextInput
                    style={styles.formControl}
                    onChangeText={confirmPassword =>
                      this.setState({confirmPassword: confirmPassword.trim()})
                    }
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                    onSubmitEditing={() => this.signUp()}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => {
                    this.signUp();
                  }}>
                  {this.state.signingUp ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>{this.state.fromDeepLink ? 'Submit':'Sign Up'}</Text>
                  )}
                </TouchableOpacity>
              </View>

              <Text style={styles.fixedFooter}>
                Are you already registered?
                <Text
                  style={styles.toggleTextLink}
                  onPress={() => this.props.navigation.navigate('LoginScreen')}>
                  {' '}
                  SignIn
                </Text>
              </Text>
            </ScrollView>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetPassScreen);
