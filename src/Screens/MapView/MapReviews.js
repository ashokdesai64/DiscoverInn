import React from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageBlurLoading from './../../components/ImageLoader';
import moment from 'moment';
import Header from './../../components/header/header';
import styles from './MapReviews.style';

const MapReviews = props => {
  const {mapData} = props.navigation.state.params;
  const reviews = (mapData && mapData.reviews) || [];
  return (
    <>
      <Header
        showBack={true}
        rightEmpty={false}
        showRightButton={false}
        title={'Map Reviews'}
        {...props}
        style={{backgroundColor: '#F3F4F6'}}
      />
      <ScrollView
        // style={styles.container}
        contentContainerStyle={{alignItems: 'center', flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {reviews.length > 0 ? (
          reviews.map(review => {
            return (
              <View style={styles.reviewCard} key={review.id}>
                <View style={styles.reviewCardHeader}>
                  <View style={styles.reviewCardHeaderLeft}>
                    <ImageBlurLoading
                      withIndicator
                      style={styles.reviewCardAvatar}
                      source={{uri: review.image}}
                      thumbnailSource={{
                        uri:
                          'https://discover-inn.com/upload/cover/map-image.jpeg',
                      }}
                    />
                    <View style={styles.reviewCardHeading}>
                      <Text style={styles.reviewCardTitle}>
                        {review.firstname} {review.lastname}
                      </Text>
                      <View style={styles.reviewCardRateList}>
                        {Array(parseInt(review.ratings))
                          .fill(1)
                          .map(d => {
                            return (
                              <MaterialCommunityIcons
                                style={styles.starIcon}
                                name="star"
                                size={15}
                                color="#FFAF2C"
                              />
                            );
                          })}
                        {Array(5 - parseInt(review.ratings))
                          .fill(1)
                          .map(d => {
                            return (
                              <MaterialCommunityIcons
                                style={styles.starIcon}
                                name="star-outline"
                                size={15}
                                color="#FFAF2C"
                              />
                            );
                          })}
                      </View>
                    </View>
                  </View>

                  <Text style={styles.reviewTime}>
                    {moment(review.date_created).fromNow()}
                  </Text>
                </View>
                <View style={styles.reviewCardBody}>
                  <Image
                    style={styles.reviewExclamationmark}
                    source={require('./../../Images/exclamation.png')}
                  />
                  <Text style={styles.reviewCardText}> {review.review} </Text>
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
              marginBottom: 50,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 18,
                color: '#aaa',
                marginRight: 10,
              }}>
              No Reviews Found
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};
export default MapReviews;
