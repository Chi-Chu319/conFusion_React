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
    .then(response => {
            if(response.ok){
                return response;
            }else{
                // if there is an error return from the server
                var err = new Error("Error " + response.status + ": " + response.statusText)
                err.response = response;
                throw err;
            }
        },
        // if there is an error when trying to connect to the server.
        err => {
            var errmess = new Error(err.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
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
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var err = new Error("Error " + response.status + ": " + response.statusText)
            err.response = response;
            throw err;
        }
    },
    err => {
        var errmess = new Error(err.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));

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
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var err = new Error("Error " + response.status + ": " + response.statusText)
            err.response = response;
            throw err;
        }
    },
    err => {
        var errmess = new Error(err.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));

}

export const commentsFailed = (errmess) => ({
    type: ActionType.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionType.ADD_COMMENTS,
    payload: comments
});

