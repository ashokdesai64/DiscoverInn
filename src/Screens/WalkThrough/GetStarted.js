import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DeepLinking from 'react-native-deep-linking';
const DEVICE_WIDTH = Dimensions.get('window').width;

const FirstScreen = props => {
  const dispatch = useDispatch();

  const isIntroCompleted = useSelector(state => state.user.introCompleted);

  useEffect(() => {
    DeepLinking.addScheme('discoverinn://');

    DeepLinking.addRoute('/maps/:email', (response) => {
      navigate('SetPassScreen', { email: response.email, deepLink: true });
    });

    Linking.addEventListener('url', handleUrl);
    handleDeepLinkingRequests();

    return () => Linking.removeEventListener('url', handleUrl);
  }, []);

  const handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  };

  const handleDeepLinkingRequests = () => {
    Linking.getInitialURL()
      .then(handleOpenURL)
  };

  const handleOpenURL = data => {
    let finalUrl = data?.url || data;
    if (finalUrl) {
      const { navigate } = props.navigation;
      const route = finalUrl.replace(/.*?:\/\//g, '');
      const email = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('/')[0];

      if (routeName === 'maps') {
        navigate('SetPassScreen', { email, deepLink: true });
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
    dispatch({ type: 'introCompleted', value: true });
    props.navigation.navigate('SignupScreen');
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
          <Text style={[styles.headerTitle, { fontWeight: 'bold' }]}>
            Welcome to Discover-inn
          </Text>
          <Text style={styles.infoText}>
            All your travel informations in one place, adapted to your needs.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={startWalkthrough}>
          <Text style={styles.buttonText}>GET STARTED</Text>
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
