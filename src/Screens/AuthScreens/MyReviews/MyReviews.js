import React, { Fragment } from 'react';
import { View, TouchableOpacity, Text, Dimensions, Image, ScrollView } from 'react-native';
import styles from './MyReviews.style';
import Header from './../../../components/header/header';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';
import { Textarea, CheckBox } from 'native-base';
import moment from 'moment';
import ImageBlurLoading from './../../../components/ImageLoader'

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const DEVICE_WIDTH = Dimensions.get('window').width;
class MyReviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'your' //visitor
    }
  }

  render() {
    return (
      <Fragment>
        <Header
          showBack={true}
          rightEmpty={true}
          showRightButton={false}
          title={'Review'}
          {...this.props}
          style={{ backgroundColor: '#F3F4F6' }}
        />
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>

          <View style={{ marginBottom: 15, backgroundColor: 'white', flexDirection: 'row', width: DEVICE_WIDTH - 30, alignItems: 'center', borderRadius: 5 }}>
            <TouchableOpacity
              onPress={() => this.setState({ selectedTab: 'visitor' })}
              style={{
                width: (DEVICE_WIDTH - 30) / 2, height: 35, borderRadius: 5, backgroundColor: this.state.selectedTab == 'visitor' ? '#2F80ED' : 'transparent', justifyContent: 'center', alignItems: 'center'
              }}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 12, color: this.state.selectedTab == 'visitor' ? '#fff' : '#333' }}>Visitor Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ selectedTab: 'your' })}
              style={{ width: (DEVICE_WIDTH - 30) / 2, height: 35, borderRadius: 5, backgroundColor: this.state.selectedTab == 'your' ? '#2F80ED' : 'transparent', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 12, color: this.state.selectedTab == 'your' ? '#fff' : '#333' }}>Your Reviews</Text>
            </TouchableOpacity>
          </View>

          {
            this.state.selectedTab == 'visitor' ?
              this.props.visitorReviews && this.props.visitorReviews.map((review) => {
                return (
                  <View style={styles.reviewCard}>
                    <View style={styles.reviewCardHeader}>
                      <View style={styles.reviewCardHeaderLeft}>
                        <ImageBlurLoading
                          withIndicator
                          style={styles.reviewCardAvatar}
                          source={{ uri: review.image }}
                          thumbnailSource={{ uri: 'https://picsum.photos/id/1/50/50' }}
                        />
                        <View style={styles.reviewCardHeading}>
                          <Text style={styles.reviewCardTitle}>
                            {review.firstname} {review.lastname}
                          </Text>
                          <View style={styles.reviewCardRateList}>
                            {Array(parseInt(review.ratings))
                              .fill(1)
                              .map(d => {
                                return (
                                  <MaterialCommunityIcons
                                    style={styles.starIcon}
                                    name="star"
                                    size={15}
                                    color="#FFAF2C"
                                  />
                                );
                              })}
                            {Array(5 - parseInt(review.ratings))
                              .fill(1)
                              .map(d => {
                                return (
                                  <MaterialCommunityIcons
                                    style={styles.starIcon}
                                    name="star-outline"
                                    size={15}
                                    color="#FFAF2C"
                                  />
                                );
                              })}
                          </View>
                        </View>
                      </View>

                      <Text style={styles.reviewTime}>{moment(review.date_created).fromNow()}</Text>
                    </View>
                    <View style={styles.reviewCardBody}>
                      <Image
                        style={styles.reviewExclamationmark}
                        source={require('./../../../Images/exclamation.png')}
                      />
                      <Text style={styles.reviewCardText}>
                        {' '}
                        {review.review}{' '}
                      </Text>
                    </View>
                  </View>
                )
              })
              :
              this.props.myReviews && this.props.myReviews.map((review) => {
                return (
                  <View style={styles.reviewCard}>
                    <View style={styles.reviewCardHeader}>
                      <View style={styles.reviewCardHeaderLeft}>
                        <ImageBlurLoading
                          withIndicator
                          style={styles.reviewCardAvatar}
                          source={{ uri: review.image }}
                          thumbnailSource={{ uri: 'https://picsum.photos/id/1/50/50' }}
                        />
                        <View style={styles.reviewCardHeading}>
                          <Text style={styles.reviewCardTitle}>
                            {review.firstname} {review.lastname}
                          </Text>
                          <View style={styles.reviewCardRateList}>
                            {Array(parseInt(review.ratings))
                              .fill(1)
                              .map(d => {
                                return (
                                  <MaterialCommunityIcons
                                    style={styles.starIcon}
                                    name="star"
                                    size={15}
                                    color="#FFAF2C"
                                  />
                                );
                              })}
                            {Array(5 - parseInt(review.ratings))
                              .fill(1)
                              .map(d => {
                                return (
                                  <MaterialCommunityIcons
                                    style={styles.starIcon}
                                    name="star-outline"
                                    size={15}
                                    color="#FFAF2C"
                                  />
                                );
                              })}
                          </View>
                        </View>
                      </View>

                      <Text style={styles.reviewTime}>{moment(review.date_created).fromNow()}</Text>
                    </View>
                    <View style={styles.reviewCardBody}>
                      <Image
                        style={styles.reviewExclamationmark}
                        source={require('./../../../Images/exclamation.png')}
                      />
                      <Text style={styles.reviewCardText}>
                        {' '}
                        {review.review}{' '}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                      <TouchableOpacity onPress={() => this.setState({ showEditReviewModal: true })} style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(39, 174, 96, 0.1)', borderRadius: 5, marginRight: 10 }}>
                        <Feather name={'edit-2'} color={'#27AE60'} size={14} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.setState({ showDeleteReviewModal: true })} style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(235, 87, 87, 0.1)', borderRadius: 5 }}>
                        <Feather name={'trash-2'} color={'#EB5757'} size={14} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
          }

        </ScrollView>

        <Dialog
          rounded={false}
          visible={this.state.showEditReviewModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ showEditReviewModal: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ showEditReviewModal: false });
            return true;
          }}
          dialogStyle={[styles.customPopup]}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Update Your Review</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({ showEditReviewModal: false })}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Rating</Text>
              <View style={{ flexDirection: 'row' }}>
                <AntDesign
                  style={styles.starIcon}
                  name="star"
                  size={16}
                  color="#FFAF2C"
                />
                <AntDesign
                  style={styles.starIcon}
                  name="star"
                  size={16}
                  color="#FFAF2C"
                />
                <AntDesign
                  style={styles.starIcon}
                  name="star"
                  size={16}
                  color="#FFAF2C"
                />
                <AntDesign
                  style={styles.starIcon}
                  name="star"
                  size={16}
                  color="#FFAF2C"
                />
                <AntDesign
                  style={styles.starIcon}
                  name="star"
                  size={16}
                  color="#FFAF2C"
                />
              </View>
            </View>
            <View>
              <Text style={styles.formLabel}>Review:</Text>
              <Textarea
                placeholder={'Type your review'}
                placeholderTextColor={'#828894'}
                rowSpan={5}
                style={styles.formControlTextarea}
                defaultValue={`Ohh That's great map`}
              />
            </View>
            <View style={styles.customPopupFooter}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => this.setState({ showEditReviewModal: false })}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          rounded={false}
          visible={this.state.recentSorting}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ recentSorting: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 200, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ recentSorting: false });
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={[styles.customPopupHeader, { justifyContent: 'flex-end' }]}>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({ recentSorting: false })}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.selectList}>
              <View style={styles.selectListItem}>
                <CheckBox checked={true} color={'#2F80ED'} style={{ borderRadius: 10, marginRight: 20 }} />
                <Text style={styles.selectListText}>Manali</Text>
              </View>
              <View style={styles.selectListItem}>
                <CheckBox checked={false} color={'#2F80ED'} style={{ borderRadius: 10, marginRight: 20 }} />
                <Text style={styles.selectListText}>Leh Ladakh</Text>
              </View>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          rounded={false}
          visible={this.state.showDeleteReviewModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({ showDeleteReviewModal: false });
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({ showDeleteReviewModal: false });
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Delete Review</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({ showDeleteReviewModal: false })}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center' }]}>Are you sure you want to remove this review ?</Text>
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
                  }}>
                  Yes Sure
                                </Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>

      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  console.log("state.maps.myReviews => ", state.maps.myReviews)
  return {
    userData: state.user.userData,
    myReviews: state.maps.myReviews,
    visitorReviews: state.maps.visitorReviews,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // authAction: bindActionCreators(authActions, dispatch),
    // mapAction: bindActionCreators(mapActions, dispatch),
  };
}

export default connect(mapStateToProps, null)(MyReviews);
