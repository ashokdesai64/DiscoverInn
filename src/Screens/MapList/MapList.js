import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Item, Input, Button, Icon, Textarea} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './MapList.style';
import Carousel from 'react-native-snap-carousel';
import Header from './../../components/header/header';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';

const height = Dimensions.get('window').height;
class MapList extends React.Component {
  constructor(props) {
    super(props);
    console.log('props => ', props);
    this.state = {
      showTripList: false,
      shareModal: false,
      carouselItems: [
        {
          image: require('./../../Images/login-bg.jpg'),
          title: 'LonelyPlanet - Bordeaux',
          view: 4,
          rate: 2.5,
          star: 4,
          review: 2,
          description:
            "Seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama over......",
        },
        {
          image: require('./../../Images/signup-bg.png'),
          title: 'LonelyPlanet - Bankok',
          view: 6,
          rate: 4.5,
          star: 4,
          review: 7,
          description:
            "Seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama over......",
        },
        {
          image: require('./../../Images/signup-bg.png'),
          title: 'LonelyPlanet - New York',
          view: 10,
          rate: 3.5,
          star: 1,
          review: 3,
          description:
            "Seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama over......",
        },
      ],
    };
  }
  navigateToMap() {
    this.props.navigation.navigate('MapView');
  }
  _renderItem(item, index) {
    var Star = [];
    for (var i = 0; i < item.star; i++) {
      Star.push(
        <Feather
          style={styles.starIcon}
          name="star"
          size={15}
          color="#FFAF2C"
        />,
      );
    }
    return (
      <View style={[styles.mapSlideCard]}>
        <View style={styles.mapSlideCardHeader}>
          <Button
            style={styles.shareButton}
            onPress={() => this.setState({shareModal: true})}>
            <Feather style={styles.shareButtonText} name="share-2" />
          </Button>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({mapDetailsModal: true})}>
            <Image style={styles.mapSlideCardImg} source={item.image} />
            <View style={styles.mapSlideCardImg_overlay} />
          </TouchableOpacity>
          <Button style={styles.mapButton} onPress={() => this.navigateToMap()}>
            <Feather style={styles.shareButtonText} name="map" />
          </Button>
        </View>
        <View style={styles.mapSlideCardBody}>
          <View style={styles.mapSlideBadgeGroup}>
            <View style={[styles.badgeRed, styles.badge]}>
              <Text style={[styles.badgeText, styles.badgeRedText]}>
                {item.view} <Feather style={styles.badgeIcon} name="eye" />
              </Text>
            </View>
            <View style={[styles.badgeGreen, styles.badge]}>
              <Text style={[styles.badgeText, styles.badgeGreenText]}>
                {item.rate} <Feather style={styles.badgeIcon} name="star" />
              </Text>
            </View>
          </View>
          <Text style={styles.mapSlideCardTitle}>{item.title}</Text>
          <TouchableOpacity
            style={styles.rateList}
            onPress={() => this.setState({showReviewModal: true})}>
            {Star}
            <Text style={styles.rateListCount}>({item.review} Reviews)</Text>
          </TouchableOpacity>
          <View style={styles.mapPins}>
            <View style={[styles.singlePin, {backgroundColor: '#2F80ED'}]}>
              <Feather size={14} name="camera" color={'white'} />
            </View>
            <View style={[styles.singlePin, {backgroundColor: '#2F80ED'}]}>
              <Feather size={14} name="map-pin" color={'white'} />
            </View>
            <View style={[styles.singlePin, {backgroundColor: '#2F80ED'}]}>
              <Feather size={14} name="coffee" color={'white'} />
            </View>
            <View style={[styles.singlePin, {backgroundColor: '#2F80ED'}]}>
              <Feather size={14} name="music" color={'white'} />
            </View>
            <View
              style={[
                styles.singlePin,
                {backgroundColor: 'rgba(47, 128, 237, 0.1)'},
              ]}>
              <Feather size={14} name="smile" color={'#2F80ED'} />
            </View>
            <View
              style={[
                styles.singlePin,
                {backgroundColor: 'rgba(47, 128, 237, 0.1)'},
              ]}>
              <Feather size={14} name="speaker" color={'#2F80ED'} />
            </View>
            <View
              style={[
                styles.singlePin,
                {backgroundColor: 'rgba(47, 128, 237, 0.1)'},
              ]}>
              <Feather size={14} name="save" color={'#2F80ED'} />
            </View>
          </View>
          <View style={styles.mapDetaileGrid}>
            <View style={[styles.mapDetaileItem, styles.mapDetaileItemTop]}>
              <View
                style={[styles.mapDetaileChild, styles.mapDetaileChildLeft]}>
                <Text style={[styles.mapDetaileTitle]}>Travel Type</Text>
                <Text style={[styles.mapDetaileValue]}>Couple</Text>
              </View>
              <View
                style={[styles.mapDetaileChild, styles.mapDetaileChildRight]}>
                <Text style={[styles.mapDetaileTitle]}>Budget</Text>
                <Text style={[styles.mapDetaileValue]}>$$$$</Text>
              </View>
            </View>

            <View style={[styles.mapDetaileItem, styles.mapDetaileItemBottom]}>
              <View
                style={[styles.mapDetaileChild, styles.mapDetaileChildLeft]}>
                <Text style={[styles.mapDetaileTitle]}>Age</Text>
                <Text style={[styles.mapDetaileValue]}>18 To 25</Text>
              </View>
              <View
                style={[styles.mapDetaileChild, styles.mapDetaileChildRight]}>
                <Text style={[styles.mapDetaileTitle]}>Created</Text>
                <Text style={[styles.mapDetaileValue]}>29 Days</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.buttonReview, styles.buttonPrimary]}
              onPress={() => this.setState({showAddReviewModal: true})}>
              <Text style={styles.buttonText}>Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {width} = Dimensions.get('window');
    return (
      <Fragment>
        <Header
          showMenu={true}
          title={'Discover Inn'}
          {...this.props}
          style={{backgroundColor: '#F3F4F6'}}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.searchSection}>
            <View searchBar style={styles.searchbarCard}>
              <Item style={styles.searchbarInputBox}>
                <Feather style={styles.searchbarIcon} name="search" />
                <Input
                  style={styles.searchbarInput}
                  placeholder="Type in your next destination!"
                />
              </Item>
              <Button
                style={styles.searchbarCardButton}
                onPress={() => this.props.navigation.navigate('MapList')}>
                <Feather
                  style={styles.searchbarCardButtonIcon}
                  name="arrow-right"
                />
              </Button>
            </View>
            <View style={styles.searchSectionAction}>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  styles.iconButtonWhite,
                  styles.iconbuttonShort,
                ]}
                activeOpacity={0.8}>
                <Feather style={styles.iconButtonIcon} name="sliders" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  styles.iconButtonWhite,
                  styles.iconbuttonFilter,
                ]}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('FilterScreen')}>
                <Feather style={styles.iconButtonIcon} name="filter" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchresultCard}>
            <Text style={styles.searchresultText}>231 Results Found</Text>
            <TouchableOpacity
              style={styles.searchresultSelect}
              onPress={() => this.setState({showTripList: true})}>
              <Text style={styles.searchresultSelectText}>
                Select Trip List
              </Text>
              <Feather
                style={styles.searchresultSelectIcon}
                name="chevron-down"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.shareMapContant}>
            <Carousel
              data={this.state.carouselItems}
              sliderWidth={width}
              itemWidth={310}
              firstItem={1}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              renderItem={({item, index}) => this._renderItem(item, index)}
            />
          </View>
        </ScrollView>

        <Dialog
          rounded={false}
          visible={this.state.showTripList}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({showTripList: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 200, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({showTripList: false});
            return true;
          }}
          dialogStyle={{
            width: width - 40,
            height: 250,
            position: 'absolute',
            bottom: (height - 250) / 2,
            elevation: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 10,
          }}>
          <DialogContent style={{flexDirection: 'row', flex: 1}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>+ Create Trip</Text>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          rounded={false}
          visible={this.state.showAddReviewModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({showAddReviewModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({showAddReviewModal: false});
            return true;
          }}
          dialogStyle={[styles.customPopup]}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Add Review</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({showAddReviewModal: false})}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Rating</Text>
              <View style={{flexDirection: 'row'}}>
                <Feather
                  style={styles.starIcon}
                  name="star"
                  size={20}
                  color="#FFAF2C"
                />
                <Feather
                  style={styles.starIcon}
                  name="star"
                  size={20}
                  color="#FFAF2C"
                />
                <Feather
                  style={styles.starIcon}
                  name="star"
                  size={20}
                  color="#FFAF2C"
                />
                <Feather
                  style={styles.starIcon}
                  name="star"
                  size={20}
                  color="#FFAF2C"
                />
                <Feather
                  style={styles.starIcon}
                  name="star"
                  size={20}
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
              />
            </View>
            <View style={styles.customPopupFooter}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => this.setState({showAddReviewModal: false})}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          rounded={false}
          visible={this.state.shareModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({shareModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({shareModal: false});
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Share Your Map</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({shareModal: false})}>
                <Feather name={'x'} style={styles.buttonCloseIcon} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.formLabel}>Share With:</Text>
              <View style={styles.shareSocial}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonFacebook]}
                  onPress={() => this.setState({saveToListModal: false})}>
                  <Feather name={'facebook'} color={'white'} size={16} />
                  <Text style={[styles.buttonText]}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonTwitter]}
                  onPress={() => this.setState({saveToListModal: false})}>
                  <Feather name={'twitter'} color={'white'} size={16} />
                  <Text style={[styles.buttonText]}>Twitter</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.orDivider}>
              <Text style={styles.orDividerBorder}></Text>
              <Text style={styles.orDividerText}>OR</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Registered Users Name</Text>
              <TextInput
                style={styles.formControl}
                placeholder={'Enter Name'}
                placeholderTextColor={'#828894'}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Not Registered Users Email:</Text>
              <TextInput
                style={styles.formControl}
                placeholder={'Enter Email'}
                placeholderTextColor={'#828894'}
              />
            </View>
            <View style={styles.customPopupFooter}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => this.setState({shareModal: false})}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          rounded={false}
          visible={this.state.mapDetailsModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({mapDetailsModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({mapDetailsModal: false});
            return true;
          }}
          dialogStyle={[styles.customPopup]}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Map Details</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({mapDetailsModal: false})}>
                <Feather
                  style={styles.buttonCloseIcon}
                  name={'x'}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{backgroundColor: 'white'}}
              showsVerticalScrollIndicator={false}>
              <View style={(styles.mdPopupImgCard, {height: 180})}>
                <Image
                  resizeMode={'stretch'}
                  style={styles.mdPopupImages}
                  source={require('./../../Images/place.jpg')}
                />
              </View>

              <Text style={styles.mdPopupTitle}>Planet - Bangkok</Text>
              <View style={styles.mdPopupAuthor}>
                <Text style={styles.mdPopupAuthorLabel}>Traveller: </Text>
                <Text style={styles.mdPopupAuthorName}> Admin Discover</Text>
              </View>
              <Text style={styles.mdPopupDis}>
                This imposing early-20th-century Italianate stone mansion, set
                discreetly back from the street, belonged to Don José Lázaro
                Galdiano (1862–1947), a successful businessman and passionate
                patron of the arts. His astonishing private collection, which he
                bequeathed to the city upon his death, includes 13,000 works of
                art and objets d’art, a quarter of which are on show at any
                time. This imposing early-20th-century Italianate stone mansion,
                set discreetly back from the street, belonged to Don José Lázaro
                Galdiano (1862–1947), a successful businessman and passionate
                patron of the arts. His astonishing private collection, essful
                businessman and passionate patron of the arts. His astonishing
                private collection, which he bequeathed to the city upon his
                death, includes 13,000 works of art and objets d’art, a quarter
                of which are on show at any time. This imposing
                early-20th-century Italianate stone mansion, set discreetly back
                from the street, belonged to Don José Lázaro Galdiano
                (1862–1947), a successful businessman and passionate patron of
                the arts. His astonishing private collection,which he bequeathed
                to the city upon his death, includes 13,000 works of art and
                objets d’art, a quarter of which are on show at any time.
              </Text>
            </ScrollView>
          </DialogContent>
        </Dialog>

        <Dialog
          rounded={false}
          visible={this.state.showReviewModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({showReviewModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({showReviewModal: false});
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Map Review</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({showReviewModal: false})}>
                <Feather
                  style={styles.buttonCloseIcon}
                  name={'x'}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.reviewCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      height: 36,
                      width: 36,
                      borderRadius: 36,
                      marginRight: 10,
                    }}
                    source={require('./../../Images/place.jpg')}
                  />
                  <View >
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 12,
                      }}>
                      Meadow Rain Walker
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialIcons
                        style={styles.starIcon}
                        name="star"
                        size={15}
                        color="#FFAF2C"
                      />
                      <MaterialIcons
                        style={styles.starIcon}
                        name="star"
                        size={15}
                        color="#FFAF2C"
                      />
                      <MaterialIcons
                        style={styles.starIcon}
                        name="star"
                        size={15}
                        color="#FFAF2C"
                      />
                      <MaterialIcons
                        style={styles.starIcon}
                        name="star"
                        size={15}
                        color="#FFAF2C"
                      />
                      <MaterialIcons
                        style={styles.starIcon}
                        name="star"
                        size={15}
                        color="#FFAF2C"
                      />
                    </View>
                  </View>
                </View>

                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 12,
                    color: '#BDBDBD',
                  }}>
                  4 Weeks
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(242, 242, 242, 0.5)',
                  padding: 10,
                  marginTop: 15,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 12,
                    color: '#BDBDBD',
                  }}>
                  {' '}
                  The sun soaked in the sea and sands of Goa beckon a thirsty
                  traveler(pun intended) from around the world, including yours
                  truly! I have been to Goa at least four times but this was my
                  first visit after eight long years. Yes friends, the waitwas
                  excruciating for the sun, sand and the beer lover{' '}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: 'red',
                alignSelf: 'flex-end',
                marginTop: 10,
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              Report Abuse
            </Text>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
export default MapList;
