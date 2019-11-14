import React, { Fragment } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from './EditProfile.style';
import Icon from 'react-native-vector-icons/Feather';
import Header from './../../../components/header/header';

const CheckBox = ({
  selected,
  onPress,
  size = 30,
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
    };
  }

  static navigationOptions = {
    title: 'Edit Profile',
    header: null,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      paddingLeft: 15,
    },
    headerTitleStyle: {
      color: '#333333',
      fontSize: 16,
      fontFamily: 'Montserrat-Semibold',
    },
    headerTintColor: '#333333',
    headerLeftContainerStyle: {
      paddingLeft: 10,
    },
  };

  handleCheckBox = () =>
    this.setState({ termsAccepted: !this.state.termsAccepted });

  saveProfile(){
    alert();
  }

  render() {
    return (
      <Fragment>

        <Header
          showBack={true}
          title={'Edit Profile'}
          style={{ backgroundColor: '#F3F4F6' }}
          showRightButton={true}
          rightButtonText={'Save'}
          onRightPress={()=> this.saveProfile()}
          rightTextStyle={{color:'#27AE60'}}
        />
        <View style={styles.container}>
          <View style={styles.pageContent}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Image 
                source={require('./../../../Images/profile.png')}
                style={{height:100,width:100,borderRadius:10}}
                blurRadius={0.4}
              />
              <Icon name={'camera'} size={30} color={'white'} style={{position:'absolute',fontWeight:'bold'}}/>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>First Name</Text>
              <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput style={styles.formControl} value="" />
              </KeyboardAvoidingView>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Last Name</Text>
              <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput style={styles.formControl} value="" />
              </KeyboardAvoidingView>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email</Text>

              <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput style={styles.formControl} value="" />
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
export default EditProfile;
