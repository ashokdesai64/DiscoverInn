import React, {Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './Unauthscreens.style';

const DEVICE_HEIGHT = Dimensions.get('window').height;

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  goToNextStep() {
    const {firstName, lastName, email} = this.state;

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!firstName) {
      alert('Please enter first name.');
      return;
    }
    if (firstName.length < 3) {
      alert('Name must contain at least 3 characters');
      return;
    }
    if (!lastName) {
      alert('Please enter last name.');
      return;
    }
    if (lastName.length < 3) {
      alert('Last name must contain at least 3 characters');
      return;
    }
    if (!email) {
      alert('Please enter email.');
      return;
    } else if (!re.test(email)) {
      alert('Please enter valid email.');
      return;
    }
    this.props.navigation.navigate('SetPassScreen', {
      firstName,
      lastName,
      email,
    });
  }

  render() {
    return (
      <Fragment>
        <ImageBackground
          source={require('../../Images/signup-bg-dark.jpg')}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <SafeAreaView
            style={{
              width: '100%',
              height: '100%',
            }}>
            <ScrollView
              style={[styles.container, styles.unauthContent]}
              keyboardShouldPersistTaps={'always'}
              contentContainerStyle={{height: DEVICE_HEIGHT - 80}}>
              <Text style={styles.logoText}>Discover - Inn</Text>
              <View style={styles.unauthForm}>
                <Text style={styles.formTitle}>Sign Up</Text>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>First Name</Text>
                  <TextInput
                    style={styles.formControl}
                    value={this.state.firstName}
                    onChangeText={firstName =>
                      this.setState({
                        firstName: firstName.replace(/[^A-Za-z]/gi, ''),
                      })
                    }
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Last Name</Text>
                  <TextInput
                    style={styles.formControl}
                    value={this.state.lastName}
                    onChangeText={lastName =>
                      this.setState({
                        lastName: lastName.replace(/[^A-Za-z]/gi, ''),
                      })
                    }
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Email</Text>
                  <TextInput
                    autoCapitalize={'none'}
                    style={styles.formControl}
                    onChangeText={email => this.setState({email: email.trim()})}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => this.goToNextStep()}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.fixedFooter}>
                Are you already registered?
                <Text
                  style={styles.toggleTextLink}
                  onPress={() => this.props.navigation.navigate('LoginScreen')}>
                  {' '}
                  Log In
                </Text>
              </Text>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </Fragment>
    );
  }
}
export default SignupScreen;
