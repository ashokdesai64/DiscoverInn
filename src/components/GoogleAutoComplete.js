import React, {Component} from 'react';
import {TouchableOpacity,PanResponder} from 'react-native';
import {Item, Input, Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import _ from 'underscore';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPropTypes as RNViewPropTypes,
  ScrollView,
} from 'react-native';

export default class GoogleAutoComplete extends Component {
  static defaultProps = {
    data: [],
    keyboardShouldPersistTaps: 'always',
    onStartShouldSetResponderCapture: () => false,
    renderItem: ({item}) => <Text>{item}</Text>,
    renderSeparator: null,
    renderTextInput: props => (
      <TextInput
        {...props}
        style={styles.formControl}
        placeholderTextColor={'#828894'}
      />
    ),
    flatListProps: {},
  };

  constructor(props) {
    super(props);
    this.resultList = null;
    this.textInput = null;
    this.state = {
      searchTerm: '',
      hideResults: true,
      placeList: [],
      enableScrollViewScroll: true,
    };
    this.onRefListView = this.onRefListView.bind(this);
    this.onRefTextInput = this.onRefTextInput.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this._panResponder = null;
  }

  onEndEditing(e) {
    this.props.onEndEditing && this.props.onEndEditing(e);
  }

  onRefListView(resultList) {
    this.resultList = resultList;
  }

  onRefTextInput(textInput) {
    this.textInput = textInput;
  }

  /**
   * Proxy `blur()` to autocomplete's text input.
   */
  blur() {
    const {textInput} = this;
    textInput && textInput.blur();
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const {textInput} = this;
    textInput && textInput.focus();
  }

  /**
   * Proxy `isFocused()` to autocomplete's text input.
   */
  isFocused() {
    const {textInput} = this;
    return textInput && textInput.isFocused();
  }

  renderResultList() {
    const {
      data,
      listStyle,
      renderItem,
      keyExtractor,
      renderSeparator,
      keyboardShouldPersistTaps,
      flatListProps,
      onEndReached,
      onEndReachedThreshold,
    } = this.props;
    const {placeList} = this.state;
    console.log('result list => ', placeList);
    return (
      <FlatList
        ref={this.onRefListView}
        data={placeList}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        renderSeparator={renderSeparator}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        style={[styles.list, listStyle]}
        {...flatListProps}
      />
    );
  }

  renderTextInput() {
    const {renderTextInput, style} = this.props;
    const props = {
      style: [styles.input, style],
      ref: this.onRefTextInput,
      onEndEditing: this.onEndEditing,
      ...this.props,
    };

    return renderTextInput(props);
  }

  async fetchPlaces(search) {
    const APIKey = 'AIzaSyAWb4AJLePv_NjMW00JHNWp6TS_g1x3h60';
    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeURIComponent(
      search,
    )}&key=${APIKey}`;
    try {
      let result = await axios.get(url);
      let places = result.data.predictions || [];
      this.setState({placeList: places, hideResults: false});
      console.log('places => ', places);
    } catch (err) {
      this.setState({placeList: []});
      console.log('err => ', err);
    }
  }

  searchPlaces = _.debounce(() => {
    let searchTerm = this.state.searchTerm,
      placeList = [];
    if (searchTerm.trim() != '') {
      this.fetchPlaces(searchTerm.trim());
    } else {
      this.setState({hideResults: true});
    }
  }, 250);

  onEnableScroll = value => {
    this.setState({
      enableScrollViewScroll: value,
    });
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.props.setScroll(false)
      },
      onPanResponderMove: () => {

      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => {
        this.props.setScroll(true)
      },
    })
  }

  render() {
    const {
      data,
      containerStyle,
      inputContainerStyle,
      listContainerStyle,
      onShowResults,
      onStartShouldSetResponderCapture,
    } = this.props;
    const showResults = data.length > 0;

    // Notify listener if the suggestion will be shown.
    onShowResults && onShowResults(showResults);

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.searchbarCard}>
          <Item style={styles.searchbarInputBox}>
            <Feather style={styles.searchbarIcon} name="search" />
            <Input
              style={styles.searchbarInput}
              placeholder="Type in your next destination!"
              value={this.state.searchTerm}
              onChangeText={searchTerm =>
                this.setState({searchTerm}, () => {
                  this.searchPlaces();
                })
              }
            />
            <TouchableOpacity
              onPress={() =>
                this.setState({showSorting: !this.state.showSorting})
              }>
              <Feather style={styles.searchbarFilter} name="sliders" />
            </TouchableOpacity>
            <Button
              style={styles.searchbarCardButton}
              onPress={() => this.fetchSearchedMaps()}>
              <Feather
                style={styles.searchbarCardButtonIcon}
                name="arrow-right"
              />
            </Button>
          </Item>
        </View>

        {!this.state.hideResults && (
          <ScrollView
          {...this._panResponder.panHandlers}
            keyboardShouldPersistTaps="always"
            style={{marginHorizontal: 15}}
            onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
            scrollEnabled={true}
            onScrollEndDrag={() => this.props.setScroll({ scrollEnabled: true })}
          >
            {this.renderResultList()}
          </ScrollView>
        )}
      </View>
    );
  }
}

const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1,
};

const androidStyles = {
  container: {
    flex: 1,
    // marginTop: 25
  },
  inputContainer: {
    marginBottom: 0,
  },
  list: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    marginTop: 0,
    ...border,
    maxHeight: 180,
  },
};

const iosStyles = {
  container: {
    zIndex: 1,
    // marginTop: 25
  },
  list: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    // left: 0,
    // position: 'absolute',
    // right: 0,
    ...border,
    maxHeight: 180,
  },
};

const styles = StyleSheet.create({
  formControl: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    height: 48,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Montserrat-Medium',
    color: '#4F4F4F',
    fontSize: 14,
  },
  ...Platform.select({
    android: {...androidStyles},
    ios: {...iosStyles},
  }),
  searchbarCard: {
    marginHorizontal: 15,
    marginVertical: 0,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
  },
  searchbarInputBox: {
    flex: 1,
    borderBottomWidth: 0,
  },
  searchbarIcon: {
    fontSize: 16,
    borderBottomWidth: 0,
    paddingLeft: 15,
    paddingRight: 10,
  },
  searchbarInput: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    padding: 0,
    height: 56,
  },
  searchbarFilter: {
    fontSize: 16,
    borderBottomWidth: 0,
    paddingRight: 5,
    color: '#828282',
  },
  searchbarCardButton: {
    margin: 5,
    padding: 10,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbarCardButtonIcon: {
    fontSize: 18,
    width: 18,
    height: 18,
    color: 'rgba(47, 128, 237, 1)',
  },
});
