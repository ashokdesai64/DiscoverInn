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

class ForgotPassScreen extends React.Component {
  static navigationOptions = {
    header:null,
    title: '',
    headerStyle: {
      backgroundColor: 'transfrent',
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
                <Text style={styles.formTitle}>Forgot Password</Text>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Email</Text>
                  <TextInput style={styles.formControl} />
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => {}}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.unauthBottomText}>
              <Text style={styles.toggleText}>
                Back to?
                <Text
                  style={styles.toggleTextLink}
                  onPress={() => this.props.navigation.navigate('LoginScreen')}>
                  {' '}
                  SignIn
                </Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Fragment>
    );
  }
}
export default ForgotPassScreen;
