import {StyleSheet} from 'react-native';
import {Row} from 'native-base';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  cateCardRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: -7.5,
    marginRight: -7.5,
  },
  cateCard: {
    marginBottom: 15,
    paddingHorizontal: 7.5,
    width: '50%',
  },
  cateSlideInner: {
    width: 164,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.2);',
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'rgba(0, 0, 0, 0.05);',
    shadowOpacity: 1,
  },
  cateCardIcon: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    color: '#2F80ED',
  },
  cateCardTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    lineHeight: 20,
    marginTop: 15,
    color: '#333333',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'rgba(47, 128, 237, 0.2);',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(47, 128, 237, 0.1)',
  },
  badgeText: {
    fontSize: 12,
    color: '#2F80ED',
    borderRadius: 5,
    fontFamily: 'Montserrat-Medium',
  },
});

export default styles;
