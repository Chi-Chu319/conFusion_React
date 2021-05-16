import { DISHES } from "../shared/dishes";

// reducers that are responsible for only part of the state
export const Dishes = (state=DISHES, action) => {
    switch (action.type) {
        default:
            return state;
    }
}