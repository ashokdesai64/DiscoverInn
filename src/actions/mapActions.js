import {callAPI} from './../Services/network';
import {apiUrls} from './../config/api';

export function loadPopularAndRated() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response = await callAPI(apiUrls.popularAndRated, {}, 'GET');
      console.log("top rated => ",response)
      if (response.status) {
        dispatch({
          type: 'popularMaps',
          popularMaps: response.popular,
        });
        dispatch({
          type: 'topRatedMaps',
          topRatedMaps: response.toprated,
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
      let response = await callAPI(apiUrls.getCategories, {}, 'GET');
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
      let response = await callAPI(apiUrls.getTravelType, {}, 'GET');
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
      let response = await callAPI(apiUrls.getBudgetList, {}, 'GET');
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
      let response = await callAPI(apiUrls.getAgeList, {}, 'GET');
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
      let response = await callAPI(apiUrls.getCreatedWithin, {}, 'GET');
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
      let response = await callAPI(apiUrls.myMaps, apiData);
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
      let response = await callAPI(apiUrls.myMaps, apiData);
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
        console.log('apiData.page => ', apiData.page);
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
        let response = await callAPI(apiUrls.tripList, { user_id: userData.id });
        console.log("fetchTripList response = ",response)
        if (response.status) {
          dispatch({
            type: 'tripList',
            tripList: response.data,
          });
          resolve({data:response.data,total_pins:response.total_pins});
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
      let response = await callAPI(apiUrls.mapList, apiData);
      dispatch({
        type: 'mapListLoaded',
        mapListLoaded: true,
      });
      if (response.status) {
        console.log('response => ', response);
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
      let response = await callAPI(apiUrls.yourReviews, apiData);
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
      let response = await callAPI(apiUrls.visitorReviews, apiData);
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
      let response = await callAPI(apiUrls.addMyMap, apiData);
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
        let response = await callAPI(apiUrls.addMapPin, apiData);
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
      let response = await callAPI(apiUrls.getMapPins, apiData);

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
      let response = await callAPI(apiUrls.getMapPinsList, apiData);

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
      let response = await callAPI(apiUrls.addReview, apiData);
      if (response.status) {
        resolve({mapID: response.data});
        const currentMaps = [...getState().maps.mapList]
        currentMaps.map(map => {
          if(map.id == apiData.map_id){
            let oldReviewCount = map['total_review']
            let oldAvg = map['avrage_review']|0
            map['total_review'] = oldReviewCount+1;
            map['avrage_review'] = Math.round(
              ((oldAvg*oldReviewCount)+apiData.ratings) / map['total_review']
            )
          }
          return map
        })
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
      let response = await callAPI(apiUrls.deleteReview, apiData);

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
      let response = await callAPI(apiUrls.editReview, apiData);

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
      let response = await callAPI(apiUrls.updateMapTitle, apiData);

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
      let response = await callAPI(apiUrls.updateMapDetails, apiData);
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
      let response = await callAPI(apiUrls.updateCoverImage, apiData);
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
      let response = await callAPI(apiUrls.removeMap, apiData);
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
      let response = await callAPI(apiUrls.getMapPins, apiData);
      if (response.status) {
        resolve({data:response.data,pin_count:response.total_pins});
      } else {
        reject(response.message);
      }
    });
  };
}

export function deleteMapPin(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response = await callAPI(apiUrls.deleteMapPin, apiData);
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
      let response = await callAPI(apiUrls.addPinFromTripList, apiData);
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
      let response = await callAPI(apiUrls.getSinglePin, apiData);
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
      let response = await callAPI(apiUrls.removeSinglePinImage, apiData);
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
      let response = await callAPI(apiUrls.updateMapPin, apiData);
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
      let response = await callAPI(apiUrls.createFavouriteList, apiData);
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
      let response = await callAPI(apiUrls.deleteFavouriteList, apiData);
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
      let response = await callAPI(apiUrls.updateFavouriteList, apiData);
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
      let response = await callAPI(apiUrls.singleFavouritePinList, apiData);
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
      let response = await callAPI(apiUrls.addRemovePinToFavourite, apiData);
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  };
}

export function changeMapStatus(apiData) {
  return function(dispatch, getState) {
    return new Promise(async (resolve, reject) => {
      let response = await callAPI(apiUrls.changeMapStatus, apiData);
      if (response.status) {
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
      let response = await callAPI(apiUrls.shareMap, apiData);
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
      let response = await callAPI(apiUrls.fetchAllUserNames, apiData);
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
      let response = await callAPI(apiUrls.sharedMapsList, apiData);
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
