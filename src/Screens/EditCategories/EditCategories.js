import React, { Fragment } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { ListItem, CheckBox, Picker, Textarea } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Feather';
import Header from './../../components/header/header';
import styles from './EditCategories.style';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './../../selection.json';
const IconMoon = createIconSetFromIcoMoon(fontelloConfig);

const DEVICE_WIDTH = Dimensions.get('window').width;

class EditCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            travel_type_select: '',
            budget_select: '',
            age_at_travel_check: '',
            travel_type: [
                'Couple',
                'Solo',
                'Friends',
                'Business',
                'Family',
                'Off the beaten track',
            ],
            budget: ['$', '$$', '$$$', '$$$$'],
            age_at_travel: [
                'Below 18',
                '18 To 25',
                '25 To 35',
                '35 To 45',
                '45 To 60',
                'Above 60',
            ],
            month: 'select month',
            date: 'select date',
            carouselItems: [
                {
                    title: 'Lonely Planet - Bangkok',
                },
                {
                    title: 'Lonely Planet - Franch',
                },
                {
                    title: 'Lonely Planet - Maxico',
                },
                {
                    title: 'Lonely Planet - India',
                },
            ],
        };
    }

    // chnage_checkboxvalue = (statename, value) => {
    //   if (this.state[statename].indexOf(value) != -1) {
    //     this.state[statename].splice(this.state[statename].indexOf(value), 1);
    //   } else {
    //     this.setState({statename: this.state[statename].push(value)});
    //   }
    //   this.setState({statename: this.state.statename});
    // };

    change_month = month => {
        this.setState({ month: month });
    };
    change_date = date => {
        this.setState({ date: date });
    };

    _renderItem({ item, index }) {
        return (
            <View style={styles.mapSlidCard}>
                <View style={styles.mapSlidCardInner}>
                    <Image
                        style={styles.mapSlideCardImg}
                        source={require('./../../Images/login-bg.jpg')}
                    />
                </View>
            </View>
        );
    }

    render() {
        return (
            <Fragment>
                <ImageBackground
                    source={require('../../Images/map-bg.png')}
                    style={{ width: '100%', height: '100%' }}>
                    <Header showBack={true} title={'Edit Categories'} {...this.props} rightEmpty={true} showRightButton={false} style={styles.bgTransfrent} />
                    <ScrollView style={styles.container}>

                        <View>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, fontFamily: 'Montserrat-Regular', marginBottom: 10 }}>Categories</Text>
                            <View style={styles.mapPins}>

                                <View style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                                    <IconMoon size={14} name="sights" color={'white'} />
                                </View>
                                <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                                    <IconMoon size={14} name="activities" color={'#2F80ED'} />
                                </View>
                                <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                                    <IconMoon size={14} name="restaurants" color={'#2F80ED'} />
                                </View>
                                <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                                    <IconMoon size={14} name="nightlife" color={'#2F80ED'} />
                                </View>

                                <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                                    <IconMoon size={14} name="transportations" color={'#2F80ED'} />
                                </View>
                                <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                                    <IconMoon size={14} name="shopping" color={'#2F80ED'} />
                                </View>
                                <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                                    <IconMoon size={14} name="other" color={'#2F80ED'} />
                                </View>

                            </View>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, marginBottom: 5 }}>Pin Title</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#BDBDBD',
                                    borderRadius: 5,
                                    padding: 10,
                                    justifyContent: 'flex-start'
                                }}
                                placeholderTextColor={'#828894'}
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Carousel
                                data={this.state.carouselItems}
                                sliderWidth={DEVICE_WIDTH}
                                itemWidth={240}
                                firstItem={1}
                                inactiveSlideOpacity={1}
                                inactiveSlideScale={1}
                                renderItem={this._renderItem}
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, marginBottom: 10 }}>Description</Text>
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
                                placeholderTextColor={'#828894'}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                            <View style={{ marginRight: 13, marginBottom: 15 }}>
                                <Image
                                    style={{ height: 50, width: 50, borderRadius: 5 }}
                                    source={require('./../../Images/login-bg.jpg')}
                                />
                                <View style={{ backgroundColor: 'white', height: 20, width: 20, position: 'absolute', top: -5, right: -5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 }}>
                                    <Icon name={'x'} color={'red'} />
                                </View>
                            </View>
                            <View style={{ marginRight: 13, marginBottom: 15 }}>
                                <Image
                                    style={{ height: 50, width: 50, borderRadius: 5 }}
                                    source={require('./../../Images/login-bg.jpg')}
                                />
                                <View style={{ backgroundColor: 'white', height: 20, width: 20, position: 'absolute', top: -5, right: -5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 }}>
                                    <Icon name={'x'} color={'red'} />
                                </View>
                            </View>
                            <View style={{ marginRight: 13, marginBottom: 15 }}>
                                <Image
                                    style={{ height: 50, width: 50, borderRadius: 5 }}
                                    source={require('./../../Images/login-bg.jpg')}
                                />
                                <View style={{ backgroundColor: 'white', height: 20, width: 20, position: 'absolute', top: -5, right: -5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 }}>
                                    <Icon name={'x'} color={'red'} />
                                </View>
                            </View>
                            <View style={{ marginRight: 13, marginBottom: 15, borderWidth: 1, borderColor: '#2F80ED', borderStyle: 'dashed', height: 50, width: 50, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name={'plus'} color={'#2F80ED'} />
                                <Text style={{ color: '#828282', fontSize: 8, fontFamily: 'Montserrat-Regular', textAlign: 'center', marginRight: 0, }}>Choose Files</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 }}>
                            <Icon name={'map-pin'} color={'#2F80ED'} size={18} style={{ marginRight: 10 }} />
                            <Text style={{ color: '#828282', fontSize: 13, fontFamily: 'Montserrat-Regular' }}>44.8498935 , -0.56082170000002</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 20
                            }}>

                            <TouchableOpacity
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 30,
                                    marginTop: 5,
                                    backgroundColor: '#2F80ED',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: (DEVICE_WIDTH / 2) - 30,
                                    alignSelf: 'center',
                                    borderRadius: 5,
                                }}
                                onPress={() => this.setState({ saveToListModal: false })}>
                                <Text
                                    style={{
                                        fontFamily: 'Montserrat-Regular',
                                        fontSize: 12,
                                        color: 'white',
                                    }}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 30,
                                    marginTop: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: (DEVICE_WIDTH / 2) - 30,
                                    alignSelf: 'center',
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: '#EB5757',
                                    backgroundColor: '#EB5757'
                                }}
                                onPress={() => this.setState({ saveToListModal: false })}>
                                <Text
                                    style={{
                                        fontFamily: 'Montserrat-Regular',
                                        fontSize: 12,
                                        color: '#fff',
                                    }}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </ImageBackground>
            </Fragment>
        );
    }
}
export default EditCategories;
