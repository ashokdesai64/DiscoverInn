import React, {Fragment} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './EditProfile.style';
import Icon from 'react-native-vector-icons/Feather';
import Header from './../../../components/header/header';

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
    };
  }

  componentDidMount() {
    // this.setState
  }

  handleCheckBox = () =>
    this.setState({termsAccepted: !this.state.termsAccepted});

  saveProfile() {
    const {firstname, lastname, email, termsAccepted} = this.state;
    if (!firstname.trim()) {
      alert('First name is required');
    }
    if (!lastname.trim()) {
      alert('Last name is required');
    }
    if (!email.trim()) {
      alert('Email is required');
    }
    this.setState({updatingProfile: true});
    this.props.userAction.updateProfile({
      firstname,
      lastname,
      email,
      share_map: termsAccepted ? 1 : 0,
      user_id: this.props.userData.id,
    });
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
          showRightButton={true}
          rightEmpty={true}
          rightButtonText={'Save'}
          onRightPress={() => this.saveProfile()}
          rightTextStyle={{color: '#27AE60', fontFamily: 'Montserrat-Regular'}}
          {...this.props}
        />

        <View style={styles.container}>
          <View style={styles.pageContent}>
            <View style={styles.formGroupEdit}>
              <Image
                source={{uri: userData.image}}
                style={{height: 100, width: 100, borderRadius: 10}}
                blurRadius={0.8}
              />
              <Icon
                name={'camera'}
                size={30}
                color={'white'}
                style={{position: 'absolute', fontWeight: 'bold'}}
              />
            </View>
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
          </View>
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
