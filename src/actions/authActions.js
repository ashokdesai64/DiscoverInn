import {callAPI} from './../Services/network';
import {apiUrls} from './../config/api';

export function userLogin(email, password) {
  return async function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let postData = {email, password};
      let response = await callAPI(apiUrls.login, postData);

      if (response.status) {
        dispatch({
          type: 'userLogin',
          userData: response.data,
          subtype: !!response && response.status ? 'success' : 'error',
        });
      } else {
        reject(response.message);
      }
    });
  };
}

export function userSignup(postData) {
  return async function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response = await callAPI(apiUrls.signup, postData);

      if (response.status) {
        // dispatch({
        //   type: 'userLogin',
        //   userData: response.data,
        //   subtype: !!response && response.status ? 'success' : 'error',
        // });
        alert(response.message);
        resolve(true);
      } else {
        reject(response.message);
      }
    });
  };
}

export function setPassword(postData) {
  return async function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response = await callAPI(apiUrls.setPassword, postData);

      if (response.status) {
        resolve(true);
      } else {
        reject(response.message);
      }
    });
  };
}

export function forgotPassword(postData) {
  return async function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response = await callAPI(apiUrls.forgotPassword, postData);

      if (response.status) {
        resolve(response.message);
      } else {
        reject(response.message);
      }
    });
  };
}
export function changePassword(postData) {
  return async function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response = await callAPI(apiUrls.changePassword, postData);

      if (response.status) {
        resolve(response.message);
      } else {
        reject(response.message);
      }
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
