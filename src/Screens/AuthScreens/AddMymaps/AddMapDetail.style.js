import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 2,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    formDropdown: {
        height: 40,
        fontSize: 12,
        width: 'auto',
        borderRadius: 5,
        fontFamily: 'Montserrat-Regular',
        paddingRight: 5,
        color: '#333'
    },
    formDropdownIcon: {
        color: '#828282',
    },
    dropdownText: {
        color: '#333333',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        marginRight: 0,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#BDBDBD',
        marginRight: 5,
        borderRadius: 5
    },
    orDivider: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
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
    footerButton: {
        flexDirection: 'row',
        marginTop: 0,
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        height: 40,
        alignSelf: 'center',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    buttonPrimary: {
        backgroundColor: '#2F80ED',
        color: '#fff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
    },
    mapPins: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:20
    },
    singlePin: {
        color: 'white',
        fontSize: 14,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 8
    },
});

export default styles;
