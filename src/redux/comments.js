import* as ActionTypes from "./ActionType"

export const Comments = (state={
    errMess: null,
    comments: []
}, action) => {
    switch (action.type) {
        // add the comment from the comment form
        // if the action type is to add the comment into the state of comment
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString()
            // console.log("comment: ", comment)
            return state.concat(comment)
        
        case ActionTypes.ADD_COMMENTS:
            return {...state,  errMess: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state,  errMess: action.payload, comments: []};
        default:
            return state;
    }
}