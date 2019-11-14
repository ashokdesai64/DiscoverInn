import React, {Fragment} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {ListItem, CheckBox, Picker, Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import styles from './UploadMap.style';

class UploadMap extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'UploadMap',
    headerStyle: {
      backgroundColor: '#F3F4F6',
      borderBottomWidth: 0,
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
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.pageContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                  Paste your Google MyMaps URL
                </Text>
                <KeyboardAvoidingView behavior="padding" enabled>
                  <TextInput style={styles.formControl} value="" />
                </KeyboardAvoidingView>
              </View>
              <View style={styles.orDivider}>
                <Text style={styles.orDividerText}>OR</Text>
                <View style={styles.orDividerBorder}></View>
              </View>
              <View style={styles.uploadPicker}>
                <Text style={styles.formLabel}>Upload KML</Text>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonPrimary,
                    styles.uploadPickerButton,
                  ]}
                  onPress={() => {}}>
                  <Text style={styles.buttonText}>
                    Click here or kml file to upload
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.uploadButtonGroup}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.uploadButton,
                    styles.uploadButtonCancel,
                    styles.buttonOutline,
                  ]}
                  onPress={() => {}}>
                  <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.uploadButton,
                    styles.uploadButtonSubmit,
                    styles.buttonPrimary,
                  ]}
                  onPress={() => {}}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}
export default UploadMap;
