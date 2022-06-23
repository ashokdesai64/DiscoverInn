import {callAPI} from './../Services/network';
import {apiUrls} from './../config/api';

export function loadPopularAndRated() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.popularAndRated, {}, 'GET');
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'popularMaps',
          popularMaps: response.popular,
        });
        dispatch({
          type: 'topRatedMaps',
          topRatedMaps: response.toprated,
        });
        dispatch({
          type: 'nearby',
          nearby: response.nearby,
        });
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function loadCategories() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.getCategories, {}, 'GET');
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'categories',
          categories: response.data,
        });
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function loadTravelTypes() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.getTravelType, {}, 'GET');
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'travelTypes',
          travelTypes: response.data,
        });
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function loadBudgetList() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.getBudgetList, {}, 'GET');
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'budgetLists',
          budgetLists: response.data,
        });
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function loadAgeList() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.getAgeList, {}, 'GET');
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'ageLists',
          ageLists: response.data,
        });
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function loadCreatedWithin() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.getCreatedWithin, {}, 'GET');
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'createdWithins',
          createdWithins: response.data,
        });
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function fetchMyFirstMaps(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.myMaps, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'ownMaps',
          ownMaps: response.data,
          fetchingMaps: false,
        });
        resolve(response.data);
      } else {
        dispatch({
          type: 'ownMaps',
          ownMaps: [],
          fetchingMaps: false,
        });
        reject(response.message);
      }
    });
  };
}
export function fetchMyMaps(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.myMaps, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      let oldMaps = getState().maps.ownMaps;
      if (response.status) {
        let newMaps = [...oldMaps, ...response.data];
        dispatch({
          type: 'ownMaps',
          ownMaps: apiData.page > 1 ? newMaps : [...response.data],
          // ownMaps: [],
          fetchingMaps: false,
        });
        resolve(newMaps);
      } else {
        dispatch({
          type: 'ownMaps',
          ownMaps: apiData.page > 1 ? [...oldMaps] : [],
          fetchingMaps: false,
        });
        reject(response.message);
      }
    });
  };
}

export function fetchTripList() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let userData = getState().user && getState().user.userData;

      if (userData && userData.id) {
        let response;
        try {
          response = await callAPI(apiUrls.tripList, {user_id: userData.id});
        } catch (err) {
          reject(err.err);
          return;
        }
        if (response.status) {
          dispatch({
            type: 'tripList',
            tripList: response.data,
          });
          resolve({data: response.data, total_pins: response.total_pins});
        } else {
          dispatch({
            type: 'tripList',
            tripList: [],
          });
          reject(response.message);
        }
      }
    });
  };
}

export function fetchMapList(apiData) {
  return function(dispatch, getState) {
    dispatch({
      type: 'mapListLoaded',
      mapListLoaded: false,
    });
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.mapList, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      dispatch({
        type: 'mapListLoaded',
        mapListLoaded: true,
      });
      if (response.status) {
        dispatch({
          type: apiData.page > 1 ? 'mapPagination' : 'mapList',
          mapList: response.data,
        });
        dispatch({
          type: 'mapListCount',
          mapListCount: response.map_count,
        });
        resolve(response.data);
      } else {
        if (apiData.page <= 1) {
          dispatch({
            type: 'mapList',
            mapList: [],
          });
          dispatch({
            type: 'mapListCount',
            mapListCount: '0',
          });
          reject(response.message);
        } else {
          resolve(response.data);
        }
      }
    });
  };
}

export function fetchUserMapList(apiData) {
  return function(dispatch, getState) {
    dispatch({
      type: 'mapListLoaded',
      mapListLoaded: false,
    });
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.searchUserMaps, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      dispatch({
        type: 'mapListLoaded',
        mapListLoaded: true,
      });
      if (response.status) {
        dispatch({
          type: 'mapList',
          mapList: response.data,
        });
        dispatch({
          type: 'mapListCount',
          mapListCount: response.data.length || 0,
        });
        resolve(response.data);
      } else {
        dispatch({
          type: 'mapList',
          mapList: [],
        });
        dispatch({
          type: 'mapListCount',
          mapListCount: '0',
        });
        reject(response.message);
      }
    });
  };
}

export function fetchMyReviews(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.yourReviews, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'myReviews',
          myReviews: response.data,
        });
        resolve(response.data);
      } else {
        dispatch({
          type: 'myReviews',
          myReviews: [],
        });
        reject(response.message);
      }
    });
  };
}

export function fetchVisitorReviews(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.visitorReviews, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'visitorReviews',
          visitorReviews: response.data,
        });
        resolve(response.data);
      } else {
        dispatch({
          type: 'visitorReviews',
          visitorReviews: [],
        });
        reject(response.message);
      }
    });
  };
}

export function addMyMap(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.addMyMap, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status && response.map_id) {
        resolve({mapID: response.map_id});
      } else {
        reject(response.message);
      }
    });
  };
}

export function addMapPin(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      try {
        let response;
        try {
          response = await callAPI(apiUrls.addMapPin, apiData);
        } catch (err) {
          reject(err.err);
          return;
        }
        if (response.status) {
          resolve({mapID: response.data});
        } else {
          reject(response.message);
        }
      } catch (err) {
        reject(err);
      }
    });
  };
}

export function getMapPins(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.getMapPins, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve({mapID: response.data});
      } else {
        reject(response.message);
      }
    });
  };
}

export function fetchMapPinList(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.getMapPinsList, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response && response.status) {
        resolve({mapID: response.data});
      } else {
        reject(response.message);
      }
    });
  };
}

export function addReview(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.addReview, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve({mapID: response.data});
        const currentMaps = [...getState().maps.mapList];
        currentMaps.map(map => {
          if (map.id == apiData.map_id) {
            let oldReviewCount = map['total_review'];
            let oldAvg = map['avrage_review'] | 0;
            map['total_review'] = oldReviewCount + 1;
            map['avrage_review'] = Math.round(
              (oldAvg * oldReviewCount + apiData.ratings) / map['total_review'],
            );
          }
          return map;
        });
        dispatch({
          type: 'mapList',
          mapList: currentMaps,
        });
      } else {
        reject(response.message);
      }
    });
  };
}

export function deleteReview(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.deleteReview, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        let reviews = getState().maps.myReviews;
        let filteredReviews = reviews.filter(
          review => review.id != apiData.review_id,
        );
        dispatch({
          type: 'myReviews',
          myReviews: filteredReviews,
        });
        resolve({data: response.data});
      } else {
        reject(response.message);
      }
    });
  };
}

export function editReview(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.editReview, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        let allReviews = getState().maps.myReviews;
        allReviews.map(review => {
          if (review.id == apiData.review_id) {
            review['review'] = apiData.review;
            review['ratings'] = apiData.ratings;
          }
          return review;
        });

        resolve({data: response.data});
      } else {
        reject(response.message);
      }
    });
  };
}

export function updateMapName(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.updateMapTitle, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve({data: response.data});
      } else {
        reject(response.message);
      }
    });
  };
}

export function updateMyMap(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.updateMapDetails, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve({response});
      } else {
        reject(response.message);
      }
    });
  };
}

export function updateCoverImage(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.updateCoverImage, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response);
      } else {
        reject(response.message);
      }
    });
  };
}

export function removeMap(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.removeMap, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        let oldMaps = getState().maps.ownMaps || [];
        let maps = [...oldMaps];
        let removeIndex = oldMaps.findIndex(d => d.id == apiData.map_id);
        maps.splice(removeIndex, 1);
        dispatch({
          type: 'ownMaps',
          ownMaps: maps,
        });
        resolve(response);
      } else {
        reject(response.message);
      }
    });
  };
}

export function getMapPinsList(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      try {
        let response;
        try {
          response = await callAPI(apiUrls.getMapPins, apiData);
        } catch (err) {
          reject(err.err);
          return;
        }
        if (response.status) {
          resolve({data: response.data, pin_count: response.total_pins});
        } else {
          reject(response.message);
        }
      } catch (err) {
        reject(err);
      }
    });
  };
}

export function deleteMapPin(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.deleteMapPin, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function addPinFromTripList(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.addPinFromTripList, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function getSinglePinData(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.getSinglePin, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function removeSinglePinImage(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.removeSinglePinImage, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function updateMapPin(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.updateMapPin, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function createFavouriteList(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.createFavouriteList, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response);
      } else {
        reject(response.message);
      }
    });
  };
}

export function deleteFavouriteList(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.deleteFavouriteList, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        let tripLists = getState().maps.tripList || [];
        let lists = [...tripLists];
        let removeIndex = tripLists.findIndex(d => d.id == apiData.favorite_id);
        lists.splice(removeIndex, 1);
        dispatch({
          type: 'tripList',
          tripList: lists,
        });
        resolve(response);
      } else {
        reject(response.message);
      }
    });
  };
}

export function updateFavouriteList(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.updateFavouriteList, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function singleFavouritePinList(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.singleFavouritePinList, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function addRemoveToTrip(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.addRemovePinToFavourite, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function changeMapStatus(apiData, val) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.changeMapStatus, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        const oldData = getState().maps.ownMaps;
        const currentData = oldData.map(function(x) {
          if (x.id == apiData.map_id) {
            return {...x, status: val ? '1' : '0'};
          } else {
            return x;
          }
        });
        dispatch({
          type: 'ownMaps',
          fetchingMaps: false,
          ownMaps: currentData,
        });
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function shareMap(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.shareMap, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function fetchAllUserNames(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.fetchAllUserNames, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        dispatch({
          type: 'allUserNames',
          allUserNames: response.data,
        });
        resolve(response.data);
      } else {
        dispatch({
          type: 'allUserNames',
          allUserNames: [],
        });
        reject(response.message);
      }
    });
  };
}

export function sharedMapsList(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(apiUrls.sharedMapsList, apiData);
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function storeOfflineMapData({mapData, pinData, bounds, pinList}) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let offlineMaps = getState().maps.offlineMaps || [];
      let maps = [...offlineMaps];
      let isAlreadyDownloadedIndex = maps.findIndex(
        d => d.mapData.id == mapData.id,
      );
      if (isAlreadyDownloadedIndex >= 0) {
        maps.splice(isAlreadyDownloadedIndex, 1);
      }
      maps.push({mapData, pinData, bounds, pinList});
      dispatch({
        type: 'offlineMaps',
        offlineMaps: maps,
      });
      resolve(maps);
    });
  };
}

export function removeOfflineMapData(mapData) {
  return function(dispatch, getState) {
    return new Promise((resolve, reject) => {
      let offlineMaps = getState().maps.offlineMaps || [];
      let maps = [...offlineMaps];
      let isAlreadyDownloadedIndex = maps.findIndex(
        d => d.mapData.id == mapData.id,
      );
      if (isAlreadyDownloadedIndex >= 0) {
        maps.splice(isAlreadyDownloadedIndex, 1);
      }
      dispatch({
        type: 'offlineMaps',
        offlineMaps: [...maps],
      });
      resolve([...maps]);
    });
  };
}

export function updateTripOrder(data) {
  return function(dispatch, getState) {
    let newData = {};
    data.forEach((value, index) => {
      const key = `favorites_pins[${index}]`;
      newData = {...newData, [key]: value.favorite_id};
    });
    let userData = getState().user && getState().user.userData;
    newData = {...newData, user_id: userData.id};
    return new Promise(async (resolve, reject) => {
      let response;
      try {
        response = await callAPI(
          apiUrls.update_favorite_pin_list_order,
          newData,
        );
      } catch (err) {
        reject(err.err);
        return;
      }
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}
