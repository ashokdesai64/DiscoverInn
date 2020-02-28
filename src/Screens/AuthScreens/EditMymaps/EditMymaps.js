import React, { Fragment } from 'react';
import { View, Text, ScrollView, Switch, Dimensions, Image } from 'react-native';
import { Item, Input, Button, Content, Accordion, CheckBox } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './EditMymaps.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './../../../components/header/header';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../../actions/mapActions';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
class EditMymaps extends React.Component {
  constructor(props) {
    super(props);
  }
  pageNo = 1;
  state = {
    pageNo: 1,
    search: '',
    currentMap: {},
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

  componentDidMount() {
    this.fetchMaps();
  }

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
        <Text style={styles.accordionCardtitle}> {item.name}</Text>
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
              style={[
                styles.mymapsItemSwitch,
                { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
              ]}
              value={item.map_type == 'public'}
              // trackColor={{true: '#fff', false: '#fff'}}
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
            <Text style={styles.mymapsItemValue}>{item.travel_type}</Text>
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Budget</Text>
            <Text style={styles.mymapsItemValue}>{item.budget}</Text>
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Created</Text>
            <Text style={styles.mymapsItemValue}>{item.date_created}</Text>
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Age</Text>
            <Text style={styles.mymapsItemValue}>{item.age_at_travel}</Text>
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
                  this.setState({ currentMap: item, changeCoverModal: true });
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
                  style={{ color: '#828282', fontSize: 12 }}
                  name="chevron-down"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.mymapsAction}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSm, styles.buttonPrimary]}
            onPress={() => {
              this.props.navigation.navigate('MapView');
            }}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSm, styles.buttonSuccess]}
            onPress={() => {
              this.props.navigation.navigate('AddMapDetail', { type: 'edit' });
            }}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSm, styles.buttonDanger]}
            onPress={() => {
              this.setState({ showDeleteModal: true });
            }}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  fetchMaps() {
    this.props.mapAction.fetchMyMaps({ user_id: this.props.userData.id, search: this.state.search, page: this.pageNo });
  }

  render() {
    return (
      <Fragment>
        <Header
          showBack={true}
          title={'Edit MyMaps'}
          {...this.props}
          style={styles.bgTransfrent}
        />
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          // onScroll={({ nativeEvent }) => {
          //   if (isCloseToBottom(nativeEvent)) {
          //     this.pageNo += 1;
          //     this.fetchMaps();
          //   }
          // }}
          scrollEventThrottle={400}
        >
          <View style={styles.container}>
            <View style={styles.pageContent}>
              <View searchBar style={styles.searchbarCard}>
                <Item style={styles.searchbarInputBox}>
                  <Feather style={styles.searchbarIcon} name="search" />
                  <Input
                    style={styles.searchbarInput}
                    placeholder="Search your maps"
                    value={this.state.search}
                    onChangeText={(search) => this.setState({ search })}
                  />
                </Item>
                <Button style={styles.searchbarCardButton} onPress={() => this.fetchMaps()}>
                  <Feather
                    style={styles.searchbarCardButtonIcon}
                    name="arrow-right"
                  />
                </Button>
              </View>

              {
                this.props.myMaps && this.props.myMaps.length > 0 ?
                  <Content style={styles.accordionCard}>
                    <Accordion
                      style={styles.accordionCardContent}
                      dataArray={this.props.myMaps}
                      renderHeader={this._renderHeader}
                      renderContent={this._renderContent}
                      onChange={this._updateSections}
                      contentStyle={{ marginBottom: 10 }}
                    />
                  </Content>
                  :
                  <Text style={[styles.buttonText,{marginTop:20,fontSize:16,color:'grey',alignSelf:'center'}]}>No Maps Found.</Text>
              }
            </View>
          </View>
        </ScrollView>

        <Dialog
          rounded={false}
          visible={this.state.changeCoverModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ changeCoverModal: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ changeCoverModal: false });
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>
                Change A Picture
              </Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({ changeCoverModal: false })}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.changeCoverModalBody}>
              <Button
                style={[
                  styles.button,
                  styles.buttonPrimary,
                  styles.buttonUpload,
                ]}
                onPress={() => {
                  this.setState({ uploadCoverModal: true });
                }}>
                <Text style={styles.buttonText}>Upload Image</Text>
              </Button>
              <View style={styles.defaultImageCheck}>
                <CheckBox
                  checked={false}
                  color={'#BDBDBD'}
                  style={{ borderRadius: 3, marginRight: 20 }}
                />
                <Text style={styles.defaultImageCheckText}>Default Image</Text>
              </View>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          rounded={false}
          visible={this.state.uploadCoverModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ uploadCoverModal: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 200, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ uploadCoverModal: false });
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>
                Upload Map Cover Image
              </Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({ uploadCoverModal: false })}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>

            <View style={[styles.coverImageCard]}>
              <Image
                style={[styles.coverImageCardBox]}
                source={{ uri: this.state.currentMap.cover_image }}
              />
              <View style={[styles.addPlusIcon]}>
                <AntDesign name={'pluscircleo'} size={36} color={'#fff'} />
                <Text style={[styles.addPlusText]}>Add Cover Image</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonPrimary,
                styles.buttonLg,
                { marginTop: 25 },
              ]}
              onPress={() => this.setState({ saveToListModal: false })}>
              <Text style={styles.buttonText}>Upload Image</Text>
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
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Delete Map</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({ showDeleteModal: false })}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.deleteModalBody}>
              <Text style={styles.deleteModalBodyText}>
                Are you sure you want to remove this map?
              </Text>
            </View>

            <View style={[styles.footerButton]}>
              <Button
                style={[
                  styles.button,
                  styles.buttonOutline,
                  styles.buttonOutlineGray,
                  styles.buttonDecline,
                ]}
                onPress={() => { }}>
                <Text style={[styles.buttonText, styles.buttonTextGray]}>
                  Decline
                </Text>
              </Button>
              <Button
                style={[styles.button, styles.buttonDanger, styles.buttonSave]}
                onPress={() => { }}>
                <Text style={styles.buttonText}>Yes Sure</Text>
              </Button>
            </View>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
    categories: state.maps.categories,
    myMaps: state.maps.ownMaps,

  };
}
function mapDispatchToProps(dispatch) {
  return {
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMymaps);
