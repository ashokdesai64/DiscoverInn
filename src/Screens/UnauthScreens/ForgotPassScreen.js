import React, {Fragment} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import styles from './Unauthscreens.style';

class ForgotPassScreen extends React.Component {
  render() {
    return (
      <Fragment style={styles.loginBg}>
        <ImageBackground
          source={require('../../Images/login-bg.jpg')}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
            <Text>This is ForgotPassScreen</Text>
          </View>
        </ImageBackground>
      </Fragment>
    );
  }
}
export default ForgotPassScreen;
