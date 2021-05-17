import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Comments} from './comments'
import {Dishes} from './dish'
import {Leaders} from './leaders'
import {Promotions} from './promotions'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

// Combine the reducers to manage the entire state
export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions
        }),
        // Middleware is the suggested way to extend Redux with custom functionality. 
        // Middleware lets you wrap the store's dispatch method for fun and profit.
        applyMiddleware(thunk, logger)
    )
    return store;
}
