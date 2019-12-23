import React, { Fragment } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import styles from './Unauthscreens.style';
import Header from './../../components/header/header';

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from './../../actions/authActions';

class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }

  changePassword() {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    if (!oldPassword) {
      alert("Please enter old password."); return
    }
    if (!newPassword) {
      alert("Please enter new password."); return
    }
    if (!confirmPassword) {
      alert("Please enter confirm password."); return
    }
    if (confirmPassword != newPassword) {
      alert("Your passwords do not match."); return
    }

    this.setState({ inProgress: true });
    this.props.authAction.changePassword({ old_password: oldPassword,new_password:newPassword,user_id:this.props.userData.id }).then((msg) => {
      alert(msg);
      this.setState({ inProgress: false })
    }).catch((e) => {
      alert(e);
      this.setState({ inProgress: false })
    });
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Header
            showBack={true}
            title={'Discover Inn'}
            {...this.props}
          />
          <View
            style={[
              styles.container,
              { paddingHorizontal: 15, paddingVertical: 25 },
            ]}>
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: '#4F4F4F' }]}>
                Password:
              </Text>
              <TextInput
                style={[
                  styles.formControl,
                  { borderColor: '#BDBDBD', color: '#4F4F4F' },
                ]}
                onChangeText={(oldPassword)=> this.setState({oldPassword})}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.formGroup}>
              <Text
                style={[styles.formLabel, { color: '#4F4F4F', fontSize: 12 }]}>
                New Password:
              </Text>
              <TextInput
                style={[
                  styles.formControl,
                  { borderColor: '#BDBDBD', color: '#4F4F4F' },
                ]}
                onChangeText={(newPassword)=> this.setState({newPassword})}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: '#4F4F4F' }]}>
                Confirm Password:
              </Text>
              <TextInput
                style={[
                  styles.formControl,
                  { borderColor: '#BDBDBD', color: '#4F4F4F' },
                ]}
                onChangeText={(confirmPassword)=> this.setState({confirmPassword})}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={() => this.changePassword()}>
              {
                this.state.inProgress ?
                  <ActivityIndicator size="small" color="#fff" />
                  :
                  <Text style={styles.buttonText}>Save</Text>
              }
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);