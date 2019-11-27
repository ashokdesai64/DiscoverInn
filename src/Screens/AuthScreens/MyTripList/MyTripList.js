import React, { Fragment } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableOpacity, Image,TextInput } from 'react-native';
import styles from './MyTripList.style';
import Header from './../../../components/header/header';
import Feather from 'react-native-vector-icons/Feather';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class MyTripList extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      newTripListModal:false
    }
  }

  viewTripPinList(){

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
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: DEVICE_WIDTH - 30, paddingHorizontal: 10, marginBottom: 10 }}>
              <Text style={{ fontFamily: 'Montserrat-Regular' }}>My Trip List</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Feather name={'edit'} color={'#2F80ED'} size={14} />
                <TouchableOpacity onPress={()=>this.setState({newTripListModal:true})}>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, marginLeft: 5 }}>Create List</Text>
                </TouchableOpacity>
              </View>
            </View>

            {
              [1, 2, 3, 4, 5].map((e) => {
                return (
                  <TouchableOpacity activeOpacity={0.2} onPress={()=> this.props.navigation.navigate('TripPinList')} style={{ elevation: 5, flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                    <View style={[styles.mymapsAction, { width: DEVICE_WIDTH - 30, backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
                      <Text style={{ fontFamily: 'Montserrat-Regular' }}>Goa Trip</Text>
                      <View style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(47, 128, 237, 0.1)', borderRadius: 5 }}>
                        <Text>5</Text>
                      </View>
                    </View>
                    <View style={{ padding: 15, borderWidth: 1, borderColor: '#E2F0F0', width: DEVICE_WIDTH - 30, }}>
                      <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#333', marginBottom: 10 }}>Guindy Snake Park</Text>
                      <Image
                        source={require('./../../../Images/map.png')}
                        style={{ height: 150, width: DEVICE_WIDTH - 60, borderRadius: 5 }}
                      />

                      <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#828282', marginTop: 10 }}>This the place where hundreds of varieties of snakes are prserved</Text>
                    </View>
                    <View style={[styles.mymapsAction, { width: DEVICE_WIDTH - 30, backgroundColor: '#fff', padding: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                      <TouchableOpacity
                        style={[styles.button, styles.buttonPrimary]}
                        onPress={()=> this.props.navigation.navigate('TripPinList')}>
                        <Text style={styles.buttonText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, styles.buttonSuccess]}
                        onPress={() => { }}>
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, styles.buttonDanger]}
                        onPress={() => { }}>
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )
              })
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
                />
              </View>

              <View style={styles.customPopupFooter}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => this.setState({ newTripListModal: false })}>
                  <Text style={styles.buttonText}>Create List</Text>
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>
        </ScrollView>
      </Fragment>
    );
  }
}
export default MyTripList;
