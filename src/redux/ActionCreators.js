import * as ActionType from './ActionType'
import { DISHES } from "../shared/dishes";


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


// redux is a middleware that allow you to write action creators that return a function instead of a action
// this is a funtion to load all the dishes to the web app.
export const fetchDishes = () => (dispatch) => {
    
    dispatch(dishesLoading(true));

    // delay of 2 seconds
    // this action is delayed and dispatched.
    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000)

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
