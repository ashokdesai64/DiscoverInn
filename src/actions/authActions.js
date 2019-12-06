import { callAPI } from './../Services/network';
import { apiUrls } from './../config/api';
export function userLogin(email, password) {
  return async function (dispatch, getState) {
    return new Promise(async(resolve, reject) => {
      let postData = { email, password };
      let response = await callAPI(
        apiUrls.login,
        postData,
      );
      console.log('login response =>< ', response);

      if (response.status) {
        dispatch({
          type: 'userLogin',
          userData: response.data,
          subtype: !!response && response.status ? 'success' : 'error',
        });
      } else {
        reject(response.message)
      }

    })
  };

}

export function userLogout() {
  return async function (dispatch, getState) {
    dispatch({
      type: 'userLogout',
    });
  };
}