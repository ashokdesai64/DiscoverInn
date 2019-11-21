import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
    },
    scrollView: {
        paddingRight: 0,
        marginRight: 0,
        paddingVertical: 5,
        backgroundColor: '#F3F4F6'
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10
    },
    orDivider: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
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
    filterButton: {
        borderColor: '#ddd',
        paddingHorizontal: 10,
        padding: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        color: '#424242'
    },
    searchbarCard: {
        marginHorizontal: 5,
        marginLeft: 15,
        marginVertical: 0,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    searchbarInputBox: {
        flex: 1,
        borderBottomWidth: 0,
    },
    searchbarIcon: {
        fontSize: 16,
        borderBottomWidth: 0,
        paddingLeft: 10,
        paddingRight: 5,
    },
    searchbarInput: {
        backgroundColor: 'transparent',
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        padding: 0,
        height: 40,
    },
    searchbarFilter: {
        fontSize: 16,
        borderBottomWidth: 0,
        color: '#828282',
    },
    searchbarCardButton: {
        margin: 5,
        padding: 10,
        width: 32,
        height: 32,
        backgroundColor: 'rgba(47, 128, 237, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchbarCardButtonIcon: {
        fontSize: 18,
        width: 18,
        height: 18,
        color: 'rgba(47, 128, 237, 1)',
    },
    mapSlideCard: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    mapSlideCardImg: {
        width: 300,
        height: 180,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    mapSlideCardImg_overlay: {
        width: 300,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        height: 180,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    mapSlideCardHeader: {
        height: 180,
        position: 'relative',
    },
    mapSlideCardBody: {
        backgroundColor: '#fff',
        padding: 15,
        paddingBottom: 30,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 0,
        marginRight: 0,
        width: 300,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
    },
    mapSlideBadgeGroup: {
        flexDirection: 'row',
    },
    badge: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        marginBottom: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginRight: 5,
        marginBottom: 5,
    },
    badgeRed: {
        backgroundColor: 'rgba(235, 87, 87, 0.2)',
    },
    badgeRedText: {
        color: '#EB5757',
    },
    badgeGreen: {
        backgroundColor: 'rgba(39, 174, 96, 0.2)',
    },
    badgeGreenText: {
        color: '#27AE60',
    },
    badgeText: {
        fontSize: 10,
        color: '#fff',
        borderRadius: 5,
        fontFamily: 'Montserrat-Medium',
        alignItems: 'center',
    },
    badgeIcon: {
        fontSize: 10,
    },
    mapSlideCardTitle: {
        fontSize: 18,
        color: '#333333',
        fontFamily: 'Montserrat-Medium',
        marginBottom: 5,
        fontWeight: '600'
    },
    mapPins: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
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
    rateList: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    starIcon: {
        paddingRight: 3,
    },
    rateListCount: {
        color: '#BDBDBD',
        fontSize: 12,
        lineHeight: 15,
        marginLeft: 10,
    },
    shareMapContant: {
        paddingTop: 0,
    },
    mapShareDescText: {
        color: '#BDBDBD',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
    },
    shareButton: {
        position: 'absolute',
        left: 15,
        top: 0,
        backgroundColor: 'transparent',
        zIndex:99999
    },
    mapButton: {
        position: 'absolute',
        right: 15,
        top: 0,
        backgroundColor: 'transparent',
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default styles;
