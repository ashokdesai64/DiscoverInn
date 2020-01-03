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
        case 'travelTypes': {
            return {
                ...state,
                travelTypes: action.travelTypes || (state.travelTypes || {}),
            };
        }
        case 'budgetLists': {
            return {
                ...state,
                budgetLists: action.budgetLists || (state.budgetLists || {}),
            };
        }
        case 'ageLists': {
            return {
                ...state,
                ageLists: action.ageLists || (state.ageLists || {}),
            };
        }
        case 'createdWithins': {
            return {
                ...state,
                createdWithins: action.createdWithins || (state.createdWithins || {}),
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
