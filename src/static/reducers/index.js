import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import registerReducer from './register';
import domainReducer from './domain';
import recordReducer from './record';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    routing: routerReducer,
    reg: registerReducer,
    domain: domainReducer,
    record: recordReducer,
});
