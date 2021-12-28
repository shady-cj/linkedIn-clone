import {
    SET_LOADING_STATUS,
    LOADING_PROGRESS,
    GET_POSTS,
} from "../actions/actionType";

export const initState = {
    loading: false,
    progress: 0,
    posts: [],
};

const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            };
        case LOADING_PROGRESS:
            return {
                ...state,
                progress: action.progress,
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.posts,
            };
        default:
            return state;
    }
};

export default articleReducer;
