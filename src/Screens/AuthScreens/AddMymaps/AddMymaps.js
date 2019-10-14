import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import styles from './AddMymaps.style';

class AddMymaps extends React.Component {
  static navigationOptions = {
    title: 'AddMymaps',
  };
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text>This is Edit AddMymaps</Text>
        </View>
      </Fragment>
    );
  }
}
export default AddMymaps;
