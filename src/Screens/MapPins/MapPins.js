import React, { Fragment } from 'react';
import { View, Text, ScrollView, Switch, Image, TouchableOpacity, } from 'react-native';
import { Item, Input, Button } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './MapPins.style';
import Header from '../../components/header/header';

//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from './../../actions/mapActions';

class MapPins extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pinList: [],
        };
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.props.mapAction.getMapPinsList({ user_id: this.props.userData.id, map_id: params.mapID }).then((data) => {
            console.log("data.data.pin_list => ", data.pin_list);
            let mapData = {...data};
            delete mapData.pin_list;
            this.setState({ pinList: data.pin_list,mapData });
        }).catch((err) => {
            this.setState({ pinList: [] });
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

    render() {
        const { params } = this.props.navigation.state;
        console.log("this.state => ", this.state.pinList)
        return (
            <ScrollView
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}>
                <Header showBack={true} title={params.mapName || ''} {...this.props} />
                <View style={styles.container}>
                    <View style={styles.pageContent}>
                        <View searchBar style={styles.searchbarCard}>
                            <Item style={styles.searchbarInputBox}>
                                <Feather style={styles.searchbarIcon} name="search" />
                                <Input
                                    style={styles.searchbarInput}
                                    placeholder="Search MyTravel Pins"
                                />
                            </Item>
                            <TouchableOpacity style={styles.searchbarCardButton}>
                                <Feather
                                    style={styles.searchbarCardButtonIcon}
                                    name="arrow-right"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.MainContent}>
                            <View style={styles.categorypinList}>
                                {
                                    this.state.pinList.map(pin => (
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
                                                        this.props.navigation.navigate('AddMapDetail',{type:'add',mapData:this.state.mapData})
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
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


function mapStateToProps(state) {
    return {
        userData: state.user.userData,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        mapAction: bindActionCreators(mapActions, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapPins);