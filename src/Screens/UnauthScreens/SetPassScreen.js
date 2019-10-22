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

class SetPassScreen extends React.Component {
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
          source={require('../../Images/signup-bg.jpg')}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View style={styles.container}>
            <View style={styles.unauthContent}>
              <Text style={styles.logoText}>Discover - Inn</Text>
              <View style={styles.unauthForm}>
                <Text style={styles.formTitle}>Set Password</Text>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Password</Text>
                  <TextInput style={styles.formControl} />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Repeat Password</Text>
                  <TextInput style={styles.formControl} />
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => {}}>
                  <Text style={styles.buttonText}>Sign Up</Text>
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
export default SetPassScreen;
