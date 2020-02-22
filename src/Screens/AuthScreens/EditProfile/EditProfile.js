import React, {Fragment} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import Toast from 'react-native-root-toast';
import styles from './EditProfile.style';
import Icon from 'react-native-vector-icons/Feather';
import Header from './../../../components/header/header';
import ImagePicker from 'react-native-image-picker';

//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from './../../../actions/authActions';
import * as userActions from './../../../actions/userActions';

const CheckBox = ({
  selected,
  onPress,
  size = 20,
  color = '#2F80ED',
  text = '',
}) => (
  <TouchableOpacity
    style={styles.checkBox}
    onPress={onPress}
    backgroundColor="red"
    activeBackgroundColor="red">
    <Icon
      size={size}
      color={color}
      name={selected ? 'square' : 'check-square'}
    />

    <Text style={styles.textStyle}> {text} </Text>
  </TouchableOpacity>
);
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: false,
      photo: null,
      firstname: props.userData.firstname,
      lastname: props.userData.lastname,
      email: props.userData.email,
      termsAccepted: props.userData.share_map_allow == '0' ? false : true,
      updatingProfile: false,
      imagePath: null,
      isImageSelected: false,
      fileName: '',
      fileType: '',
      inProgress: false,
      showToast: false,
    };
  }

  componentDidMount() {
    // this.setState
  }

  handleCheckBox = () =>
    this.setState({termsAccepted: !this.state.termsAccepted});

  openImagePicker() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Gallery'}],
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
      this.setState({
        isImageSelected: true,
        imagePath: response.uri,
        fileName: response.fileName,
        fileType: response.type,
      });
    });
  }

  saveProfile() {
    const {
      firstname,
      lastname,
      email,
      termsAccepted,
      isImageSelected,
      imagePath,
      fileName,
      fileType,
    } = this.state;
    if (!firstname.trim()) {
      alert('First name is required');
    }
    if (!lastname.trim()) {
      alert('Last name is required');
    }
    if (!email.trim()) {
      alert('Email is required');
    }
    this.setState({inProgress: true});

    let apiData = {
      firstname,
      lastname,
      email,
      share_map: termsAccepted ? 1 : 0,
      user_id: this.props.userData.id,
    };
    if (isImageSelected) {
      apiData['profile'] = {
        uri: imagePath,
        name: fileName,
        type: fileType,
      };
    }
    this.props.userAction
      .updateProfile(apiData)
      .then(data => {
        this.setState({inProgress: false, showToast: false});
        setTimeout(() => {
          this.setState({showToast: false});
        }, 3000);
        Alert.alert('Profile updated successfully.');
        // ToastAndroid.showWithGravity(
        //   'All Your Base Are Belong To Us',
        //   ToastAndroid.SHORT,
        //   ToastAndroid.CENTER,
        // );
      })
      .catch(err => {
        this.setState({inProgress: false});
        alert(err);
      });
  }

  async openImagePicker1() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  render() {
    console.log('this.props => ', this.props);
    const {userData} = this.props;
    return (
      <Fragment>
        <Header
          showBack={true}
          title={'Edit Profile'}
          style={{backgroundColor: '#F3F4F6'}}
          // showRightButton={true}
          // rightEmpty={true}
          // rightButtonText={'Save'}
          // onRightPress={() => this.saveProfile()}
          // rightTextStyle={{ color: '#27AE60', fontFamily: 'Montserrat-Regular' }}
          {...this.props}
        />

        <View style={styles.container}>
          <View style={styles.pageContent}>
            <TouchableOpacity
              style={styles.formGroupEdit}
              onPress={() => {
                this.openImagePicker();
              }}>
              <Image
                source={{uri: this.state.imagePath || userData.image}}
                style={{height: 100, width: 100, borderRadius: 10}}
                blurRadius={0.8}
              />
              <Icon
                name={'camera'}
                size={30}
                color={'white'}
                style={{position: 'absolute', fontWeight: 'bold'}}
              />
            </TouchableOpacity>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>First Name</Text>
              <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput
                  onChangeText={firstname => this.setState({firstname})}
                  style={styles.formControl}
                  defaultValue={userData.firstname || ''}
                  value={this.state.firstname}
                />
              </KeyboardAvoidingView>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Last Name</Text>
              <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput
                  onChangeText={lastname => this.setState({lastname})}
                  style={styles.formControl}
                  defaultValue={userData.lastname || ''}
                  value={this.state.lastname}
                />
              </KeyboardAvoidingView>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email</Text>

              <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput
                  onChangeText={email => this.setState({email})}
                  style={styles.formControl}
                  defaultValue={userData.email || ''}
                  value={this.state.email}
                />
              </KeyboardAvoidingView>
            </View>
            <View style={{}}>
              <CheckBox
                selected={this.state.termsAccepted}
                onPress={this.handleCheckBox}
                text="Receive shared map email"
              />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={() => this.saveProfile()}>
              {this.state.inProgress ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={() => this.props.navigation.navigate('ChangePassword')}>
              <Text
                style={{
                  color: '#EB5757',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 16,
                  marginLeft: 0,
                }}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.showToast && (
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: 'black',
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}>
              <Text style={styles.buttonText}>
                Profile updated successfully.
              </Text>
            </View>
          )}
        </View>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authAction: bindActionCreators(authActions, dispatch),
    userAction: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
