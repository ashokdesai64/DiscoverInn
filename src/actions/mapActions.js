import { callAPI } from './../Services/network';
import { apiUrls } from './../config/api';

export function loadPopularAndRated() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let response = await callAPI(
                apiUrls.popularAndRated,
                {},
                'GET'
            );
            if (response.status) {
                console.log("response data => ", response.data)
                dispatch({
                    type: 'popularMaps',
                    popularMaps: response.popular
                });
                dispatch({
                    type: 'topRatedMaps',
                    topRatedMaps: response.toprated
                });
                resolve(response.data);
            } else {
                reject(response.message)
            }
        })
    };
}

export function loadCategories() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let response = await callAPI(
                apiUrls.getCategories,
                {},
                'GET'
            );
            if (response.status) {
                console.log("response data => ", response.data)
                dispatch({
                    type: 'categories',
                    categories: response.data
                });
                resolve(response.data);
            } else {
                reject(response.message)
            }
        })
    };
}

export function fetchMyMaps(apiData) {
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let response = await callAPI(
                apiUrls.myMaps,
                apiData
            );
            console.log("response => ", apiData, response)
            if (response.status) {
                dispatch({
                    type: 'ownMaps',
                    ownMaps: response.data
                });
                resolve(response.data);
            } else {
                dispatch({
                    type: 'ownMaps',
                    ownMaps: []
                });
                reject(response.message)
            }
        })
    };
}