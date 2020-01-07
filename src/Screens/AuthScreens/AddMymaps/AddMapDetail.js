import React, { Fragment } from 'react';
import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native';
import { ListItem, CheckBox, Picker, Textarea } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Header from './../../../components/header/header';
import styles from './AddMapDetail.style';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../../selection.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-picker';

const IconMoon = createIconSetFromIcoMoon(fontelloConfig);
const DEVICE_WIDTH = Dimensions.get('window').width;

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const LocationCheckbox = ({
  selected,
  onPress,
  style,
  textStyle,
  size = 22,
  text = '',
  ...props
}) => (
    <TouchableOpacity style={styles.useLoaction} onPress={onPress} {...props}>
      <Feather
        size={size}
        color={selected ? '#BDBDBD' : '#2F80ED'}
        name={selected ? 'square' : 'check-square'}
      />
      <Text style={styles.useLoactionText}> {text} </Text>
    </TouchableOpacity>
  );

class AddMapDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinImages: [],
      imageSelected: false,
    };
    console.log(props);
  }

  componentDidMount() {
    console.log(this.props)
  }

  state = {
    locationAccepted: false,
    photo: null,
  };

  handleCheckBox = () => {
    this.setState({ locationAccepted: !this.state.locationAccepted });
  }

  showPicker(type) {

    if (type == 'gallery') {
      const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Gallery' }],
        permissionDenied: {
          title: 'Give permission',
          text: 'Text',
          reTryTitle: 'reTryTitle',
          okTitle: 'okTitle',
        },
        quality: 0.3,
      };

      ImagePicker.launchImageLibrary(options, response => {
        console.log('response => ', response);
        let selectedImage = {
          imagePath: response.uri,
          fileName: response.fileName,
          fileType: response.type,
        };
        this.setState({ imageSelected: true, pinImages: [...this.state.pinImages, selectedImage] });
      });
    } else {

    }

  }

  render() {
    const { pinImages } = this.state;
    return (
      <Fragment>
        <ImageBackground
          source={require('../../../Images/map-bg.png')}
          style={{ width: '100%', height: '100%' }}>
          <Header
            showBack={true}
            title={'Add Map Detail'}
            {...this.props}
            rightEmpty={true}
            showRightButton={false}
            style={styles.bgTransfrent}
          />
          <View style={styles.container}>
            <View style={styles.pageContent}>
              <ScrollView keyboardShouldPersistTaps={'always'}>
                {
                  pinImages && pinImages.length ?
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                      {
                        pinImages.map((image) => {
                          return (
                            <View style={{ marginRight: 13, marginBottom: 15 }}>
                              <Image
                                style={{ height: 80, width: 80, borderRadius: 5 }}
                                source={{uri:image.imagePath}}
                              />
                              <View style={{ backgroundColor: 'white', height: 20, width: 20, position: 'absolute', top: -5, right: -5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 }}>
                                <Feather name={'x'} color={'red'} />
                              </View>
                            </View>
                          )
                        })
                      }
                      <View style={{ marginRight: 13, marginBottom: 15, borderWidth: 1, borderColor: '#2F80ED', borderStyle: 'dashed', height: 80, width: 80, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Feather name={'plus'} color={'#2F80ED'} />
                        <Text style={{ color: '#828282', fontSize: 8, fontFamily: 'Montserrat-Regular', textAlign: 'center', marginRight: 0, }}>Choose Files</Text>
                      </View>
                    </View>
                    :
                    <TouchableOpacity onPress={() => this.setState({ showPickerDialog: true })} style={[styles.uploadCoverCard]}>
                      <AntDesign name={'pluscircleo'} size={36} color={'#2F80ED'} />
                      <Text style={[styles.uploadCoverCardText]}>
                        Add Cover Image
                  </Text>
                    </TouchableOpacity>
                }

                <View>
                  <LocationCheckbox
                    selected={this.state.locationAccepted}
                    onPress={this.handleCheckBox}
                    text="Use photo location"
                  />
                </View>
                <View style={styles.ckaiush}></View>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    Location Name{' '}
                    <Feather
                      size={12}
                      name="alert-triangle"
                      color={'#F2994A'}
                    />
                  </Text>

                  <GooglePlacesAutocomplete
                    query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: 'AIzaSyBEd0rJ6DYhNEPKAkKHQG-jEBIrFKDQsRs',
                      language: 'en', // language of the results
                      types: 'geocode' // default: 'geocode'
                    }}
                    placeholder='Enter Location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    styles={{

                      textInputContainer: {
                        borderWidth: 1,
                        borderColor: '#BDBDBD',
                        borderRadius: 5,
                        height: 48,
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: 'transparent',

                        fontSize: 14,
                      },
                      textInput: {
                        fontFamily: 'Montserrat-Regular',
                        color: '#4F4F4F',
                      },
                      description: {
                        fontWeight: 'bold'
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb'
                      }
                    }}
                    debounce={200}
                    renderDescription={(row) => row.description || row.vicinity} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                      console.log("test")
                      console.log(data, details);
                      this.setState({ selectedLocation: details.geometry.location, selectedAddress: details.formatted_address })
                    }}
                  />
                </View>

                <View style={styles.mapPins}>
                  {
                    this.props.categories && this.props.categories.map((category) => {
                      let isCategorySelected = this.state.selectedCategory == category.id;
                      return (
                        <TouchableOpacity
                          onPress={() => { this.setState({ selectedCategory: category.id }) }}
                          style={[
                            styles.singlePin,
                            { backgroundColor: isCategorySelected ? '#2F80ED' : 'rgba(47, 128, 237, 0.1)' },
                          ]}>
                          <IconMoon size={14} name={category.name.toLowerCase()} color={isCategorySelected ? 'white' : '#2F80ED'} />
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Pin Title</Text>
                  <TextInput
                    style={styles.formControl}
                    placeholderTextColor={'#828894'}
                    onChangeText={(pinTitle) => this.setState({ pinTitle })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Description:</Text>
                  <Textarea
                    numberOfLines={4}
                    style={[styles.formControlTextarea]}
                    textAlignVertical={'top'}
                    placeholderTextColor={'#828894'}
                    onChangeText={(pinDescription) => this.setState({ pinDescription })}
                  />
                </View>

              </ScrollView>
            </View>
            <View style={styles.footerButton}>
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary, { flex: 1 }]}
                onPress={() => {
                  this.props.navigation.navigate('SinglePinView');
                }}>
                <Text style={styles.buttonText}>Add Pin</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* image picker modal */}
          <Dialog
            rounded={false}
            visible={this.state.showPickerDialog}
            hasOverlay={true}
            animationDuration={1}
            onTouchOutside={() => {
              this.setState({ showPickerDialog: false });
            }}
            dialogAnimation={
              new FadeAnimation({
                initialValue: 0, // optional
                animationDuration: 150, // optional
                useNativeDriver: true, // optional
              })
            }
            onHardwareBackPress={() => {
              this.setState({ showPickerDialog: false });
              return true;
            }}
            dialogStyle={styles.customPopup}>
            <DialogContent style={styles.customPopupContent}>
              <View style={styles.customPopupHeader}>
                <Text style={styles.customPopupHeaderTitle}>Share Your Map</Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => this.setState({ showPickerDialog: false })}>
                  <Feather name={'x'} style={styles.buttonCloseIcon} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.formLabel}>Select From:</Text>
                <View style={styles.shareSocial}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonCamera]}
                    onPress={() => this.setState({ showPickerDialog: false }, () => { this.showPicker('gallery') })}>
                    <AntDesign name={'picture'} color={'#fff'} size={16} />
                    <Text style={[styles.buttonText]}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonCamera]}
                    onPress={() => this.setState({ showPickerDialog: false }, () => { this.showPicker('camera') })}>
                    <AntDesign name={'camerao'} color={'#fff'} size={16} />
                    <Text style={[styles.buttonText]}>Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </DialogContent>
          </Dialog>

        </ImageBackground>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.maps.categories
  };
}

export default connect(mapStateToProps, null)(AddMapDetail);
