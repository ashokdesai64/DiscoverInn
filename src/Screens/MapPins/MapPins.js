import React, { Fragment } from 'react';
import { View, Text, ScrollView, Switch, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { Item, Input, Button, Picker } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './MapPins.style';
import Header from '../../components/header/header';
import _ from 'underscore'
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../actions/mapActions';

class MapPins extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pinList: [],
            filteredPinList: [],
            fetchingPins: true,
            searchTerm: ''
        };
    }

    componentWillMount() {
        this.fetchMapPins();
    }

    fetchMapPins() {
        const { params } = this.props.navigation.state;
        this.props.mapAction.getMapPinsList({ user_id: this.props.userData.id, map_id: params.mapID }).then((data) => {
            let mapData = { ...data };
            delete mapData.pin_list;
            console.log("data => ", data)
            let allPins = data.pin_list || [], searchTerm = this.state.searchTerm, filteredPinList = data.pin_list || [];
            console.log("filteredPinList => ", data.pin_list)
            if (allPins && allPins.length > 0 && searchTerm.trim() != '') {
                filteredPinList = allPins.filter((pin) => pin.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
            }

            this.setState({ pinList: data.pin_list, filteredPinList, mapData, fetchingPins: false });
        }).catch((err) => {
            this.setState({ pinList: [], fetchingPins: false });
        })
    }

    deleteMapPin(pinID) {
        // this.props.mapAction.deleteMapPin({ user_id: this.props.userData.id, map_id: params.mapID }).then((data) => {
        //     console.log("data.data.pin_list => ", data.pin_list)
        //     this.setState({ pinList: data.pin_list });
        // }).catch((err) => {
        //     this.setState({ pinList: [] });
        // })
    }

    tripListSelected = tripID => {
        const { params } = this.props.navigation.state;
        this.setState({ selectedTripID: tripID });

        if (tripID) {
            this.props.mapAction.addPinFromTripList({ user_id: this.props.userData.id, map_id: params.mapID, favorite_id: tripID }).then((data) => {
                this.setState({ fetchingPins: true }, () => {
                    this.fetchMapPins();
                })
            }).catch((err) => {
                console.log("err => ", err)
            })
        }
    };

    searchPins = _.debounce(() => {
        let allPins = this.state.pinList, searchTerm = this.state.searchTerm, filteredPinList = [];
        if (searchTerm.trim() != '') {
            filteredPinList = allPins.filter((pin) => pin.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
        } else {
            filteredPinList = [...allPins]
        }
        this.setState({ filteredPinList });
    }, 250)

    render() {
        const { params } = this.props.navigation.state;

        return (
            <ScrollView
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}>
                <Header showBack={true} title={params.mapName || ''} {...this.props} />
                <View style={styles.container}>
                    <View style={styles.pageContent}>
                        {
                            this.props.tripList && this.props.tripList.length > 0 ?
                                <>
                                    <Text style={styles.headingText}>Add from My Trip List</Text>
                                    <View style={[styles.formGroup, styles.picker]}>
                                        <Picker
                                            style={styles.formDropdown}
                                            placeholderStyle={{ color: '#2874F0' }}
                                            selectedValue={this.state.selectedTripID}
                                            textStyle={styles.dropdownText}
                                            onValueChange={this.tripListSelected}
                                            mode="dropdown"
                                            iosHeader="Select a Trip List"
                                            iosIcon={
                                                <Feather
                                                    name="chevron-down"
                                                    style={styles.formDropdownIcon}
                                                />
                                            }>
                                            <Picker.Item label="Select a Trip List" value="" />
                                            {
                                                this.props.tripList.map((value, index) => {
                                                    return (
                                                        <Picker.Item key={`trip${index}`} label={value.name} value={value.id} />
                                                    )
                                                })
                                            }
                                        </Picker>
                                    </View>
                                </>
                                :
                                null
                        }

                        {
                            this.state.fetchingPins ?
                                <View style={styles.container}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, marginBottom: 50 }}>
                                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, color: '#aaa', marginRight: 10 }}>Fetching Pins</Text>
                                        <ActivityIndicator size={'small'} color={'#aaa'} />
                                    </View>
                                </View>
                                :
                                <>
                                    <Text style={styles.headingText}>Add from My Travel</Text>
                                    <View searchBar style={styles.searchbarCard}>
                                        <Item style={styles.searchbarInputBox}>
                                            <Feather style={styles.searchbarIcon} name="search" />
                                            <Input
                                                style={styles.searchbarInput}
                                                placeholder="Search MyTravel Pins"
                                                value={this.state.searchTerm}
                                                onChangeText={(searchTerm) => this.setState({ searchTerm }, () => { this.searchPins() })}
                                            />
                                        </Item>
                                        <TouchableOpacity style={styles.searchbarCardButton}>
                                            <Feather
                                                style={styles.searchbarCardButtonIcon}
                                                name="arrow-right"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        (!this.state.filteredPinList || this.state.filteredPinList.length <= 0) ?
                                            <View style={styles.container}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, marginBottom: 50 }}>
                                                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, color: '#aaa', marginRight: 10 }}>No Pins Found</Text>
                                                </View>
                                            </View>
                                            :
                                            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 10 }}>
                                                <View style={styles.categorypinList}>
                                                    {
                                                        this.state.filteredPinList.map(pin => (
                                                            <Item style={styles.categorypinItem}>
                                                                <Feather name="map-pin" style={styles.pinIcon}></Feather>
                                                                <Text style={styles.categorypinTitle}>{pin.name}</Text>
                                                                <View style={styles.categorypinAction}>
                                                                    <TouchableOpacity
                                                                        style={[
                                                                            styles.iconButton,
                                                                            styles.iconButtonPrimary,
                                                                            { marginRight: 5 },
                                                                        ]}
                                                                        onPress={() =>
                                                                            this.props.navigation.navigate('MapView')
                                                                        }>
                                                                        <Feather
                                                                            style={[
                                                                                styles.iconButtonIcon,
                                                                                styles.iconButtonIconPrimary,
                                                                            ]}
                                                                            name="eye"
                                                                        />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        style={[
                                                                            styles.iconButton,
                                                                            styles.iconButtonWarning,
                                                                            { marginRight: 5 },
                                                                        ]}
                                                                        onPress={() =>
                                                                            this.props.navigation.navigate('AddMapDetail', { type: 'add', mapData: this.state.mapData })
                                                                        }>
                                                                        <Feather
                                                                            style={[
                                                                                styles.iconButtonIcon,
                                                                                styles.iconButtonIconWarning,
                                                                            ]}
                                                                            name="edit-2"
                                                                        />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        style={[styles.iconButton, styles.iconButtonDanger]}
                                                                        onPress={() =>
                                                                            this.deleteMapPin(pin.id)
                                                                        }>
                                                                        <Feather
                                                                            style={[
                                                                                styles.iconButtonIcon,
                                                                                styles.iconButtonIconDanger,
                                                                            ]}
                                                                            name="trash-2"
                                                                        />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </Item>
                                                        ))
                                                    }
                                                </View>
                                            </ScrollView>
                                    }
                                </>
                        }
                        <Button
                            style={[
                                styles.button,
                                styles.buttonPrimary,
                                styles.buttonEditPin,
                            ]}
                            onPress={() => this.props.navigation.navigate('AddMapDetail', { type: 'add', mapID: params.mapID, mapName: params.mapName })}
                        >
                            <Text style={styles.buttonText}>Add Pins</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView >
        );
    }
}


function mapStateToProps(state) {
    console.log(state.maps)
    return {
        userData: state.user.userData,
        tripList: state.maps.tripList,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        mapAction: bindActionCreators(mapActions, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapPins);