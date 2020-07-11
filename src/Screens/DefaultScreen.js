import React, {Component} from 'react';
import {View, BackHandler, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from './../actions/authActions';
import * as mapActions from './../actions/mapActions';

class DefaultScreen extends Component {
  resetAction(routeName) {
    this.props.navigation.navigate(routeName);
  }

  redirectToApp(props) {
    let {params} = props.navigation.state;
    console.log("params => ",params)
    // if (props && props.userData && props.userData.userId) {
    if (params && params.signInFromIntro) {
      this.resetAction('Auth');
    } else {
      this.resetAction('App'); //WalkThrough
    }
    // } else {
    //   this.resetAction('Auth');
    // }
  }

  logout() {
    this.props.userAction.logout();
  }

  componentDidMount() {
    this.fetchInitialData();
    this.redirectToApp(this.props);
  }

  fetchInitialData() {
    this.props.mapAction.loadPopularAndRated();
    this.props.mapAction.fetchTripList();

    if (this.props && !this.props.categories) {
      this.props.mapAction.loadCategories();
    }

    if (this.props && !this.props.travelTypes) {
      this.props.mapAction.loadTravelTypes();
    }

    if (this.props && !this.props.budgetLists) {
      this.props.mapAction.loadBudgetList();
    }

    if (this.props && !this.props.ageLists) {
      this.props.mapAction.loadAgeList();
    }

    if (this.props && !this.props.createdWithins) {
      this.props.mapAction.loadCreatedWithin();
    }

    if (this.props && this.props.userData && this.props.userData.id) {
      this.props.mapAction.fetchMyReviews({
        user_id: this.props.userData.id,
        page: 1,
      });
      this.props.mapAction.fetchVisitorReviews({user_id: 1, page: 1});
    }

    if (this.props && !this.props.allUserNames) {
      this.props.mapAction.fetchAllUserNames({user_id: 1, page: 1});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.redirectToApp(nextProps);
  }

  render() {
    return <View style={{flex: 1, backgroundColor: '#fff'}} />;
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user && state.user.userData,
    categories: state.maps.categories,
    travelTypes: state.maps.travelTypes,
    budgetLists: state.maps.budgetLists,
    ageLists: state.maps.ageLists,
    createdWithins: state.maps.createdWithins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAction: bindActionCreators(userActions, dispatch),
    mapAction: bindActionCreators(mapActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultScreen);
