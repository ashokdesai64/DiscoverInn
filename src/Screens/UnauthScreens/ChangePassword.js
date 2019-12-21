import React, {Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './Unauthscreens.style';
import Header from './../../components/header/header';

class ChangePassword extends React.Component {
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
            rightEmpty={true}
            showRightButton={true}
            rightButtonText={'save'}
            rightTextStyle={{
              color: '#27AE60',
              fontFamily: 'Montserrat-Regular',
            }}
          />
          <View
            style={[
              styles.container,
              {paddingHorizontal: 15, paddingVertical: 25},
            ]}>
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, {color: '#4F4F4F'}]}>
                Password:
              </Text>
              <TextInput
                style={[
                  styles.formControl,
                  {borderColor: '#BDBDBD', color: '#4F4F4F'},
                ]}
              />
            </View>
            <View style={styles.formGroup}>
              <Text
                style={[styles.formLabel, {color: '#4F4F4F', fontSize: 12}]}>
                New Password:
              </Text>
              <TextInput
                style={[
                  styles.formControl,
                  {borderColor: '#BDBDBD', color: '#4F4F4F'},
                ]}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, {color: '#4F4F4F'}]}>
                Confirm Password:
              </Text>
              <TextInput
                style={[
                  styles.formControl,
                  {borderColor: '#BDBDBD', color: '#4F4F4F'},
                ]}
              />
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}
export default ChangePassword;
