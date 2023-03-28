import { combineReducers } from 'redux';
import { commonReducer } from './reducer';

const rootReducer = combineReducers({
    commonReducer: commonReducer,

});

export default rootReducer;