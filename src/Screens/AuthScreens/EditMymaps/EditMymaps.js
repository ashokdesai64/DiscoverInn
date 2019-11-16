import React, {Fragment} from 'react';
import {View, Text, ScrollView, Switch} from 'react-native';
import {Item, Input, Button, Content, Accordion, Picker} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './EditMymaps.style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from './../../../components/header/header';
class EditMymaps extends React.Component {
  // static navigationOptions = {
  //   header:null,
  //   title: 'EditMymaps',
  //   headerStyle: {
  //     backgroundColor: 'transparent',
  //     borderBottomWidth: 0,
  //   },
  //   headerTitleStyle: {
  //     color: '#333333',
  //     fontSize: 16,
  //     fontFamily: 'Montserrat-Semibold',
  //   },
  //   headerTintColor: '#333333',
  //   headerLeftContainerStyle: {
  //     paddingLeft: 10,
  //   },
  // };
  constructor(props) {
    super(props);
    console.log();
  }
  state = {
    selected: 'User Picture',
    dataArray: [
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
        travelType: 'Couple',
        budget: '$$$$',
        created: '29 Days',
        age: '18 To 25',
        cover: ['User Picture', 'Default'],
        selectedCover: 'User Picture',
      },
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
        travelType: 'Couple',
        budget: '$$$$',
        created: '29 Days',
        age: '18 To 25',
        cover: ['User Picture', 'Default'],
        selectedCover: 'User Picture',
      },
      {
        title: 'LonelyPlanet - Bordeaux',
        public: true,
        travelType: 'Couple',
        budget: '$$$$',
        created: '29 Days',
        age: '18 To 25',
        cover: ['User Picture', 'Default'],
        selectedCover: 'User Picture',
      },
    ],
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  _renderHeader(item, expanded) {
    return (
      <View
        style={[
          styles.accordionCardHeader,
          expanded
            ? styles.accordionCardHeaderOpen
            : styles.accordionCardHeaderClose,
        ]}>
        <Feather style={styles.mapIcon} name="map" />
        <Text style={styles.accordionCardtitle}> {item.title}</Text>
        {expanded ? (
          <Feather style={styles.accordionCardHeaderIcon} name="chevron-up" />
        ) : (
          <Feather style={styles.accordionCardHeaderIcon} name="chevron-down" />
        )}
      </View>
    );
  }

  _renderContent = item => {
    var commentIndex = this.state.dataArray.findIndex(function(c) {
      return c.title == item.title;
    });
    return (
      <View style={styles.accordionCardBody}>
        <View style={styles.mymapsCard}>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Public</Text>
            <Switch
              style={styles.mymapsItemSwitch}
              value={item.public}
              thumbColor={'#2F80ED'}
              onValueChange={value =>
                (this.state.dataArray[commentIndex].public = item.public
                  ? false
                  : true)
              }
            />
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Travel Type</Text>
            <Text style={styles.mymapsItemValue}>{item.travelType}</Text>
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Budget</Text>
            <Text style={styles.mymapsItemValue}>{item.budget}</Text>
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Created</Text>
            <Text style={styles.mymapsItemValue}>{item.created}</Text>
          </View>
          <View style={styles.mymapsItem}>
            <Text style={styles.mymapsItemTitle}>Age</Text>
            <Text style={styles.mymapsItemValue}>{item.age}</Text>
          </View>
          <View style={[styles.mymapsItem, styles.mymapsItemCover]}>
            <Text style={styles.mymapsItemTitle}>Cover</Text>
            <View style={styles.mymapsItemCoverValue}>
              <Picker
                style={styles.mymapsItemDropdown}
                itemTextStyle={{color: '#788ad2'}}
                textStyle={styles.dropdownText}
                mode="dropdown"
                iosIcon={
                  <Feather name="chevron-down" style={styles.dropdownArrow} />
                }
                selectedValue={this.state.dataArray[commentIndex].selectedCover}
                onValueChange={value => {
                  var newstate = this.state.dataArray;
                  newstate[commentIndex].selectedCover = value;
                  this.setState({dataArray: newstate});
                }}>
                {item.cover.map(title => (
                  <Picker.Item label={title} value={title} />
                ))}
              </Picker>
              <View style={styles.editImage} onPress={() => {}}>
                <Feather style={styles.editImageIcon} name="edit-2" />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.mymapsAction}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => {}}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSuccess]}
            onPress={() => {}}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonDanger]}
            onPress={() => {}}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <Fragment style={styles.editMaps}>
        <Header showMenu={true} title={'My Maps'} {...this.props} />
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.pageContent}>
              <View searchBar style={styles.searchbarCard}>
                <Item style={styles.searchbarInputBox}>
                  <Feather style={styles.searchbarIcon} name="search" />
                  <Input
                    style={styles.searchbarInput}
                    placeholder="Search your maps"
                  />
                </Item>
                <Button style={styles.searchbarCardButton}>
                  <Feather
                    style={styles.searchbarCardButtonIcon}
                    name="arrow-right"
                  />
                </Button>
              </View>
              <Content style={styles.accordionCard}>
                <Accordion
                  style={styles.accordionCardContent}
                  dataArray={this.state.dataArray}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  onChange={this._updateSections}
                  contentStyle={{marginBottom: 10}}
                />
              </Content>
            </View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}
export default EditMymaps;
