import React, { Fragment } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import { Item, Input, Button, Content, Accordion, CheckBox } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import styles from './EditMyTravel.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../components/header/header';
import moment from 'moment';

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../../actions/mapActions';


const DEVICE_WIDTH = Dimensions.get('window').width;

class EditMyTravel extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      showNameInput: false,
      mapName: params.mapData.name || '',
      coverImage: params.mapData.cover_image || false,

    }
  }
  pageNo = 1;

  updateMapName() {
    const { params } = this.props.navigation.state;
    let mapName = this.state.mapName;
    if (mapName != params.mapData.name) {
      //call api to change map
      this.props.mapAction.updateMapName({ user_id: this.props.userData.id, map_id: params.mapData.id, title: mapName }).then((data) => {
        this.setState({ showNameInput: false, })
      }).catch(err => {
        console.log("err => ", err)
      })
    }
  }

  render() {
    console.log("this.state => ",this.state.coverImage)
    const { params } = this.props.navigation.state;
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
                {
                  !this.state.showNameInput ?
                    <>
                      <Text style={[styles.myTravelNameText, { marginRight: 10, minWidth: 200, maxWidth: DEVICE_WIDTH - 100 }]}> {this.state.mapName} </Text>
                      <TouchableOpacity onPress={() => this.setState({ showNameInput: true })}>
                        <Feather name="edit" style={styles.myTravelNameIcon} />
                      </TouchableOpacity>
                    </>
                    :
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <TextInput
                        style={[styles.formControl, { borderWidth: 0, borderBottomWidth: 1, minWidth: 200, maxWidth: DEVICE_WIDTH - 100 }]}
                        placeholderTextColor={'#828894'}
                        onChangeText={mapName => this.setState({ mapName })}
                        value={this.state.mapName}
                      />
                      <TouchableOpacity onPress={() => this.updateMapName()}>
                        <Feather name="check" style={styles.myTravelNameIcon} />
                      </TouchableOpacity>
                    </View>
                }

              </View>
              <View style={styles.uploadCover}>

                {
                  this.state.coverImage ?
                    <TouchableOpacity onPress={() => this.openImagePicker()} style={[styles.uploadCoverCard]}>
                      <Image source={{uri:this.state.coverImage}} style={styles.coverImage} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.uploadCoverCard]}>
                      <AntDesign name={'pluscircleo'} size={36} color={'#2F80ED'} />
                      <Text style={[styles.uploadCoverCardText]}> Add Cover Image </Text>
                    </TouchableOpacity>
                }

              </View>
              <View style={styles.myTravelCard}>
                <View style={styles.myTravelItem}>
                  <Text style={styles.myTravelItemTitle}>Travel Type</Text>
                  <Text style={styles.myTravelItemValue}>{params.mapData.travel_type || '-'}</Text>
                </View>
                <View style={styles.myTravelItem}>
                  <Text style={styles.myTravelItemTitle}>Budget</Text>
                  <Text style={styles.myTravelItemValue}>{params.mapData.budget || '-'}</Text>
                </View>
                <View style={styles.myTravelItem}>
                  <Text style={styles.myTravelItemTitle}>Created</Text>
                  <Text style={styles.myTravelItemValue}>{moment(params.mapData.date_created).fromNow() || '-' }</Text>
                </View>
                <View style={[styles.myTravelItem, { borderBottomWidth: 0 }]}>
                  <Text style={styles.myTravelItemTitle}>Age</Text>
                  <Text style={styles.myTravelItemValue}>{params.mapData.age_at_travel || '-'}</Text>
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
              ]}
              onPress={() => {
                this.props.navigation.navigate('EditMyTravelDetails');
              }}>
              <Text style={styles.buttonTextGray}>Edit Map Details</Text>
            </Button>
            <Button
              style={[
                styles.button,
                styles.buttonPrimary,
                styles.buttonEditPin,
              ]}>
              <Text style={styles.buttonText}>Edit Pins</Text>
            </Button>
          </View>
        </View>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditMyTravel);
