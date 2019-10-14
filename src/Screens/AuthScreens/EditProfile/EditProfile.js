import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import styles from './EditProfile.style';

class EditProfile extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile',
  };
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text>This is Edit Profile Page</Text>
        </View>
      </Fragment>
    );
  }
}
export default EditProfile;
