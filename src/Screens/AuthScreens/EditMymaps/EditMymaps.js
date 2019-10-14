import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import styles from './EditMymaps.style';

class EditMymaps extends React.Component {
  static navigationOptions = {
    title: 'EditMymaps',
  };
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text>This is Edit EditMymaps</Text>
        </View>
      </Fragment>
    );
  }
}
export default EditMymaps;
