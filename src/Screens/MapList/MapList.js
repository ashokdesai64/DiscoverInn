import React, { Fragment } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Item, Input, Button } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import styles from './MapList.style';
import Carousel from 'react-native-snap-carousel';
import Header from './../../components/header/header';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

const height = Dimensions.get('window').height;
class MapList extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'ShareList',
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
            showTripList: false,
            carouselItems: [
                {
                    image: require('./../../Images/login-bg.jpg'),
                    title: 'LonelyPlanet - Bordeaux',
                    view: 4,
                    rate: 2.5,
                    star: 4,
                    review: 2,
                    description:
                        "Seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama over......",
                },
                {
                    image: require('./../../Images/signup-bg.png'),
                    title: 'LonelyPlanet - Bankok',
                    view: 6,
                    rate: 4.5,
                    star: 4,
                    review: 7,
                    description:
                        "Seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama over......",
                },
                {
                    image: require('./../../Images/signup-bg.png'),
                    title: 'LonelyPlanet - New York',
                    view: 10,
                    rate: 3.5,
                    star: 1,
                    review: 3,
                    description:
                        "Seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama of cobbled alleyways, ancient ruins and white-domed cathedrals – a captivating scene crafted over seven cinematic hillsides overlooking the Rio Tejo cradle Lisbon's postcard-perfect panorama over......",
                },
            ],
        };
    }

    _renderItem({ item, index }) {
        var Star = [];
        for (var i = 0; i < item.star; i++) {
            Star.push(
                <Feather
                    style={styles.starIcon}
                    name="star"
                    size={15}
                    color="#FFAF2C"
                />,
            );
        }
        return (
            <View style={[styles.mapSlideCard, { height: height - 190 }]}>
                <View style={styles.mapSlideCardHeader}>
                    <Button style={styles.shareButton}>
                        <Feather style={styles.shareButtonText} name="share-2" />
                    </Button>
                    <Image style={styles.mapSlideCardImg} source={item.image} />
                    <View style={styles.mapSlideCardImg_overlay} />
                    <Button style={styles.mapButton}>
                        <Feather style={styles.shareButtonText} name="map" />
                    </Button>
                </View>
                <View style={styles.mapSlideCardBody}>
                    <View style={styles.mapSlideBadgeGroup}>
                        <View style={[styles.badgeRed, styles.badge]}>
                            <Text style={[styles.badgeText, styles.badgeRedText]}>
                                {item.view} <Feather style={styles.badgeIcon} name="eye" />
                            </Text>
                        </View>
                        <View style={[styles.badgeGreen, styles.badge]}>
                            <Text style={[styles.badgeText, styles.badgeGreenText]}>
                                {item.rate} <Feather style={styles.badgeIcon} name="star" />
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.mapSlideCardTitle}>{item.title}</Text>
                    <View style={styles.rateList}>
                        {Star}
                        <Text style={styles.rateListCount}>({item.review} Reviews)</Text>
                    </View>
                    <View style={styles.mapPins}>
                        <View style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                            <Feather size={14} name="camera" color={'white'} />
                        </View>
                        <View style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                            <Feather size={14} name="map-pin" color={'white'} />
                        </View>
                        <View style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                            <Feather size={14} name="coffee" color={'white'} />
                        </View>
                        <View style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                            <Feather size={14} name="music" color={'white'} />
                        </View>
                        <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                            <Feather size={14} name="smile" color={'#2F80ED'} />
                        </View>
                        <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                            <Feather size={14} name="speaker" color={'#2F80ED'} />
                        </View>
                        <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                            <Feather size={14} name="save" color={'#2F80ED'} />
                        </View>
                    </View>
                    <View style={{marginTop:20}}>

                        <View style={{borderBottomWidth:1,borderBottomColor:'rgba(224, 224, 224, 0.4)',flexDirection:'row',justifyContent:'space-evenly'}}>

                            <View style={{justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                                <Text style={{fontFamily:'Montserrat-Regular',color:'#BDBDBD',fontSize:12,fontWeight:'500'}}>travel type</Text>
                                <Text>Couple</Text>
                            </View>
                            <View style={{borderColor:'rgba(224, 224, 224, 0.4)',borderWidth:1}}></View>
                            <View style={{justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                                <Text style={{fontFamily:'Montserrat-Regular',color:'#BDBDBD',fontSize:12,fontWeight:'500'}}>Budget</Text>
                                <Text>$$$$</Text>
                            </View>

                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

                            <View style={{justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                                <Text style={{fontFamily:'Montserrat-Regular',color:'#BDBDBD',fontSize:12,fontWeight:'500'}}>Age</Text>
                                <Text>18 To 25    </Text>
                            </View>
                            <View style={{borderColor:'rgba(224, 224, 224, 0.4)',borderWidth:1}}></View>
                            <View style={{justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                                <Text style={{fontFamily:'Montserrat-Regular',color:'#BDBDBD',fontSize:12,fontWeight:'500'}}>Created</Text>
                                <Text>29 Days</Text>
                            </View>

                        </View>

                        <TouchableOpacity style={{paddingVertical:10,paddingHorizontal:30,marginTop:15,backgroundColor:'#2F80ED',width:140,justifyContent:'center',alignItems:'center',alignSelf:'center',borderRadius:5}}>
                            <Text style={{fontFamily:'Montserrat-Regular',fontSize:12,color:'white'}}>Add Review</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }

    render() {
        const { width } = Dimensions.get('window');
        return (
            <Fragment>
                <Header showMenu={true} title={'Discover Inn'} {...this.props} />
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
                        {/* <View style={styles.searchbarCard}>

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

                        </View> */}

                        <View style={styles.searchSection}>
                            <Feather style={styles.searchbarIcon} name="search" />
                            <TextInput
                                style={styles.input}
                                placeholder="What are you looking for?"
                                onChangeText={(searchString) => { this.setState({ searchString }) }}
                                underlineColorAndroid="transparent"
                            />
                            <Button style={styles.searchbarCardButton}>
                                <Feather style={styles.searchbarCardButtonIcon} name="arrow-right" size={20} color="blue" />
                            </Button>
                        </View>

                        <View style={styles.filterButton}>
                            <Text>Filter</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginTop: 20 }}>
                        <Text>231 Results Found</Text>
                        <TouchableOpacity onPress={() => this.setState({ showTripList: true })}>
                            <Text>Select Trip List  <Feather style={styles.searchbarIcon} name="chevron-down" /></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.shareMapContant}>
                        <Carousel
                            data={this.state.carouselItems}
                            sliderWidth={width}
                            itemWidth={310}
                            firstItem={1}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                            renderItem={this._renderItem}
                        />
                    </View>
                </ScrollView>

                <Dialog
                    rounded={false}
                    visible={this.state.showTripList}
                    hasOverlay={true}
                    animationDuration={1}
                    onTouchOutside={() => {
                        this.setState({ showTripList: false });
                    }}
                    dialogAnimation={
                        new FadeAnimation({
                            initialValue: 0, // optional
                            animationDuration: 150, // optional
                            useNativeDriver: true, // optional
                        })
                    }
                    onHardwareBackPress={() => {
                        this.setState({ showTripList: false });
                        return true;
                    }}
                    dialogStyle={{
                        width: width - 40,
                        height: 250,
                        position: 'absolute',
                        bottom: (height - 250) / 2,
                        elevation: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        shadowColor: 'black',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                    }}>
                    <DialogContent style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>+ Create Trip</Text>
                        </View>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}
export default MapList;
