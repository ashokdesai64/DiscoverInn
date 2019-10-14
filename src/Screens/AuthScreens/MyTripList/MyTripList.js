import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import styles from './MyTripList.style';

class MyTripList extends React.Component {
  static navigationOptions = {
    title: 'MyTripList',
  };
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text>This is Edit MyTripList</Text>
        </View>
      </Fragment>
    );
  }
}
export default MyTripList;
