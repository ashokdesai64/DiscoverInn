import {callAPI} from './../Services/network';

export function userLogin(email, password) {
  return async function(dispatch, getState) {
    let postData = {email, password};
    let response = await callAPI(
      'https://discover-inn.com/api/v1/login',
      postData,
    );
    console.log('login response =>< ', response);

    dispatch({
      type: 'userLogin',
      userData: response,
      subtype: !!response && response.status ? 'success' : 'error',
    });
  };
}

export function userLogout() {
  return async function(dispatch, getState) {
    dispatch({
      type: 'userLogout',
    });
  };
}

// export function logout(fcmToken) {
//   return function(dispatch, getState) {
//     return new Promise((resolve, reject) => {
//       dispatch({type: 'userLogout'});
//       resolve();
//     });
//   };
// }
