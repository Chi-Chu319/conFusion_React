import {createStore, combineReducers} from 'redux';
import {Comments} from './comments'
import {Dishes} from './dish'
import {Leaders} from './leaders'
import {Promotions} from './promotions'

// Combine the reducers to manage the entire state
export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            leaders: Leaders,
            promotions: Promotions
        })
    )
    return store;
}
