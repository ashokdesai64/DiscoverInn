import React, {Fragment} from 'react';
import {View, Text, KeyboardAvoidingView, TextInput} from 'react-native';
import styles from './AddMymaps.style';
import Icon from 'react-native-vector-icons/Feather';

class AddMymaps extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile',
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
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <View style={styles.pageContent}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Add Map Title</Text>
              <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput style={styles.formControl} value="" />
              </KeyboardAvoidingView>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Last Name</Text>
              <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput style={style.textArea} value="" />
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </Fragment>
    );
  }
}
export default AddMymaps;
