import React, {Fragment} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {ListItem, CheckBox, Picker, Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/header/header';
import styles from './AboutUsScreen.style';

class AboutUsScreen extends React.Component {
  render() {
    return (
      <Fragment>
        <Header
          showBack={true}
          title={''}
          {...this.props}
          style={styles.bgTransparent}
        />
        <ScrollView style={styles.container}>
          <View style={styles.aboutTitle}>
            <View style={styles.aboutTitleLine}></View>
            <Text style={styles.aboutTitleText}>About Us</Text>
          </View>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutCardText}>
              Tired of jumping over many websites and blogs to plan your next
              trip? Discover-inn is the 1-stop Travel Planner that suits your
              needs! Discover personalized maps from travellers, define your
              points of interest and book your accomodations accordingly. Lorem
              Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
            <Text style={styles.aboutCardText}>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </View>
          {/* <View style={styles.aboutBg}>
            <Image
              style={styles.aboutBgImage}
              source={require('./../../Images/about_me.png')}
              resizeMode="stretch"
            />
          </View> */}
        </ScrollView>
      </Fragment>
    );
  }
}
export default AboutUsScreen;
