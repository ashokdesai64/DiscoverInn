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
const DEVICE_HEIGHT = Dimensions.get('window').height;

const FirstScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./../../Images/app_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Discover-Inn</Text>
      </View>
      <View style={styles.body}>
        <Image
          source={require('./../../Images/travel-clip.png')}
          style={styles.pageLogo}
        />
        <View style={styles.infoContainer}>
          <Text style={[styles.headerTitle, {fontWeight: 'bold'}]}>
            Welcome to Discover-inn
          </Text>
          <Text style={styles.infoText}>
            All your travel information in one place, Adapted to your needs.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex:1
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  pageLogo: {
    width: DEVICE_WIDTH - 30,
    height: DEVICE_WIDTH - 30,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 24,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  infoContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Montserrat-Regular',
    marginTop: 10,
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
    flex:1,
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
      color:'white',
      fontFamily: 'Montserrat-Medium'
  }
});
