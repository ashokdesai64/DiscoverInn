import React, { Fragment } from 'react';
import {
    View,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { ListItem, CheckBox, Picker, Textarea } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Header from './../../../components/header/header';
import styles from './AddMapDetail.style';

const DEVICE_WIDTH = Dimensions.get('window').width;

class AddMapDetail extends React.Component {
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

    render() {
        return (
            <Fragment>
                <ImageBackground
                    source={require('../../../Images/map-bg.png')}
                    style={{ width: '100%', height: '100%' }}>
                    <Header showBack={true} title={'Add Map'} {...this.props} rightEmpty={true} showRightButton={false} style={styles.bgTransfrent} />
                    <ScrollView style={styles.container}>

                        <View style={{ height: 120, backgroundColor: 'rgba(47, 128, 237, 0.1)', borderRadius: 10, borderWidth: 1, borderColor: '#2F80ED', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            <AntDesign name={'pluscircleo'} size={36} color={'#2F80ED'} />
                            <Text style={{ color: '#2F80ED', fontSize: 14, fontFamily: 'Montserrat-Regular' }}>Add Cover Image</Text>
                        </View>

                        <View>
                            <Text style={{ color: '#4F4F4F', fontSize: 14, fontFamily: 'Montserrat-Regular' }}>Add Pin</Text>
                            <View style={[styles.formGroup, styles.picker]}>
                                <Picker
                                    style={styles.formDropdown}
                                    selectedValue={this.state.date}
                                    textStyle={styles.dropdownText}
                                    mode="dropdown"
                                    iosHeader="Select Year"
                                    iosIcon={
                                        <Icon
                                            name="chevron-down"
                                            style={styles.formDropdownIcon}
                                        />
                                    }>
                                    <Picker.Item label="Start By Creating Your Own Trip List" value="" />
                                    <Picker.Item label="2017" value="2017" />
                                    <Picker.Item label="2018" value="2018" />
                                    <Picker.Item label="2019" value="2019" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.orDivider}>
                            <Text style={styles.orDividerText}>OR</Text>
                            <View style={styles.orDividerBorder}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ paddingVertical: 10, paddingHorizontal: 30, width: (DEVICE_WIDTH - 60) / 2, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#BDBDBD' }}
                                onPress={() => this.setState({ saveToListModal: false })}
                            >
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#333' }}>Pin Latitude</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ paddingVertical: 10, paddingHorizontal: 30, width: (DEVICE_WIDTH - 60) / 2, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#BDBDBD' }}
                                onPress={() => this.setState({ saveToListModal: false })}
                            >
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#333' }}>Pin Longitude</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.mapPins}>
                            <View style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                                <Icon size={14} name="camera" color={'white'} />
                            </View>
                            <View style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                                <Icon size={14} name="map-pin" color={'white'} />
                            </View>
                            <View style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                                <Icon size={14} name="coffee" color={'white'} />
                            </View>
                            <View style={[styles.singlePin, { backgroundColor: '#2F80ED' }]}>
                                <Icon size={14} name="music" color={'white'} />
                            </View>
                            <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                                <Icon size={14} name="smile" color={'#2F80ED'} />
                            </View>
                            <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                                <Icon size={14} name="speaker" color={'#2F80ED'} />
                            </View>
                            <View style={[styles.singlePin, { backgroundColor: 'rgba(47, 128, 237, 0.1)' }]}>
                                <Icon size={14} name="save" color={'#2F80ED'} />
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
                                placeholderTextColor={'#828894'}
                            />
                        </View>
                        

                        <View style={styles.footerButton}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonPrimary]}
                                onPress={() => { this.props.navigation.navigate('PinCategories') }}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </ImageBackground>
            </Fragment>
        );
    }
}
export default AddMapDetail;
