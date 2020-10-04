import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

const InfoScreen = ({values, onSkip, onSignIn}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{values.title}</Text>
        <Text style={styles.infoText}>{values.info}</Text>
      </View>

      <Image source={require('./../../Images/final.gif')} style={styles.gif} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.rightBorder]}
          onPress={onSkip}>
          <Text style={styles.buttonText}>SKIP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center'
  },
  gif: {
    width: DEVICE_WIDTH,
    height: 250,
    marginVertical:50,
    // paddingVertical:50
  },
  pageLogo: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH - 100,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:50
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  headerTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 30,
    textAlign: 'center',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Montserrat-Regular',
    marginVertical: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    backgroundColor: '#2F80ED',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
});
