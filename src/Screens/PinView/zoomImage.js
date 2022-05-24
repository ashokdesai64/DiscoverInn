import React, {memo} from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';
import ImageBlurLoading from '../../components/ImageLoader';
import {getStatusBarHeight} from '../../config/statusbar';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './PinView.styles';
const {height, width} = Dimensions.get('window');

const ZoomImage = ({
  closeModal,
  uri,
  navigation,
  isSaved,
  isOffline,
  removeFromTrip,
  openSaveToListModal,
}) => {
  let paddingTop = 0,
    headerHeight = 60;
  if (Platform.OS === 'ios') {
    paddingTop = getStatusBarHeight();
    headerHeight = 80;
  }
  return (
    <Modal animationType="slide" visible={true} onRequestClose={closeModal}>
      <View style={[styles.pinHeader, {paddingTop, height: headerHeight}]}>
        <TouchableOpacity onPress={closeModal}>
          <Feather name={'arrow-left'} size={24} color={'white'} />
        </TouchableOpacity>

        {!isOffline &&
          (isSaved ? (
            <TouchableOpacity onPress={removeFromTrip}>
              <AntDesign name={'heart'} size={24} color={'white'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={openSaveToListModal}>
              <AntDesign name={'hearto'} size={24} color={'white'} />
            </TouchableOpacity>
          ))}
      </View>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <ImageBlurLoading
          withIndicator
          style={{height, width, resizeMode: 'contain'}}
          source={{uri}}
          thumbnailSource={{
            uri: 'https://discover-inn.com/upload/cover/map-image.jpeg',
          }}
        />
      </View>
    </Modal>
  );
};
export default memo(ZoomImage);
