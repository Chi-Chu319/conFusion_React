import * as ActionType from './ActionType'
import {baseUrl} from "../shared/baseUrl"

/* feedback */

// export const addFeedback = (feedback) => ({
//     type: ActionType.ADD_FEEDBACK,
//     payload: {
//         feedback
//     }
// });

// post the feedback to the server
export const postFeedback = (feedback) => () => {

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        // make the newFeedback a string
        body: JSON.stringify(feedback),
        headers: {
            // the body is in json format
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
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
    err => {
        var errmess = new Error(err.message);
        throw errmess;
    })
    .then(response => response.json())
    // the newly created comment will be send back as a response from the server
    .then(feedback => {alert("Thank you for your feedback!\n" + JSON.stringify(feedback));})
    .catch(error => {{console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message);}});
};

// add the posted comment to
// the comment is a comment onbject that was a response from the server
export const addComment = (comment) => ({
    type: ActionType.ADD_COMMENT,
    payload: {
        comment
    }
});

// post the comment to the server
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment =  {
        dishId: dishId, 
        rating: rating, 
        author: author, 
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        // make the newComment a string
        body: JSON.stringify(newComment),
        headers: {
            // the body is in json format
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
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
    err => {
        var errmess = new Error(err.message);
        throw errmess;
    })
    .then(response => response.json())
    // the newly created comment will be send back as a response from the server
    .then(comment => dispatch(addComment(comment)))
    .catch(error => {{console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message);}});
};


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

/* leaders */

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
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
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionType.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionType.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionType.ADD_LEADERS,
    payload: leaders
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

