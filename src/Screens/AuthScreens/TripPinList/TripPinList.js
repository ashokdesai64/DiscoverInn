import React, { Fragment } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './TripPinList.style';
import Header from './../../../components/header/header';
import Feather from 'react-native-vector-icons/Feather';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class TripPinList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeletePinModal: false
    }
  }

  render() {
    return (
      <Fragment style={styles.homePage}>
        <Header
          showBack={true}
          title={'Trip Pin List'}
          {...this.props}
          style={{ backgroundColor: '#F3F4F6' }}
          rightEmpty={true}
          showRightButton={false}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, }}>

            {
              [1, 2, 3, 4, 5].map((e) => {
                return (
                  <View style={{ elevation: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginBottom: 20, borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, width: DEVICE_WIDTH - 30, }}>

                    <View style={[styles.mymapsAction, { paddingHorizontal: 10, width: DEVICE_WIDTH - 30, }]}>

                      <Text style={{ fontFamily: 'Montserrat-Regular' }}>Guindy Snake Park</Text>
                      <TouchableOpacity onPress={() => this.setState({ showDeletePinModal: true })} style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(235, 87, 87, 0.1)', borderRadius: 5 }}>
                        <Feather name={'trash-2'} color={'#EB5757'} size={14} />
                      </TouchableOpacity>
                    </View>

                    <Image
                      source={require('./../../../Images/map.png')}
                      style={{ height: 150, width: DEVICE_WIDTH - 50, borderRadius: 5, marginTop: 10 }}
                    />
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#828282', marginTop: 10 }}>This the place where hundreds of varieties of snakes are prserved</Text>
                  </View>
                )
              })
            }

          </View>
          <Dialog
            rounded={false}
            visible={this.state.showDeletePinModal}
            hasOverlay={true}
            animationDuration={1}
            onTouchOutside={() => {
              this.setState({ showDeletePinModal: false });
            }}
            dialogAnimation={
              new FadeAnimation({
                initialValue: 0, // optional
                animationDuration: 150, // optional
                useNativeDriver: true, // optional
              })
            }
            onHardwareBackPress={() => {
              this.setState({ showDeletePinModal: false });
              return true;
            }}
            dialogStyle={styles.customPopup}>
            <DialogContent style={styles.customPopupContent}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>Trip Pin Delete</Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => this.setState({ showDeletePinModal: false })}>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center' }]}>Are you sure you want to remove this pin ?</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20
                }}>

                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginTop: 5,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: (DEVICE_WIDTH / 2) - 30,
                    alignSelf: 'center',
                    borderRadius: 5,
                    borderWidth:1,
                    borderColor:'#BDBDBD',
                    borderRadius:5
                  }}
                  onPress={() => this.setState({ saveToListModal: false })}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#333',
                    }}>
                    Decline
                                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: (DEVICE_WIDTH / 2) - 30,
                    alignSelf: 'center',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#EB5757',
                    backgroundColor: '#EB5757'
                  }}
                  onPress={() => this.setState({ saveToListModal: false })}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: '#fff',
                    }}>
                    Yes Sure
                                </Text>
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>
        </ScrollView>
      </Fragment >
    );
  }
}
export default TripPinList;
