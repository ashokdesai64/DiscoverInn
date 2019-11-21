import React, { Fragment } from 'react';
import { View, Dimensions, StyleSheet, Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class PinView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            saveToListModal: false,
            activeSlide: 0,
            carouselItems: [
                {
                    title: "Lonely Planet - Bangkok"
                },
                {
                    title: "Lonely Planet - Franch"
                },
                {
                    title: "Lonely Planet - Maxico"
                },
                {
                    title: "Lonely Planet - India"
                }
            ]
        };

    }
    _renderItemCate = ({ item, index }) => {
        return (
            <Image
                source={require("./../../Images/signup-bg.jpg")}
                style={styles.cateSlideCardIcon}
            />
        );
    };

    render() {
        return (
            <View style={styles.page}>
                <View style={{ top: 0, zIndex: 9999999, backgroundCoor: 'red', position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: DEVICE_WIDTH, padding: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name={'arrow-back'} size={20} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ saveToListModal: true })}>
                        <SimpleLineIcons name={'heart'} size={20} color={'white'} />
                    </TouchableOpacity>
                </View>
                <Carousel
                    data={this.state.carouselItems}
                    sliderWidth={DEVICE_WIDTH}
                    itemWidth={DEVICE_WIDTH}
                    containerCustomStyle={{ borderBottomWidth: 1, borderBottomColor: 'black', height: 375 }}
                    firstItem={0}
                    renderItem={this._renderItemCate}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                <Pagination
                    dotsLength={this.state.carouselItems.length}
                    activeDotIndex={this.state.activeSlide}
                    containerStyle={{ position: 'absolute', top: 300, left: 0 }}
                    dotStyle={{
                        width: 25,
                        height: 10,
                        backgroundColor: '#2F80ED',
                        margin: 0
                    }}
                    inactiveDotOpacity={1}
                    inactiveDotStyle={{
                        width: 15,
                        height: 7,
                        backgroundColor: 'white',
                        margin: 0
                        // Define styles for inactive dots here
                    }}
                    inactiveDotScale={0.6}
                />
                <ScrollView style={{ padding: 20, height: DEVICE_HEIGHT - 375, borderRadius: 20, backgroundColor: 'white' }}>
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 24, fontWeight: '500' }}>Planet - Bangkok</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                        <Icon name={'camera'} />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#828282' }}>  Sights</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular', color: '#828282' }}>This imposing early-20th-century Italianate stone mansion, set discreetly back from the street, belonged to Don José Lázaro Galdiano (1862–1947), a successful businessman and passionate patron of the arts. His astonishing private collection, which he bequeathed to the city upon his death, includes 13,000 works of art and objets d’art, a quarter of which are on show at any time. This imposing early-20th-century Italianate stone mansion, set discreetly back from the street, belonged to Don José Lázaro Galdiano (1862–1947), a successful businessman and passionate patron of the arts. His astonishing private collection, which he bequeathed to the city upon his death, includes 13,000 works of art and objets d’art, a quarter of which are on show at any time.</Text>
                </ScrollView>

                <Dialog
                    rounded={false}
                    visible={this.state.saveToListModal}
                    hasOverlay={true}
                    animationDuration={1}
                    onTouchOutside={() => {
                        this.setState({ saveToListModal: false });
                    }}
                    dialogAnimation={
                        new FadeAnimation({
                            initialValue: 0, // optional
                            animationDuration: 150, // optional
                            useNativeDriver: true, // optional
                        })
                    }
                    onHardwareBackPress={() => {
                        this.setState({ saveToListModal: false });
                        return true;
                    }}
                    dialogStyle={{
                        width: DEVICE_WIDTH,
                        height: 530,
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
                            <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: 'Montserrat-Regular' }}>Save to list</Text>
                            <TouchableOpacity onPress={() => this.setState({ saveToListModal: false })}>
                                <Icon name={'close'} color={'#BDBDBD'} size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 25, marginBottom: 5 }}>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, marginBottom: 5 }}>Name</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#BDBDBD',
                                    borderRadius: 5,
                                    padding: 10,
                                    justifyContent: 'flex-start'
                                }}
                                placeholder={'Enter trip list name'}
                                placeholderTextColor={'#828894'}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ paddingVertical: 10, paddingHorizontal: 30, marginTop: 15, justifyContent: 'center', alignItems: 'center', width: 140, alignSelf: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#BDBDBD' }}
                                onPress={() => this.setState({ saveToListModal: false })}
                            >
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#333' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ paddingVertical: 10, paddingHorizontal: 30, marginTop: 15, backgroundColor: '#2F80ED', justifyContent: 'center', alignItems: 'center', width: 140, alignSelf: 'center', borderRadius: 5 }}
                                onPress={() => this.setState({ saveToListModal: false })}
                            >
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: 'white' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.orDivider}>
                            <Text style={styles.orDividerText}>OR</Text>
                            <View style={styles.orDividerBorder}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F2F2F2', marginBottom: 15 }}>
                            <Text style={{ color: '#BDBDBD', fontSize: 14, fontWeight: '500' }}>London</Text>
                            <SimpleLineIcons name={'heart'} color={'#2F80ED'} size={15} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: '#BDBDBD', fontSize: 14, fontWeight: '500' }}>London</Text>
                            <SimpleLineIcons name={'heart'} color={'#2F80ED'} size={15} />
                        </View>

                        <View activeOpacity={0.8} style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 15, marginRight: 15, flexDirection: 'row', elevation: 3, marginTop: 20 }}
                            onPress={() => this.props.navigation.navigate('PinView')}>
                            <Image
                                style={{ width: 120, height: 95, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                                source={require("./../../Images/login-bg.jpg")}
                            />
                            <View style={{ backgroundColor: 'white', width: 200, padding: 10, justifyContent: 'center', alignItems: 'flex-start', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 200 - 20 }}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, fontWeight: '500' }}>Planet - Bangkok</Text>
                                    <SimpleLineIcons name={'heart'} size={15} color={'#EB5757'} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                    <Icon name={'camera'} />
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#828282' }}>  Sights</Text>
                                </View>
                                <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular', color: '#828282' }}>Australian chef-author David Thompson is the man behind one of Bangkok's</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{ paddingVertical: 10, paddingHorizontal: 30, marginTop: 15, backgroundColor: '#2F80ED', width: 140, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5 }}
                            onPress={() => this.setState({ saveToListModal: false })}
                        >
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: 'white' }}>Done</Text>
                        </TouchableOpacity>

                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        flex: 1
    },
    cateSlideCard: {
        height: 375,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 5 },
        shadowColor: 'rgba(6, 18, 42, 0.08);',
        shadowOpacity: 1.0,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 5,
    },
    cateSlideCardIcon: {
        height: 375,
        alignSelf: 'center',
    },
    cateSlideCardTitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 10,
        lineHeight: 12,
        marginTop: 10,
        color: '#333333',
        textAlign: 'center',
    },
    orDivider: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25,
    },
    orDividerText: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: '#333333',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        zIndex: 7,
    },
    orDividerBorder: {
        position: 'absolute',
        width: '100%',
        height: 1,
        zIndex: 6,
        borderStyle: 'dashed',
        backgroundColor: '#C4C4C4'
    },
});

export default PinView;
