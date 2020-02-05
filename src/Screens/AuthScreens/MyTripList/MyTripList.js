import React, { Fragment } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import styles from './MyTripList.style';
import Header from './../../../components/header/header';
import Feather from 'react-native-vector-icons/Feather';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';
import Spinner from './../../../components/Loader';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../../actions/mapActions';

class MyTripList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newTripListModal: false,
      tripName:''
    }
  }

  componentWillMount() {
    this.props.mapAction.fetchTripList();
  }

  deleteFavouriteList(tripID) {
    this.setState({ pinDeleteInProgress: true })
    this.props.mapAction.deleteFavouriteList({ user_id: this.props.userData.id, favorite_id: tripID }).then((data) => {
      this.setState({ pinDeleteInProgress: false })
    }).catch((err) => {
      this.setState({ pinDeleteInProgress: false })
      console.log("errr => ", err)
    })
  }

  createTripList(){
    this.setState({createListInProgress:true});
    this.props.mapAction.createFavouriteList({user_id:this.props.userData.id,name:this.state.tripName}).then((data)=>{
      this.setState({createListInProgress:false,newTripListModal:false});
      this.props.mapAction.fetchTripList();
    }).catch((err)=>{
      this.setState({createListInProgress:false});
    })
  }

  render() {
    return (
      <Fragment style={styles.homePage}>
        <Header
          showBack={true}
          title={'Trip List'}
          {...this.props}
          style={{ backgroundColor: '#F3F4F6' }}
          rightEmpty={true}
          showRightButton={false}
        />
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          <Spinner
            visible={this.state.pinDeleteInProgress}
            textContent={'Deleting favourite list...'}
            textStyle={{ color: '#fff' }}
          />
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: DEVICE_WIDTH - 30, paddingHorizontal: 10, marginBottom: 10 }}>
              <Text style={{ fontFamily: 'Montserrat-Regular' }}>My Trip List</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Feather name={'edit'} color={'#2F80ED'} size={14} />
                <TouchableOpacity onPress={() => this.setState({ newTripListModal: true })}>
                  <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, marginLeft: 5 }}>Create List</Text>
                </TouchableOpacity>
              </View>
            </View>

            {
              this.props.tripList && this.props.tripList.length > 0 ?
                this.props.tripList && this.props.tripList.map((trip, index) => {
                  return (
                    <TouchableOpacity activeOpacity={1} style={{ elevation: 5, flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                      <View style={[styles.mymapsAction, { width: DEVICE_WIDTH - 30, backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
                        <Text style={{ fontFamily: 'Montserrat-Regular' }}>{trip.name}</Text>
                        <View style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(47, 128, 237, 0.1)', borderRadius: 5 }}>
                          <Text>{trip.pins}</Text>
                        </View>
                      </View>

                      <View style={styles.myTravelAction}>
                        <View style={styles.myTravelActionLeft}>
                          <TouchableOpacity
                            style={[styles.buttonIcon, styles.buttonIconPrimary]}>
                            <Feather style={styles.buttonIconText} name="download-cloud" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.myTravelActionRight}>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonSm, styles.buttonPrimary]}
                            onPress={() => {
                              this.props.navigation.navigate('MapView', { mapID: item.id, mapName: item.name });
                            }}>
                            <Text style={styles.buttonText}>View</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.button,
                              styles.buttonSm,
                              styles.buttonSuccess,
                              { marginLeft: 5 },
                            ]}
                            onPress={() => this.props.navigation.navigate('TripPinList',{trip})} >
                            <Text style={styles.buttonText}>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.button,
                              styles.buttonSm,
                              styles.buttonDanger,
                              { marginLeft: 5 },
                            ]}
                            onPress={() => {
                              this.deleteFavouriteList(trip.id)
                            }}>
                            <Text style={styles.buttonText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })
                :
                <Text style={{ fontFamily: 'Montserrat-Regular', color: '#aaa', fontSize: 16, marginTop: 30 }}>No Trip list found</Text>
            }

          </View>
          <Dialog
            rounded={false}
            visible={this.state.newTripListModal}
            hasOverlay={true}
            animationDuration={1}
            onTouchOutside={() => {
              this.setState({ newTripListModal: false });
            }}
            dialogAnimation={
              new FadeAnimation({
                initialValue: 0, // optional
                animationDuration: 150, // optional
                useNativeDriver: true, // optional
              })
            }
            onHardwareBackPress={() => {
              this.setState({ newTripListModal: false });
              return true;
            }}
            dialogStyle={styles.customPopup}>
            <DialogContent style={styles.customPopupContent}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>Add New Trip List</Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => this.setState({ newTripListModal: false })}>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}> Name</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder={'Enter trip list name'}
                  placeholderTextColor={'#828894'}
                  onChangeText={(tripName)=> this.setState({tripName})}
                  value={this.state.tripName}
                />
              </View>

              <View style={styles.customPopupFooter}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => this.createTripList()}>
                  {
                    this.state.createListInProgress ?
                      <ActivityIndicator color={'white'} size={'small'} />
                      :
                      <Text style={styles.buttonText}>Create List</Text>
                  }
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>
        </ScrollView>
      </Fragment>
    );
  }
}



function mapStateToProps(state) {
  console.log(state.maps);
  return {
    userData: state.user.userData,
    tripList: state.maps.tripList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyTripList);