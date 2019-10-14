import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import styles from './MyReviews.style';

class MyReviews extends React.Component {
  static navigationOptions = {
    title: 'MyReviews',
  };
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <Text>This is Edit MyReviews</Text>
        </View>
      </Fragment>
    );
  }
}
export default MyReviews;
