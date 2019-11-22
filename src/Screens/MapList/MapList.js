import React, { Fragment } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Item, Input, Button, Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
        console.log("props => ", props)
        this.state = {
            showTripList: false,
            shareModal: false,
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
    navigateToMap() {
        this.props.navigation.navigate('MapView')
    }
    _renderItem(item, index) {
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
            <TouchableOpacity style={[styles.mapSlideCard, { height: height - 190 }]} activeOpacity={0.8} onPress={() => this.setState({ mapDetailsModal: true })}>
                <View style={styles.mapSlideCardHeader}>
                    <Button style={styles.shareButton} onPress={() => this.setState({ shareModal: true })}>
                        <Feather style={styles.shareButtonText} name="share-2" />
                    </Button>
                    <Image style={styles.mapSlideCardImg} source={item.image} />
                    <View style={styles.mapSlideCardImg_overlay} />
                    <Button style={styles.mapButton} onPress={() => this.navigateToMap()}>
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
                    <TouchableOpacity style={styles.rateList} onPress={() => this.setState({ showReviewModal: true })}>
                        {Star}
                        <Text style={styles.rateListCount}>({item.review} Reviews)</Text>
                    </TouchableOpacity>
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
                    <View style={{ marginTop: 20 }}>

                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(224, 224, 224, 0.4)', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', color: '#BDBDBD', fontSize: 12, fontWeight: '500' }}>travel type</Text>
                                <Text>Couple</Text>
                            </View>
                            <View style={{ borderColor: 'rgba(224, 224, 224, 0.4)', borderWidth: 1 }}></View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', color: '#BDBDBD', fontSize: 12, fontWeight: '500' }}>Budget</Text>
                                <Text>$$$$</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', color: '#BDBDBD', fontSize: 12, fontWeight: '500' }}>Age</Text>
                                <Text>18 To 25    </Text>
                            </View>
                            <View style={{ borderColor: 'rgba(224, 224, 224, 0.4)', borderWidth: 1 }}></View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', color: '#BDBDBD', fontSize: 12, fontWeight: '500' }}>Created</Text>
                                <Text>29 Days</Text>
                            </View>

                        </View>

                        <TouchableOpacity
                            style={{ paddingVertical: 10, paddingHorizontal: 30, marginTop: 15, backgroundColor: '#2F80ED', width: 140, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}
                            onPress={() => this.setState({ showAddReviewModal: true })}
                        >
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: 'white' }}>Add Review</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    render() {
        const { width } = Dimensions.get('window');
        return (
            <Fragment>
                <Header showMenu={true} title={'Discover Inn'} {...this.props} style={{ backgroundColor: '#F3F4F6' }} />
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width - 90 }}>
                        <View searchBar style={styles.searchbarCard}>
                            <Item style={styles.searchbarInputBox}>
                                <Feather style={styles.searchbarIcon} name="search" />
                                <Input
                                    style={styles.searchbarInput}
                                    placeholder="Type in your next destination!"
                                />
                            </Item>
                            <Button
                                style={styles.searchbarCardButton}
                                onPress={() => this.props.navigation.navigate("MapList")}
                            >
                                <Feather
                                    style={styles.searchbarCardButtonIcon}
                                    name="arrow-right"
                                />
                            </Button>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this.props.navigation.navigate("AddMap")}
                            style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 10, marginRight: 5 }}
                        >
                            <Feather style={styles.searchbarFilter} color={'#828282'} name="sliders" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this.props.navigation.navigate("FilterScreen")}
                            style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 10 }}
                        >
                            <Feather style={styles.searchbarFilter} color={'#828282'} name="filter" />
                        </TouchableOpacity>
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
                            renderItem={({ item, index }) => this._renderItem(item, index)}
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

                <Dialog
                    rounded={false}
                    visible={this.state.showAddReviewModal}
                    hasOverlay={true}
                    animationDuration={1}
                    onTouchOutside={() => {
                        this.setState({ showAddReviewModal: false });
                    }}
                    dialogAnimation={
                        new FadeAnimation({
                            initialValue: 0, // optional
                            animationDuration: 150, // optional
                            useNativeDriver: true, // optional
                        })
                    }
                    onHardwareBackPress={() => {
                        this.setState({ showAddReviewModal: false });
                        return true;
                    }}
                    dialogStyle={{
                        width: width,
                        height: 350,
                        position: 'absolute',
                        bottom: 0,
                        elevation: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        shadowColor: 'black',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                    }}>
                    <DialogContent style={{ padding: 20 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: 'Montserrat-Regular' }}>Add Review</Text>
                            <TouchableOpacity onPress={() => this.setState({ showAddReviewModal: false })}>
                                <Icon name={'close'} color={'black'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, marginBottom: 10 }}>Rating:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Feather style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                                <Feather style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                                <Feather style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                                <Feather style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                                <Feather style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                            </View>
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, marginBottom: 10 }}>Review:</Text>
                            <TextInput
                                numberOfLines={4}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#BDBDBD',
                                    borderRadius: 5,
                                    padding: 10,
                                    justifyContent: 'flex-start'
                                }}
                                textAlignVertical={'top'}
                                placeholder={'Type your review'}
                                placeholderTextColor={'#828894'}
                            />
                        </View>
                        <TouchableOpacity
                            style={{ paddingVertical: 10, paddingHorizontal: 30, marginTop: 15, backgroundColor: '#2F80ED', width: 140, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}
                            onPress={() => this.setState({ showAddReviewModal: false })}
                        >
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: 'white' }}>Submit</Text>
                        </TouchableOpacity>

                    </DialogContent>
                </Dialog>

                <Dialog
                    rounded={false}
                    visible={this.state.shareModal}
                    hasOverlay={true}
                    animationDuration={1}
                    onTouchOutside={() => {
                        this.setState({ shareModal: false });
                    }}
                    dialogAnimation={
                        new FadeAnimation({
                            initialValue: 0, // optional
                            animationDuration: 150, // optional
                            useNativeDriver: true, // optional
                        })
                    }
                    onHardwareBackPress={() => {
                        this.setState({ shareModal: false });
                        return true;
                    }}
                    dialogStyle={{
                        width: width,
                        height: 440,
                        position: 'absolute',
                        bottom: 0,
                        elevation: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        shadowColor: 'black',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                    }}>
                    <DialogContent style={{ padding: 20 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: 'Montserrat-Regular' }}>Share Your Map</Text>
                            <TouchableOpacity onPress={() => this.setState({ shareModal: false })}>
                                <Icon name={'close'} color={'black'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, marginBottom: 0 }}>Rating:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ paddingVertical: 10, paddingHorizontal: 30, marginTop: 10, justifyContent: 'center', alignItems: 'center', width: 140, alignSelf: 'center', borderRadius: 5, backgroundColor: '#4A6D9D' }}
                                    onPress={() => this.setState({ saveToListModal: false })}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Feather name={'facebook'} color={'white'} size={16} />
                                        <Text style={{ marginLeft: 10, fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#fff' }}>Facebook</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ paddingVertical: 10, paddingHorizontal: 30, marginTop: 10, backgroundColor: '#3BC1ED', justifyContent: 'center', alignItems: 'center', width: 140, alignSelf: 'center', borderRadius: 5 }}
                                    onPress={() => this.setState({ saveToListModal: false })}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Feather name={'twitter'} color={'white'} size={16} />
                                        <Text style={{ marginLeft: 10, fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#fff' }}>Facebook</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.orDivider}>
                            <Text style={styles.orDividerText}>OR</Text>
                            <View style={styles.orDividerBorder}></View>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, marginBottom: 7 }}>Review:</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#BDBDBD',
                                    borderRadius: 5,
                                    padding: 10,
                                    paddingVertical: 7,
                                    justifyContent: 'flex-start'
                                }}
                                placeholder={'Type your review'}
                                placeholderTextColor={'#828894'}
                            />
                        </View>

                        <View style={{ marginVertical: 15 }}>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, marginBottom: 7 }}>Review:</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#BDBDBD',
                                    borderRadius: 5,
                                    padding: 10,
                                    paddingVertical: 7,
                                    justifyContent: 'flex-start'
                                }}
                                placeholder={'Type your review'}
                                placeholderTextColor={'#828894'}
                            />
                        </View>

                        <TouchableOpacity
                            style={{ paddingVertical: 10, paddingHorizontal: 30, marginTop: 15, backgroundColor: '#2F80ED', width: 140, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}
                            onPress={() => this.setState({ shareModal: false })}
                        >
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: 'white' }}>Submit</Text>
                        </TouchableOpacity>

                    </DialogContent>
                </Dialog>

                <Dialog
                    rounded={false}
                    visible={this.state.mapDetailsModal}
                    hasOverlay={true}
                    animationDuration={1}
                    onTouchOutside={() => {
                        this.setState({ mapDetailsModal: false });
                    }}
                    dialogAnimation={
                        new FadeAnimation({
                            initialValue: 0, // optional
                            animationDuration: 150, // optional
                            useNativeDriver: true, // optional
                        })
                    }
                    onHardwareBackPress={() => {
                        this.setState({ mapDetailsModal: false });
                        return true;
                    }}
                    dialogStyle={{
                        width: width,
                        height: 470,
                        position: 'absolute',
                        bottom: 0,
                        elevation: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        shadowColor: 'black',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                    }}>
                    <DialogContent style={{ padding: 20, paddingBottom: 5 }}>

                        <ScrollView style={{ borderRadius: 20, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: 'Montserrat-Regular' }}>Map Details</Text>
                                <TouchableOpacity onPress={() => this.setState({ mapDetailsModal: false })}>
                                    <Icon name={'close'} color={'black'} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Image resizeMode={'stretch'} style={{ height: 180, width: null }} source={require('./../../Images/place.jpg')} />
                            </View>

                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 18, fontWeight: '500', marginTop: 15 }}>Planet - Bangkok</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                                <Text style={{ color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 12 }}>Traveller: </Text>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#828282' }}> Admin Discover</Text>
                            </View>
                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular', color: '#828282' }}>This imposing early-20th-century Italianate stone mansion, set discreetly back from the street, belonged to Don José Lázaro Galdiano (1862–1947), a successful businessman and passionate patron of the arts. His astonishing private collection, which he bequeathed to the city upon his death, includes 13,000 works of art and objets d’art, a quarter of which are on show at any time. This imposing early-20th-century Italianate stone mansion, set discreetly back from the street, belonged to Don José Lázaro Galdiano (1862–1947), a successful businessman and passionate patron of the arts. His astonishing private collection, essful businessman and passionate patron of the arts. His astonishing private collection, which he bequeathed to the city upon his death, includes 13,000 works of art and objets d’art, a quarter of which are on show at any time. This imposing early-20th-century Italianate stone mansion, set discreetly back from the street, belonged to Don José Lázaro Galdiano (1862–1947), a successful businessman and passionate patron of the arts. His astonishing private collection,which he bequeathed to the city upon his death, includes 13,000 works of art and objets d’art, a quarter of which are on show at any time.</Text>
                        </ScrollView>

                    </DialogContent>
                </Dialog>

                <Dialog
                    rounded={false}
                    visible={this.state.showReviewModal}
                    hasOverlay={true}
                    animationDuration={1}
                    onTouchOutside={() => {
                        this.setState({ showReviewModal: false });
                    }}
                    dialogAnimation={
                        new FadeAnimation({
                            initialValue: 0, // optional
                            animationDuration: 150, // optional
                            useNativeDriver: true, // optional
                        })
                    }
                    onHardwareBackPress={() => {
                        this.setState({ showReviewModal: false });
                        return true;
                    }}
                    dialogStyle={{
                        width: width,
                        height: 320,
                        position: 'absolute',
                        bottom: 0,
                        elevation: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        shadowColor: 'black',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                    }}>
                    <DialogContent style={{ padding: 20, paddingBottom: 5 }}>

                        <View style={{ borderRadius: 20, backgroundColor: 'white' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: 'Montserrat-Regular' }}>Map Review</Text>
                                <TouchableOpacity onPress={() => this.setState({ showReviewModal: false })}>
                                    <Icon name={'close'} color={'black'} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 20, elevation: 3, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10,  padding: 13,borderRadius:10,backgroundColor:'white' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={{ height: 36, width: 36, borderRadius: 36, marginRight: 10 }} source={require('./../../Images/place.jpg')} />
                                        <View>
                                            <Text style={{ color: 'black', fontFamily: 'Montserrat-Regular', fontSize: 12 }}>Meadow Rain Walker</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <MaterialIcons style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                                                <MaterialIcons style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                                                <MaterialIcons style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                                                <MaterialIcons style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                                                <MaterialIcons style={styles.starIcon} name="star" size={15} color="#FFAF2C" />
                                            </View>
                                        </View>
                                    </View>

                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#BDBDBD' }}>4 Weeks</Text>
                                </View>
                                <View style={{ backgroundColor: 'rgba(242, 242, 242, 0.5)', padding: 10,marginTop:15,borderRadius:15 }}>
                                    <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#BDBDBD'}}> The sun soaked in the sea and sands of Goa beckon a thirsty traveler(pun intended) from around the world, including yours truly! I have been to Goa at least four times but this was my first visit after eight long years. Yes friends, the waitwas excruciating for the sun, sand and the beer lover </Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{color:'red',alignSelf:'flex-end',marginTop:10,fontFamily: 'Montserrat-Regular', fontSize: 12}}>Report Abuse</Text>
                    </DialogContent>
                </Dialog>

            </Fragment>
        );
    }
}
export default MapList;
