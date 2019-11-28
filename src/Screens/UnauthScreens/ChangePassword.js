import React, { Fragment } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import styles from './Unauthscreens.style';
import Header from './../../components/header/header'

class ChangePassword extends React.Component {

    render() {
        return (
            <Fragment>
                <SafeAreaView
                    style={{
                        width: '100%',
                        height: '100%',
                    }}>
                    <Header
                        showBack={true}
                        title={'Discover Inn'}
                        {...this.props}
                        rightEmpty={true}
                        showRightButton={true}
                        rightButtonText={'save'}
                        rightTextStyle={{ color: '#27AE60', fontFamily: 'Montserrat-Regular' }}
                    />
                    <View style={[styles.container,{paddingHorizontal:15}]}>
                        <Text style={{ fontSize: 24, fontFamily: 'Montserrat-SemiBold', color: '#fff', }}>Sign Up</Text>
                        <View style={styles.formGroup}>
                            <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Montserrat-Regular', marginBottom: 5, paddingLeft: 10, }}>First Name</Text>
                            <TextInput style={{ borderWidth: 1, borderColor: '#000', borderRadius: 5, height: 48, paddingLeft: 15, paddingRight: 15, fontFamily: 'Montserrat-Regular', color: '#000', }} />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Montserrat-Regular', marginBottom: 5, paddingLeft: 10, }}>Last Name</Text>
                            <TextInput style={{ borderWidth: 1, borderColor: '#000', borderRadius: 5, height: 48, paddingLeft: 15, paddingRight: 15, fontFamily: 'Montserrat-Regular', color: '#000', }} />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Montserrat-Regular', marginBottom: 5, paddingLeft: 10, }}>Email</Text>
                            <TextInput style={{ borderWidth: 1, borderColor: '#000', borderRadius: 5, height: 48, paddingLeft: 15, paddingRight: 15, fontFamily: 'Montserrat-Regular', color: '#000', }} />
                        </View>
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}
export default ChangePassword;
