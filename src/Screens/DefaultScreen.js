import React, { Component } from "react";
import { View } from "react-native";
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './../actions/authActions';

class DefaultScreen extends Component {

    resetAction(routeName) {
        this.props.navigation.navigate(routeName);
    }

    redirectToApp(props) {
        if (props && props.userData && props.userData.userId) {
            this.resetAction("App");
        }
        else {
            this.resetAction("Auth");
        }
    }

    logout() {
        this.props.userAction.logout();
    }

    componentDidMount() {
        this.redirectToApp(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps => ",nextProps)
        this.redirectToApp(nextProps)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }} />
        );
    }
}

function mapStateToProps(state) {
    console.log("inside map state to props => ", state)
    return {
        userData: state.user && state.user.userData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userAction: bindActionCreators(userActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultScreen);
