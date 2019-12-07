import React, {Fragment} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Dialog, {FadeAnimation, DialogContent} from 'react-native-popup-dialog';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class PinView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveToListModal: false,
      activeSlide: 0,
      carouselItems: [
        {
          title: 'Lonely Planet - Bangkok',
        },
        {
          title: 'Lonely Planet - Franch',
        },
        {
          title: 'Lonely Planet - Maxico',
        },
        {
          title: 'Lonely Planet - India',
        },
      ],
    };
  }
  _renderItemCate = ({item, index}) => {
    return (
      <Image
        source={require('./../../Images/signup-bg-dark.jpg')}
        style={styles.cateSlideCardIcon}
      />
    );
  };

  render() {
    return (
      <SafeAreaView>
        <View style={[styles.pinHeader]}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather name={'arrow-left'} size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({saveToListModal: true})}>
            <Feather name={'heart'} size={24} color={'white'} />
          </TouchableOpacity>
        </View>
        <Carousel
          data={this.state.carouselItems}
          sliderWidth={DEVICE_WIDTH}
          itemWidth={DEVICE_WIDTH}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          containerCustomStyle={{
            height: 400,
            width: DEVICE_WIDTH,
            top: 0,
            position: 'absolute',
          }}
          firstItem={0}
          renderItem={this._renderItemCate}
          onSnapToItem={index => this.setState({activeSlide: index})}
        />

        <Pagination
          dotsLength={this.state.carouselItems.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{
            position: 'absolute',
            top: 250,
            left: -5,
            zIndex: 999999,
          }}
          dotStyle={{
            width: 15,
            height: 3,
            backgroundColor: '#2F80ED',
            margin: 0,
          }}
          inactiveDotOpacity={1}
          inactiveDotStyle={{
            width: 12,
            height: 3,
            backgroundColor: 'white',
            margin: 0,
          }}
          inactiveDotScale={1}
        />

        <ScrollView style={styles.pinScrollView}>
          <Text style={styles.pinViewTitle}>Planet - Bangkok</Text>
          <View style={styles.pinViewCate}>
            <IconMoon name="sights" style={styles.pinViewCateIcon} />

            <Text style={styles.pinViewCateText}> Sights</Text>
          </View>
          <Text style={styles.pinViewContent}>
            This imposing early-20th-century Italianate stone mansion, set
            discreetly back from the street, belonged to Don José Lázaro
            Galdiano (1862–1947), a successful businessman and passionate patron
            of the arts. His astonishing private collection, which he bequeathed
            to the city upon his death, includes 13,000 works of art and objets
            d’art, a quarter of which are on show at any time. This imposing
            early-20th-century Italianate stone mansion, set discreetly back
            from the street, belonged to Don José Lázaro Galdiano (1862–1947), a
            successful businessman and passionate patron of the arts. His
            astonishing private collection, which he bequeathed to the city upon
            his death, includes 13,000 works of art and objets d’art, a quarter
            of which are on show at any time.
          </Text>
        </ScrollView>

        <Dialog
          rounded={false}
          visible={this.state.saveToListModal}
          hasOverlay={true}
          animationDuration={1}
          onTouchOutside={() => {
            this.setState({saveToListModal: false});
          }}
          dialogAnimation={
            new FadeAnimation({
              initialValue: 0, // optional
              animationDuration: 150, // optional
              useNativeDriver: true, // optional
            })
          }
          onHardwareBackPress={() => {
            this.setState({saveToListModal: false});
            return true;
          }}
          dialogStyle={styles.customPopup}>
          <DialogContent style={styles.customPopupContent}>
            <View style={styles.customPopupHeader}>
              <Text style={styles.customPopupHeaderTitle}>Save to list</Text>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => this.setState({saveToListModal: false})}>
                <Feather style={styles.buttonCloseIcon} name={'x'} />
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Name</Text>
              <TextInput
                style={styles.formControl}
                placeholder={'Enter trip list name'}
                placeholderTextColor={'#828894'}
              />
            </View>
            <View style={styles.buttonCTGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonCT,
                  styles.buttonCTCancel,
                  styles.buttonOutline,
                ]}
                onPress={() => this.setState({saveToListModal: false})}>
                <Text style={[styles.buttonText, styles.buttonTextDark]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonCT,
                  styles.buttonCTSubmit,
                  styles.buttonPrimary,
                ]}
                onPress={() => this.setState({saveToListModal: false})}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.orDivider}>
              <Text style={styles.orDividerBorder}></Text>
              <Text style={styles.orDividerText}>OR</Text>
            </View>
            <View style={styles.MVTripList}>
              <View style={styles.MVTripListItem}>
                <Text style={styles.MVTripListItemTitle}>London</Text>
                <SimpleLineIcons name={'heart'} color={'#2F80ED'} size={15} />
              </View>
              <View style={[styles.MVTripListItem, {borderBottomWidth: 0}]}>
                <Text style={styles.MVTripListItemTitle}>London</Text>
                <SimpleLineIcons name={'heart'} color={'#2F80ED'} size={15} />
              </View>
            </View>

            <View activeOpacity={0.9} style={styles.mapViewCard}>
              <Image
                style={styles.mapViewCardImg}
                source={require('./../../Images/login-bg.jpg')}
              />
              <View style={styles.mapViewCardContent}>
                <View style={styles.mapViewTitle}>
                  <Text style={styles.mapViewTitleText}>Planet - Bangkok</Text>
                  <SimpleLineIcons name={'heart'} size={15} color={'#EB5757'} />
                </View>
                <View style={styles.mapViewCate}>
                  <IconMoon name="sights" style={styles.mapViewCateIcon} />
                  <Text style={styles.mapViewCateText}> Sights</Text>
                </View>
                <Text style={styles.mapViewContentText}>
                  Australian chef-author David Thompson is the man behind one of
                  Bangkok's
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                marginTop: 15,
                backgroundColor: '#2F80ED',
                width: 140,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 5,
              }}
              onPress={() => this.setState({saveToListModal: false})}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: 'white',
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </DialogContent>
        </Dialog>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  map: {
    flex: 1,
  },
  pinScrollView: {
    padding: 20,
    height: 'auto',
    borderRadius: 20,
    backgroundColor: 'white',
    position: 'absolute',
    top: 400,
    marginTop: -100,
  },
  pinViewTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 24,
    marginBottom: 5,
  },
  pinViewCate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  pinViewCateIcon: {
    color: '#2F80ED',
    fontSize: 13,
  },
  pinViewCateText: {
    fontSize: 12,
    color: '#828282',
    fontFamily: 'Montserrat-Regular',
  },
  pinViewContent: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#4F4F4F',
  },
  pinHeader: {
    top: 20,
    zIndex: 9999,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    padding: 15,
  },
  cateSlideCard: {
    height: 375,
    marginBottom: 10,
    shadowOffset: {width: 0, height: 5},
    shadowColor: 'rgba(6, 18, 42, 0.08);',
    shadowOpacity: 1.0,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  cateSlideCardIcon: {
    height: 375,
    width: DEVICE_WIDTH,
    alignSelf: 'center',
  },
  cateSlideCardTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    lineHeight: 12,
    marginTop: 10,
    color: '#333333',
    textAlign: 'center',
  },
  orDivider: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  orDividerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#333333',
    paddingHorizontal: 10,
    zIndex: 7,
    backgroundColor: '#ffffff',
  },
  orDividerBorder: {
    position: 'absolute',
    width: '100%',
    height: 1,
    zIndex: 6,
    backgroundColor: '#C4C4C4',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#2F80ED',
  },
  buttonReview: {
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  customPopup: {
    width: DEVICE_WIDTH,
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
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 10,
    maxHeight: DEVICE_HEIGHT - 100,
    overflow: 'scroll',
  },
  customPopupContent: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  customPopupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  customPopupHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#333333',
  },
  buttonClose: {
    width: 24,
    height: 24,
  },
  buttonCloseIcon: {
    color: '#BDBDBD',
    fontSize: 24,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
    paddingLeft: 7,
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    height: 48,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Montserrat-Medium',
    color: '#4F4F4F',
    fontSize: 14,
  },
  buttonCTGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonCT: {
    flex: 1,
  },
  buttonCTCancel: {
    marginRight: 10,
  },
  buttonCTSubmit: {
    marginLeft: 10,
  },
  buttonOutline: {
    borderColor: '#BDBDBD',
    borderWidth: 1,
    color: '#fff',
  },
  buttonTextDark: {
    color: '#333333',
  },
  mapViewCard: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: DEVICE_WIDTH - 40,
    flexDirection: 'row',
    elevation: 3,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'rgba(242, 242, 242, 0.5)',
  },
  mapViewCardImg: {
    width: 120,
    height: 95,
  },
  mapViewCardContent: {
    width: DEVICE_WIDTH - 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  mapViewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DEVICE_WIDTH - 20,
  },
  mapViewTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '500',
  },
  mapViewCate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  mapViewCateIcon: {
    color: '#2F80ED',
    fontSize: 13,
  },
  mapViewCateText: {
    fontSize: 12,
    color: '#828282',
    fontFamily: 'Montserrat-Regular',
  },
  mapViewContentText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#828282',
  },
  MVTripList: {
    marginBottom: 20,
  },
  MVTripListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  MVTripListItemTitle: {
    color: '#BDBDBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
});
export default PinView;
