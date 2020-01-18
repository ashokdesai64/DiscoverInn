import React, {Fragment} from 'react';
import {View, Text, ScrollView, Switch, Dimensions, Image} from 'react-native';
import {Item, Input, Button, Content, Accordion, CheckBox} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import styles from './EditMyTravel.style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../../components/header/header';

//REDUX
import {connect} from 'react-redux';

class EditMyTravel extends React.Component {
  constructor(props) {
    super(props);
  }
  pageNo = 1;

  render() {
    return (
      <Fragment>
        <Header
          showBack={true}
          title={'My Travel'}
          {...this.props}
          style={styles.bgTransfrent}
          rightEmpty={true}
          showRightButton={false}
        />
        <View style={styles.container}>
          <View style={styles.pageContent}>
            <ScrollView
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={400}>
              <View style={styles.myTravelName}>
                <Text style={styles.myTravelNameText}>
                  LonelyPlanet - Bordeaux
                </Text>
                <TouchableOpacity>
                  <Feather name="edit" style={styles.myTravelNameIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.uploadCover}>
                <TouchableOpacity style={[styles.uploadCoverCard]}>
                  <AntDesign name={'pluscircleo'} size={36} color={'#2F80ED'} />
                  <Text style={[styles.uploadCoverCardText]}>
                    Add Cover Image
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.myTravelCard}>
                <View style={styles.myTravelItem}>
                  <Text style={styles.myTravelItemTitle}>Travel Type</Text>
                  <Text style={styles.myTravelItemValue}>Couple</Text>
                </View>
                <View style={styles.myTravelItem}>
                  <Text style={styles.myTravelItemTitle}>Budget</Text>
                  <Text style={styles.myTravelItemValue}>$$$$</Text>
                </View>
                <View style={styles.myTravelItem}>
                  <Text style={styles.myTravelItemTitle}>Created</Text>
                  <Text style={styles.myTravelItemValue}>29 Days</Text>
                </View>
                <View style={[styles.myTravelItem, {borderBottomWidth: 0}]}>
                  <Text style={styles.myTravelItemTitle}>Age</Text>
                  <Text style={styles.myTravelItemValue}>18 To 25</Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.footerButton}>
            <Button
              style={[
                styles.button,
                styles.buttonOutline,
                styles.buttonEditMapDetail,
              ]}>
              <Text style={styles.buttonTextGray}>Edit Map Details</Text>
            </Button>
            <Button
              style={[
                styles.button,
                styles.buttonPrimary,
                styles.buttonEditPin,
              ]}>
              <Text style={styles.buttonText}>Edit Maps</Text>
            </Button>
          </View>
        </View>
      </Fragment>
    );
  }
}

export default connect()(EditMyTravel);
