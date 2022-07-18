import {callAPI} from './../Services/network';
import {apiUrls} from './../config/api';

export function userLogin(email, password) {
  return async function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let postData = {email, password};
      let response;
      try {
        response = await callAPI(apiUrls.login, postData);
      } catch (err) {
        reject(err.err);
        return;
      }
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
      let response;
      try {
        response = await callAPI(apiUrls.signup, postData);
      } catch (err) {
        reject(err.err);
        return;
      }
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
      let response;
      try {
        response = await callAPI(apiUrls.setPassword, postData);
      } catch (err) {
        reject(err.err);
        return;
      }
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
      let response;
      try {
        response = await callAPI(apiUrls.forgotPassword, postData);
      } catch (err) {
        reject(err.err);
        return;
      }
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
      let response;
      try {
        response = await callAPI(apiUrls.changePassword, postData);
      } catch (err) {
        reject(err.err);
        return;
      }
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

export function deleteAccount(postData) {
  return async function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.deleteAccount, postData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  };
}