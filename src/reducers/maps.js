const initialState = {};

export default function maps(state = initialState, action = {}) {
    switch (action.type) {
        case 'popularMaps': {
            return {
                ...state,
                popularMaps: action.popularMaps || (state.popularMaps || {}),
            };
        }
        case 'topRatedMaps': {
            return {
                ...state,
                topRatedMaps: action.topRatedMaps || (state.topRatedMaps || {}),
            };
        }
        case 'categories': {
            return {
                ...state,
                categories: action.categories || (state.categories || {}),
            };
        }
        case 'ownMaps': {
            return {
                ...state,
                ownMaps: action.ownMaps || (state.ownMaps || {}),
            };
        }
        case 'tripList': {
            return {
                ...state,
                tripList: action.tripList || (state.tripList || {}),
            };
        }
        case 'mapList': {
            return {
                ...state,
                mapList: action.mapList || (state.mapList || {}),
            };
        }
        case 'mapListCount': {
            return {
                ...state,
                mapListCount: action.mapListCount || (state.mapListCount || 0),
            };
        }
        default:
            return state;
    }
}
