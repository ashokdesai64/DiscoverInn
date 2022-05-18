import {callAPI} from './../Services/network';
import {apiUrls} from './../config/api';

export function updateProfile(postData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.updateProfile, postData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'userUpdate',
          userData: response.data,
        });
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}
