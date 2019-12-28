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
        default:
            return state;
    }
}
