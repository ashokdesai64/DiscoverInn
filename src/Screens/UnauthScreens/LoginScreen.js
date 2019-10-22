import React, {Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './Unauthscreens.style';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
  };

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
          <View style={styles.container}>
            <View style={styles.unauthContent}>
              <Text style={styles.logoText}>Discover - Inn</Text>
              <View style={styles.unauthForm}>
                <Text style={styles.formTitle}>Sign in</Text>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Email</Text>
                  <TextInput style={styles.formControl} />
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
                  <TextInput style={styles.formControl} />
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => {}}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.unauthBottomText}>
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
          </View>
        </ImageBackground>
      </Fragment>
    );
  }
}
export default LoginScreen;
