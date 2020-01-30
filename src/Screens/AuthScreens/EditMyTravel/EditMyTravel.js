import React, { Fragment } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import { Item, Input, Button, Content, Accordion, CheckBox } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import styles from './EditMyTravel.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../components/header/header';
import moment from 'moment';

import ImagePicker from 'react-native-image-picker';
import Spinner from './../../../components/Loader';
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
      mapName: params.type == 'edit' ? (params.mapData.name || '') : '',
      coverImage: params.type == 'edit' ? (params.mapData.cover_image || false) : false,
      addCoverInProgress: false,
      mapData: params.mapData || {}
    }
  }

  updateMapName() {
    const { params } = this.props.navigation.state;

    let mapName = this.state.mapName;
    if (!mapName || !mapName.trim()) return alert("Please enter map name");

    if (params.type == 'edit') {
      //call api to change map
      this.props.mapAction.updateMapName({ user_id: this.props.userData.id, map_id: params.mapData.id, title: mapName }).then((data) => {
        this.setState({ showNameInput: false })
      }).catch(err => {
        console.log("err => ", err)
      })
    } else {
      this.props.mapAction.addMyMap({ user_id: this.props.userData.id, title: mapName }).then((data) => {
        this.setState({ showNameInput: false, mapData: { id: data.mapID, name: mapName } })
      }).catch(err => {
        console.log("err => ", err)
      })
    }

  }

  openImagePicker() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Gallery' }],
      permissionDenied: {
        title: 'Give permission',
        text: 'Text',
        reTryTitle: 'reTryTitle',
        okTitle: 'okTitle',
      },
      quality: 0.3
    };
    if (!this.state.mapData.id) return alert("Please enter map name first...");

    ImagePicker.launchImageLibrary(options, response => {

      this.setState({ addCoverInProgress: true });
      let fileObj = {
        uri: response.uri,
        name: response.fileName,
        type: response.type
      }
      this.props.mapAction.updateCoverImage({ user_id: this.props.userData.id, map_id: this.state.mapData.id, cover_image: fileObj }).then((data) => {
        this.setState({ addCoverInProgress: false, mapData: { ...this.state.mapData, cover_image: response.uri }, coverImage: response.uri });
      }).catch((err) => {
        this.setState({ addCoverInProgress: false });
        alert("Couldn't update image, Please try again.")
        console.log("err => ", err)
      })
    });
  }

  render() {
    const { params } = this.props.navigation.state;

    let travel_type = params.type == 'edit' ? params.mapData.travel_type : '-'
    let budget_limit = params.type == 'edit' ? params.mapData.budget_limit : '-'
    let date_created = params.type == 'edit' ? moment(params.mapData.date_created).fromNow() : '-'
    let age_at_travel = params.type == 'edit' ? params.mapData.age_at_travel : '-'
    let mapID = params.type == 'edit' ? params.mapData.id : this.state.mapData.id;

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
        <Spinner
          visible={this.state.addCoverInProgress}
          textContent={'Updating Cover Image...'}
          textStyle={{ color: '#fff' }}
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
                      <Text style={[styles.myTravelNameText, { color: params.type == 'add' ? '#828894' : '#000', marginRight: 10, minWidth: 200, maxWidth: DEVICE_WIDTH - 100 }]}>
                        {this.state.mapName || (params.type == 'edit' ? this.state.mapName : 'Add Map Title')}
                      </Text>
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
                        placeholder={'Add Map Name'}
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
                      <Image source={{ uri: this.state.coverImage }} style={styles.coverImage} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.openImagePicker()} style={[styles.uploadCoverCard]}>
                      <AntDesign name={'pluscircleo'} size={36} color={'#2F80ED'} />
                      <Text style={[styles.uploadCoverCardText]}> Add Cover Image </Text>
                    </TouchableOpacity>
                }

              </View>
              <View style={styles.myTravelCard}>
                <View style={styles.myTravelItem}>
                  <Text style={styles.myTravelItemTitle}>Travel Type</Text>
                  <Text style={styles.myTravelItemValue}>{travel_type || '-'}</Text>
                </View>
                <View style={styles.myTravelItem}>
                  <Text style={styles.myTravelItemTitle}>Budget</Text>
                  <Text style={styles.myTravelItemValue}>{budget_limit || '-'}</Text>
                </View>
                <View style={styles.myTravelItem}>
                  <Text style={styles.myTravelItemTitle}>Created</Text>
                  <Text style={styles.myTravelItemValue}>{date_created || '-'}</Text>
                </View>
                <View style={[styles.myTravelItem, { borderBottomWidth: 0 }]}>
                  <Text style={styles.myTravelItemTitle}>Age</Text>
                  <Text style={styles.myTravelItemValue}>{age_at_travel || '-'}</Text>
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
                this.props.navigation.navigate('EditMyTravelDetails', {
                  mapData: { ...this.state.mapData, name: this.state.mapName },
                  type: params.type
                });
              }}>
              <Text style={styles.buttonTextGray}>Edit Map Details</Text>
            </Button>
            <Button
              style={[
                styles.button,
                styles.buttonPrimary,
                styles.buttonEditPin,
              ]}
              onPress={()=> this.props.navigation.navigate('MapPins',{mapID,mapName:this.state.mapName})}
            >
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
