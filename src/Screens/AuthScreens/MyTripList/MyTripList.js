import React, {Fragment} from 'react';
import {View, ScrollView} from 'react-native';
import styles from './MyTripList.style';
import Header from './../../../components/header/header';

class MyTripList extends React.Component {
  static navigationOptions = {
    title: 'MyTripList',
  };
  render() {
    return (
      <Fragment style={styles.homePage}>
        <Header
          showBack={true}
          title={'MyTrip List'}
          {...this.props}
          style={{backgroundColor: '#F3F4F6'}}
        />
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}></View>
        </ScrollView>
      </Fragment>
    );
  }
}
export default MyTripList;
