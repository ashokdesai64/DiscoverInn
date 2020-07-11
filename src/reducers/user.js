const initialState = {
  introCompleted:false
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case 'userLogin': {
      console.log("after login action => ", action)
      return {
        ...state,
        loginError: action.subtype === 'error',
        loginSuccess: action.subtype === 'success',
        userData: action.subtype === 'success' ? action.userData : {},
      };
    }
    case 'userUpdate': {
      return {
        ...state,
        userData: action.userData,
      };
    }
    case 'userLogout': {
      return {
        ...state,
        userData: {},
        tripList:[]
      };
    }
    case 'introCompleted':{
      return {
        ...state,
        introCompleted:action.value
      }
    }
    default:
      return state;
  }
}
