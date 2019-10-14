import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import styles from './Unauthscreens.style';

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile',
  };
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text>This is SignupScreen</Text>
        </View>
      </Fragment>
    );
  }
}
export default SignupScreen;
