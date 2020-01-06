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

export function loadTravelTypes() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let response = await callAPI(
                apiUrls.getTravelType,
                {},
                'GET'
            );
            if (response.status) {
                console.log("response data => ", response.data)
                dispatch({
                    type: 'travelTypes',
                    travelTypes: response.data
                });
                resolve(response.data);
            } else {
                reject(response.message)
            }
        })
    };
}

export function loadBudgetList() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let response = await callAPI(
                apiUrls.getBudgetList,
                {},
                'GET'
            );
            if (response.status) {
                console.log("response data => ", response.data)
                dispatch({
                    type: 'budgetLists',
                    budgetLists: response.data
                });
                resolve(response.data);
            } else {
                reject(response.message)
            }
        })
    };
}

export function loadAgeList() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let response = await callAPI(
                apiUrls.getAgeList,
                {},
                'GET'
            );
            if (response.status) {
                console.log("response data => ", response.data)
                dispatch({
                    type: 'ageLists',
                    ageLists: response.data
                });
                resolve(response.data);
            } else {
                reject(response.message)
            }
        })
    };
}

export function loadCreatedWithin() {
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let response = await callAPI(
                apiUrls.getCreatedWithin,
                {},
                'GET'
            );
            if (response.status) {
                dispatch({
                    type: 'createdWithins',
                    createdWithins: response.data
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

export function fetchTripList(){
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let userData = getState().user && getState().user.userData;

            if(userData && userData.id){
                let response = await callAPI(
                    apiUrls.tripList,
                    {user_id:userData.id}
                );
                if (response.status) {
                    dispatch({
                        type: 'tripList',
                        tripList: response.data
                    });
                    resolve(response.data);
                } else {
                    dispatch({
                        type: 'tripList',
                        tripList: []
                    });
                    reject(response.message)
                }
            }
            
        })
    };
}

export function fetchMapList(apiData) {
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let response = await callAPI(
                apiUrls.mapList,
                apiData
            );
            if (response.status) {
                dispatch({
                    type: apiData.page > 1 ? 'mapPagination' : 'mapList',
                    mapList: response.data
                });
                dispatch({
                    type: 'mapListCount',
                    mapListCount: response.map_count
                });
                resolve(response.data);
            } else {
                dispatch({
                    type: 'mapList',
                    mapList: []
                });
                dispatch({
                    type: 'mapListCount',
                    mapListCount: '0'
                });
                reject(response.message)
            }
        })
    };
}

export function addMyMap(apiData) {
    return function (dispatch, getState) {
        return new Promise(async (resolve, reject) => {
            let response = await callAPI(
                apiUrls.addMyMap,
                apiData
            );
            if (response.status && response.map_id) {
                resolve({mapID:response.map_id});
            } else {
                reject(response.message)
            }
        })
    };
}

