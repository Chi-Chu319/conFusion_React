import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Comments} from './comments'
import {Dishes} from './dish'
import {Leaders} from './leaders'
import {Promotions} from './promotions'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

// Combine the reducers to manage the entire state
export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions,
            // That's property spread notation. It was added in ES2018 (spread for arrays/iterables was earlier, ES2015)
            // it destructure the return values from createForm which contains the reducer function
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        // Middleware is the suggested way to extend Redux with custom functionality. 
        // Middleware lets you wrap the store's dispatch method for fun and profit.
        applyMiddleware(thunk, logger)
        // enable redux thunk and inject logger into the thunk
    )
    return store;
}
