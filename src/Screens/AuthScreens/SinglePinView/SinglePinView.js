import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Item, Input, Button, Content, Accordion, Picker} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './SinglePinView.style';
import Header from '../../../components/header/header';

class SinglePinView extends React.Component {
  static navigationOptions = {
    title: 'SinglePinView',
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#333333',
      fontSize: 16,
      fontFamily: 'Montserrat-Semibold',
    },
    headerTintColor: '#333333',
    headerLeftContainerStyle: {
      paddingLeft: 10,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      textdata: ['LonelyPlanet - San Francisco', 'LonelyPlanet - Bangkok'],
    };
  }

  render() {
    console.log(this.props.navigation);
    const {params} = this.props.navigation.state;
    let headerText = params.headerTitle;
    return (
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}>
        <Header showBack={true} title={headerText} {...this.props} />
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
            <View style={styles.MainContent}>
              <View style={styles.categorypinList}>
                {this.state.textdata.map(item => (
                  <Item style={styles.categorypinItem}>
                    <Feather name="map-pin" style={styles.pinIcon}></Feather>
                    <Text style={styles.categorypinTitle}>{item}</Text>
                    <View style={styles.categorypinAction}>
                      <Button
                        style={[styles.iconButton, styles.iconButtonPrimary]}>
                        <Feather
                          style={[
                            styles.iconButtonIcon,
                            styles.iconButtonIconPrimary,
                          ]}
                          name="map"
                        />
                      </Button>
                      <Button
                        style={[styles.iconButton, styles.iconButtonWarning]}>
                        <Feather
                          style={[
                            styles.iconButtonIcon,
                            styles.iconButtonIconWarning,
                          ]}
                          name="edit-2"
                        />
                      </Button>
                    </View>
                  </Item>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default SinglePinView;
