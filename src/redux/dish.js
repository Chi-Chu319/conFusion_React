import * as ActionTypes from './ActionType'

// reducers that are responsible for only part of the state
export const Dishes = (state={
    isLoading: true,
    errMess: null,
    dishes: []}, action) => {
    switch (action.type) {
        // the web app is currently loading the dishes
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};
        // the dishes are currently loading
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []};
        // the loading of dishes failed
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes: []};
        default:
            return state;
    }
}