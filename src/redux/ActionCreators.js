import * as ActionType from './ActionType'
import {baseUrl} from "../shared/baseUrl"

// the function returns an action object.
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionType.ADD_COMMENT,
    payload: {
        dishId: dishId, 
        rating: rating, 
        author: author, 
        comment: comment
    }
});


/* dishes */

// redux is a middleware that allow you to write action creators that return a function instead of a action
// this is a funtion to load all the dishes to the web app.
export const fetchDishes = () => (dispatch) => {
    
    dispatch(dishesLoading(true));

    // returns a promise
    return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)));
}

// action for dish loading
export const dishesLoading = () => ({
    type: ActionType.DISHES_LOADING
});

// action triggered when dishloading failed
export const dishesFailed = (errmess) => ({
    type: ActionType.DISHES_FAILED,
    payload: errmess
});

// action used to add new dishes
export const addDishes = (dishes) => ({
    type: ActionType.ADD_DISHES,
    payload: dishes
});


/* promos */

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));

}

export const promosLoading = () => ({
    type: ActionType.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionType.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionType.ADD_PROMOS,
    payload: promos
});


/* comments */

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
}

export const commentsFailed = (errmess) => ({
    type: ActionType.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionType.ADD_COMMENTS,
    payload: comments
});

