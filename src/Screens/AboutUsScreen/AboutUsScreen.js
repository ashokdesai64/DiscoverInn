import React, { Fragment } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../components/header/header';
import styles from './AboutUsScreen.style';

const AboutUs = (props) => {
  return (
    <Fragment>
      <Header
        showBack={true}
        title={''}
        {...props}
        style={styles.bgTransparent}
      />
      <ScrollView style={styles.container}>
        <View style={styles.aboutTitle}>
          <View style={styles.aboutTitleLine} />
          <Text style={styles.aboutTitleText}>About Us</Text>
        </View>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutCardText}>
            Tired of jumping over many websites and blogs to plan your next
            trip? Discover-inn is the 1-stop Travel Planner that suits your
            needs! Discover personalized maps from travellers, define your
            points of interest and book your accomodations accordingly.
          </Text>
        </View>
      </ScrollView>
    </Fragment>
  );
};
export default AboutUs;
