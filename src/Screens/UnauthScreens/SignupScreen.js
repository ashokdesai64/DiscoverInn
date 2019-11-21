import React, {Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './Unauthscreens.style';

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: '',
    header: null,
    headerStyle: {
      backgroundColor: 'red',
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
          <SafeAreaView
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View style={styles.container}>
              <View style={styles.unauthContent}>
                <Text style={styles.logoText}>Discover - Inn</Text>
                <View style={styles.unauthForm}>
                  <Text style={styles.formTitle}>Sign Up</Text>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>First Name</Text>
                    <TextInput style={styles.formControl} />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Last Name</Text>
                    <TextInput style={styles.formControl} />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput style={styles.formControl} />
                  </View>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={() =>
                      this.props.navigation.navigate('SetPassScreen')
                    }>
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.unauthBottomText}>
                <Text style={styles.toggleText}>
                  Are you already registered?
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
          </SafeAreaView>
        </ImageBackground>
      </Fragment>
    );
  }
}
export default SignupScreen;
