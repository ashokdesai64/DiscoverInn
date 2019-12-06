import { callAPI } from './../Services/network';
import { apiUrls } from './../config/api';

export function updateProfile(postData) {
    return async function (dispatch, getState) {
        let response = await callAPI(
            apiUrls.updateProfile,
            postData,
        );
        if(response.status){
            dispatch({
                type: 'userUpdate',
                userData: response.data
            });
        }
        
    };
}