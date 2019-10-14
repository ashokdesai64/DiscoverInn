import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import styles from './Unauthscreens.style';

class SetPassScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile',
  };
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text>This is SetPassScreen</Text>
        </View>
      </Fragment>
    );
  }
}
export default SetPassScreen;
