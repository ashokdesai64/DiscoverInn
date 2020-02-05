import React, { Fragment } from 'react';
import { View, Text, ScrollView, Switch, Dimensions, Image, ActivityIndicator } from 'react-native';
import { Item, Input, Button, Content, Accordion, CheckBox } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './MyTravel.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../components/header/header';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from '../../../actions/mapActions';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
class MyTravel extends React.Component {
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
      },
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
      },
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
      },
    ],
  };

  _updateSections = activeSections => {
    console.log('activeSections => ', activeSections);
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
    var commentIndex = this.props.myMaps.findIndex(function (c) {
      return c.title == item.title;
    });
    console.log("item => ",item)
    return (
      <View style={styles.accordionCardBody}>
        <View style={styles.myTravelCard}>
          <View style={styles.myTravelItem}>
            <Text style={styles.myTravelItemTitle}>Public</Text>
            <Switch
              style={[
                styles.myTravelItemSwitch,
                { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
              ]}
              value={item.map_type == 'public'}
              thumbColor={'#2F80ED'}
              onValueChange={value =>
                (this.props.myMaps[commentIndex].public = item.public
                  ? false
                  : true)
              }
            />
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
                this.props.navigation.navigate('MapView', { mapID: item.id,mapName:item.name });
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
              onPress={() => {
                this.props.navigation.navigate('EditMyTravel', { type: 'edit', mapData: item });
              }}>
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
                this.setState({ showDeleteModal: true, selectedMap: item });
              }}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  fetchMaps() {
    this.props.mapAction.fetchMyMaps({
      user_id: this.props.userData.id,
      search: this.state.search,
      page: this.pageNo,
    });
  }

  deleteMap() {
    this.setState({ deleteInProgrss: true })
    this.props.mapAction.removeMap({ map_id: this.state.selectedMap.id, user_id: this.props.userData.id }).then((data) => {
      this.setState({ deleteInProgrss: false, showDeleteModal: false })
    }).catch((err) => {
      this.setState({ deleteInProgrss: false, showDeleteModal: false }, () => {
        alert(err);
      })
    })
  }

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
              // onScroll={({ nativeEvent }) => {
              //   if (isCloseToBottom(nativeEvent)) {
              //     this.pageNo += 1;
              //     this.fetchMaps();
              //   }
              // }}
              scrollEventThrottle={400}>
              <View searchBar style={styles.searchbarCard}>
                <Item style={styles.searchbarInputBox}>
                  <Feather style={styles.searchbarIcon} name="search" />
                  <Input
                    style={styles.searchbarInput}
                    placeholder="Search your maps"
                    value={this.state.search}
                    onChangeText={search => this.setState({ search })}
                  />
                </Item>
                <Button
                  style={styles.searchbarCardButton}
                  onPress={() => this.fetchMaps()}>
                  <Feather
                    style={styles.searchbarCardButtonIcon}
                    name="arrow-right"
                  />
                </Button>
              </View>

              {this.props.myMaps && this.props.myMaps.length > 0 ? (
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
              ) : (
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        marginTop: 20,
                        fontSize: 16,
                        color: 'grey',
                        alignSelf: 'center',
                      },
                    ]}>
                    No Maps Found.
                </Text>
                )}
            </ScrollView>
          </View>
          <View style={styles.footerButton}>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary, styles.buttonNewMap]}
              onPress={() => {
                this.props.navigation.navigate('EditMyTravel', { type: 'add' });
              }}>
              <Text style={styles.buttonText}>Add New Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Dialog
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
        </Dialog> */}

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
                onPress={() => { this.setState({showDeleteModal:false}) }}>
                <Text style={[styles.buttonText, styles.buttonTextGray]}>
                  Decline
                </Text>
              </Button>
              <Button
                style={[styles.button, styles.buttonDanger, styles.buttonSave]}
                onPress={() => { this.deleteMap() }}>
                {
                  this.state.deleteInProgrss ?
                    <ActivityIndicator size={'small'} color={'white'} />
                    :
                    <Text style={styles.buttonText}>Yes Sure</Text>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(MyTravel);
