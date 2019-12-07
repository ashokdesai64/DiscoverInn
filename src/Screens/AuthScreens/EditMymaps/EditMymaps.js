import React, { Fragment } from 'react';
import { View, Text, ScrollView, Switch, Dimensions, Image } from 'react-native';
import { Item, Input, Button, Content, Accordion, Picker } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './EditMymaps.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './../../../components/header/header';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class EditMymaps extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    selected: 'User Picture',
    dataArray: [
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
        travelType: 'Couple',
        budget: '$$$$',
        created: '29 Days',
        age: '18 To 25',
        cover: ['User Picture', 'Default'],
        selectedCover: 'User Picture',
      },
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
        travelType: 'Couple',
        budget: '$$$$',
        created: '29 Days',
        age: '18 To 25',
        cover: ['User Picture', 'Default'],
        selectedCover: 'User Picture',
      },
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
        travelType: 'Couple',
        budget: '$$$$',
        created: '29 Days',
        age: '18 To 25',
        cover: ['User Picture', 'Default'],
        selectedCover: 'User Picture',
      },
    ],
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  _renderHeader(item, expanded) {
    return (
      <View
        style={[
          styles.accordionCardHeader,
          expanded
            ? styles.accordionCardHeaderOpen
            : styles.accordionCardHeaderClose,
        ]}>
        <Feather style={styles.mapIcon} name="map" />
        <Text style={styles.accordionCardtitle}> {item.title}</Text>
        {expanded ? (
          <Feather style={styles.accordionCardHeaderIcon} name="chevron-up" />
        ) : (
            <Feather style={styles.accordionCardHeaderIcon} name="chevron-down" />
          )}
      </View>
    );
  }

  _renderContent = item => {
    var commentIndex = this.state.dataArray.findIndex(function (c) {
      return c.title == item.title;
    });
    return (
      <View style={styles.accordionCardBody}>
        <View style={styles.mymapsCard}>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Public</Text>
            <Switch
              style={styles.mymapsItemSwitch}
              value={item.public}
              thumbColor={'#2F80ED'}
              onValueChange={value =>
                (this.state.dataArray[commentIndex].public = item.public
                  ? false
                  : true)
              }
            />
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Travel Type</Text>
            <Text style={styles.mymapsItemValue}>{item.travelType}</Text>
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Budget</Text>
            <Text style={styles.mymapsItemValue}>{item.budget}</Text>
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Created</Text>
            <Text style={styles.mymapsItemValue}>{item.created}</Text>
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Age</Text>
            <Text style={styles.mymapsItemValue}>{item.age}</Text>
          </View>
          <View style={[styles.mymapsItem, styles.mymapsItemCover]}>
            <Text style={styles.mymapsItemTitle}>Cover</Text>
            <View style={styles.mymapsItemCoverValue}>
              {/* <Picker
                style={styles.mymapsItemDropdown}
                itemTextStyle={{ color: '#788ad2', }}
                textStyle={styles.dropdownText}
                mode="dropdown"
                iosIcon={
                  <Feather name="chevron-down" style={styles.dropdownArrow} />
                }
                selectedValue={''}
                onValueChange={value => {
                  var newstate = this.state.dataArray;
                  newstate[commentIndex].selectedCover = value;
                  this.setState({ dataArray: newstate });
                }}>
                  <Picker.Item label={'Changes Picture'} value={''} />
                {item.cover.map(title => (
                  <Picker.Item label={title} value={title} />
                ))}
              </Picker> */}

              <TouchableOpacity
                style={styles.editImage}
                onPress={() => {
                  this.setState({ showChangeCoverModal: true });
                }}>
                <Text
                  style={{
                    color: '#4F4F4F',
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 12,
                  }}>
                  Changes Picture
                </Text>
                <Feather
                  style={{ color: '#828282', fontSize: 12, marginRight: 10 }}
                  name="chevron-down"
                />
                <Feather
                  style={styles.editImageIcon}
                  name="edit-2"
                  color={'#2F80ED'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.mymapsAction}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => { this.props.navigation.navigate('MapView') }}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSuccess]}
            onPress={() => { this.props.navigation.navigate('AddMapDetail',{type:'edit'}) }}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonDanger]}
            onPress={() => { this.setState({ showDeleteModal: true }) }}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <Fragment style={styles.editMaps}>
        <Header
          showBack={true}
          title={'Edit MyMaps'}
          {...this.props}
          style={styles.bgTransfrent}
        />
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.pageContent}>
              <View searchBar style={styles.searchbarCard}>
                <Item style={styles.searchbarInputBox}>
                  <Feather style={styles.searchbarIcon} name="search" />
                  <Input
                    style={styles.searchbarInput}
                    placeholder="Search your maps"
                  />
                </Item>
                <Button style={styles.searchbarCardButton}>
                  <Feather
                    style={styles.searchbarCardButtonIcon}
                    name="arrow-right"
                  />
                </Button>
              </View>
              <Content style={styles.accordionCard}>
                <Accordion
                  style={styles.accordionCardContent}
                  dataArray={this.state.dataArray}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  onChange={this._updateSections}
                  contentStyle={{ marginBottom: 10 }}
                />
              </Content>
            </View>
          </View>
        </ScrollView>

        <Dialog
          rounded={false}
          visible={this.state.showChangeCoverModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ showChangeCoverModal: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 200, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ showChangeCoverModal: false });
            return true;
          }}
          dialogStyle={{
            width: DEVICE_WIDTH,
            height: 260,
            padding: 0,
            position: 'absolute',
            bottom: 0,
            elevation: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 10,
          }}>
          <DialogContent style={{ paddingTop: 20, paddingHorizontal: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#333333',
                }}>
                Upload Map Cover Image
              </Text>
              <TouchableOpacity
                style={{ width: 24, height: 24 }}
                onPress={() => this.setState({ showChangeCoverModal: false })}>
                <Feather name={'x'} style={{ color: '#BDBDBD', fontSize: 24 }} />
              </TouchableOpacity>
            </View>

            <View style={{ width: DEVICE_WIDTH - 40, height: 120 }}>
              <Image
                style={{
                  height: 120,
                  width: DEVICE_WIDTH - 40,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#2F80ED',
                }}
                source={require('./../../../Images/place.jpg')}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: 120,
                  width: DEVICE_WIDTH - 40,
                  backgroundColor: 'rgba(47, 128, 237, 0.1)',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <AntDesign name={'pluscircleo'} size={36} color={'#fff'} />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  Add Cover Image
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                marginVertical: 20,
                backgroundColor: '#2F80ED',
                justifyContent: 'center',
                alignItems: 'center',
                width: 160,
                alignSelf: 'center',
                borderRadius: 5,
              }}
              onPress={() => this.setState({ saveToListModal: false })}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: 'white',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </DialogContent>
        </Dialog>

        <Dialog
          rounded={false}
          visible={this.state.showDeleteModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ showDeleteModal: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ showDeleteModal: false });
            return true;
          }}
          dialogStyle={{width: DEVICE_WIDTH,
            height: 200,
            padding: 0,
            position: 'absolute',
            bottom: 0,
            elevation: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 10,}}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Delete Map</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({ showDeleteModal: false })}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center',fontFamily: 'Montserrat-Regular', }]}>Are you sure you want to remove this map?</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10
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
                  borderWidth: 1,
                  borderColor: '#BDBDBD',
                  borderRadius: 5
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
                  }}> Yes Sure
                </Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>

      </Fragment>
    );
  }
}
export default EditMymaps;
