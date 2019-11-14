import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import MenuIcon from './../../Images/hamburger.png';
import colors from './../../config/colors';
import Dialog, { FadeAnimation, DialogContent } from 'react-native-popup-dialog';

const { width, height } = Dimensions.get('window');

//REDUX
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as authActions from './../../actions/authActions';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authModal: false
        }
    }

    render() {
        return (
            <View style={{ paddingHorizontal: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...this.props.style }}>
                {
                    this.props.showBack ?
                        <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => Actions.pop()}>
                            <MaterialIcons name={'arrow-back'} size={25} />
                        </TouchableOpacity>
                        :
                        this.props.showMenu ?
                            <TouchableOpacity style={{ height: 30, width: 30 }} onPress={() => Actions.drawerOpen()}>
                                <Image
                                    source={MenuIcon}
                                    style={{ height: 30, width: 30 }}
                                />
                            </TouchableOpacity>
                            :
                            <View></View>
                }


                <Text style={{ color: '#333', fontSize: 20, fontWeight: '600', fontFamily: 'Montserrat-Regular' }}>{this.props.title}</Text>

                {
                    this.props.showRightButton ?
                        <TouchableOpacity onPress={() => this.props.onRightPress && this.props.onRightPress()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.themeColor, fontSize: 16, ...this.props.rightTextStyle }}>{this.props.rightButtonText}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.setState({ authModal: true })} style={{ borderWidth: 2, height: 30, width: 30, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderColor: colors.themeColor }}>
                            <Icon name={'user'} size={20} color={colors.themeColor} />
                        </TouchableOpacity>
                }

                <Dialog
                    rounded={false}
                    hasOverlay={false}
                    visible={this.state.authModal}
                    animationDuration={1}
                    onTouchOutside={() => {
                        this.setState({ authModal: false });
                    }}
                    dialogAnimation={new FadeAnimation({
                        initialValue: 0, // optional
                        animationDuration: 150, // optional
                        useNativeDriver: true, // optional
                    })}
                    onHardwareBackPress={() => {
                        this.setState({ authModal: false });
                        return true;
                    }}
                    dialogStyle={{ width: width, borderTopRightRadius: 25, borderTopLeftRadius: 25, height: 220, position: 'absolute', bottom: -5 }}
                >
                    <DialogContent style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', width: width, borderRadius: 10, flexWrap: 'wrap', padding: 15 }}>

                        <View style={{ padding: 25 }}>

                            <TouchableOpacity
                                onPress={() => this.setState({ authModal: false }, () => this.props.navigation.navigate('LoginScreen'))}
                                style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginBottom: 20, borderBottomColor: '#F2F2F2', borderBottomWidth: 1, width: width - 100, paddingBottom: 10 }}>
                                <SimpleLineIcons name={'login'} color={'#828282'} style={{ marginRight: 25 }} size={25} />
                                <Text style={{ fontSize: 18, color: '#828282', fontFamily: 'Montserrat-Medium' }}>Sign In</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.setState({ authModal: false }, () => this.props.navigation.navigate('SignupScreen'))} style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginBottom: 20, borderBottomColor: '#F2F2F2', borderBottomWidth: 1, width: width - 100, paddingBottom: 10 }}>
                                <Icon name={'user-plus'} color={'#828282'} style={{ marginRight: 25 }} size={25} />
                                <Text style={{ fontSize: 18, color: '#828282', fontFamily: 'Montserrat-Medium' }}>Sign Up</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => console.log("test")} style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginBottom: 20, width: width - 100, paddingBottom: 10 }}>
                                <AntDesign name={'customerservice'} color={'#828282'} style={{ marginRight: 25 }} size={25} />
                                <Text style={{ fontSize: 18, color: '#828282', fontFamily: 'Montserrat-Medium' }}>How It Work</Text>
                            </TouchableOpacity>

                        </View>

                    </DialogContent>
                </Dialog>

            </View>
        );
    }
}
export default Header;
// function mapStateToProps(state) {
//     return {
//         userData: state.user.userData,
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         authAction: bindActionCreators(authActions, dispatch),
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
