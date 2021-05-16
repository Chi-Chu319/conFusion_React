import { COMMENTS } from "../shared/comments"
import* as actionType from "./ActionType"

export const Comments = (state=COMMENTS, action) => {
    switch (action.type) {
        // if the action type is to add the comment into the state of comment
        case actionType.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString()
            // console.log("comment: ", comment)
            return state.concat(comment)
        default:
            return state;
    }
}