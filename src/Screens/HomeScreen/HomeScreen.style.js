import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homePage: {
    marginBottom: 25,
  },
  scrollView: {
    paddingRight: 0,
    marginRight: 0,
  },
  homeHeadingCard: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  homeHeadingText: {
    fontSize: 24,
    lineHeight: 29,
    color: '#333333',
    fontFamily: 'Montserrat-SemiBold',
  },
  searchbarInput: {
    padding: 0,
    backgroundColor: '#fff',
    marginLeft: 15,
  },
  containerStyle: {
    backgroundColor: '#000',
  },
  cateCard: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 8,
  },
  seeAll: {
    fontSize: 12,
    color: '#2F80ED',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 15,
  },
  cateSlideCard: {
    width: 88,
    height: 88,
    marginBottom: 10,
    shadowOffset: {width: 0, height: 5},
    shadowColor: 'rgba(6, 18, 42, 0.08);',
    shadowOpacity: 1.0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  cateSlideCardIcon: {
    width: 50,
    height: 28,
    alignSelf: 'center',
    color: '#2F80ED',
  },
  cateSlideCardTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    lineHeight: 12,
    marginTop: 10,
    color: '#333333',
    textAlign: 'center',
  },
  carouselItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSlidCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  mapSlideCardImg: {
    width: 280,
    height: 280,
    borderRadius: 10,
  },
  mapSlideCardImg_overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    height: 280,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  mapSlideCardContent: {
    position: 'absolute',
    left: 12,
    bottom: 25,
  },
  badge: {
    paddingTop: 5,
    paddingStart: 7,
    paddingEnd: 7,
    paddingBottom: 5,
    marginBottom: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  badgeRed: {
    backgroundColor: '#EB5757',
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    borderRadius: 5,
    fontFamily: 'Montserrat-Medium',
    alignItems: 'center',
  },
  mapSlideCardTitle: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 10,
  },
  rateList: {
    flexDirection: 'row',
  },
  starIcon: {
    paddingRight: 3,
  },
  rateListCount: {
    color: '#BDBDBD',
    fontSize: 12,
    lineHeight: 15,
    marginLeft: 10,
  },
});

export default styles;
