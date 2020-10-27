import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const DEVICE_WIDTH = Dimensions.get('window').width;

const FirstScreen = props => {
  const dispatch = useDispatch();

  const isIntroCompleted = useSelector(state => state.user.introCompleted);

  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL);
    handleDeepLinkingRequests();

    return () => Linking.removeEventListener('url', handleOpenURL);
  }, []);

  const handleDeepLinkingRequests = () => {
    Linking.getInitialURL()
      .then(handleOpenURL)
      .catch(error => {
        alert(JSON.stringify(error));
      });
  };

  const handleOpenURL = data => {
    let finalUrl = data.url || data
    if (finalUrl) {
      let splitted = JSON.stringify(finalUrl).split('/');
      let email = splitted[splitted.length - 1] || '';
      if (email) {
        props.navigation.navigate('SetPassScreen', {email, deepLink: true});
      }
    }
  };

  useEffect(() => {
    if (isIntroCompleted) {
      props.navigation.navigate('AuthLoading');
    }
  }, [isIntroCompleted]);

  const startWalkthrough = () => {
    props.navigation.navigate('WalkThrough');
  };

  const onSignIn = () => {
    dispatch({type: 'introCompleted', value: true});
    props.navigation.navigate('AuthLoading', {signInFromIntro: true});
  };

  return !isIntroCompleted ? (
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
            All your travel informations in one place, adapted to your needs.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.rightBorder]}
          onPress={startWalkthrough}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSignIn} style={styles.button}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : null;
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  pageLogo: {
    width: DEVICE_WIDTH - 100,
    height: DEVICE_WIDTH - 100,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: 'white',
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
