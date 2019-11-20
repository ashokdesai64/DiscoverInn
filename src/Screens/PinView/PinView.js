import React, { Fragment } from 'react';
import { View, Dimensions, StyleSheet, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class PinView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
    _renderItem() {
        <View style={{ backgroundColor: 'yellow', flex: 1 }}>
            <Image
                source={require('./../../Images/signup-bg.jpg')}
                style={{ height: 350, width: DEVICE_WIDTH, backgroundColor: 'red' }}
            />
        </View>
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
                <View style={{ top: 0, zIndex: 9999999, backgroundCoor: 'red', position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, width: DEVICE_WIDTH, padding: 15 }}>
                    <Icon name={'arrow-back'} size={20} color={'white'} />
                    <SimpleLineIcons name={'heart'} size={20} color={'white'} />
                </View>
                <Carousel
                    data={this.state.carouselItems}
                    sliderWidth={DEVICE_WIDTH}
                    itemWidth={DEVICE_WIDTH}
                    sliderHeight={375}
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
                <View style={{padding:20}}>
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 24, fontWeight: '500' }}>Planet - Bangkok</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 5 }}>
                        <Icon name={'camera'} />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#828282' }}>  Sights</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular', color: '#828282' }}>Australian chef-author David Thompson is the man behind one of Bangkok's</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
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
});

export default PinView;
