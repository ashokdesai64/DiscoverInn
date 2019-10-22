import React, {Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './AddMymaps.style';
import Icon from 'react-native-vector-icons/Feather';

class AddMymaps extends React.Component {
  static navigationOptions = {
    title: 'AddMymaps',
  };
  render() {
    return (
      <Fragment>
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.searchbarCard}></View>
        </ScrollView>
      </Fragment>
    );
  }
}
export default AddMymaps;
