// // // for one reducer
import reducer from './reducer/reducer';
import {createStore , applyMiddleware} from 'redux';

import thunk from'redux-thunk'

const store = createStore(reducer,applyMiddleware(thunk))
export default store;

// // // for multy reducer
// import {combineReducers} from 'redux';
// import auth_reducer from './reducer/auth-reducer';
// import app_reducer from './reducer/app-reducer';
// import reducer from './reducer/reducer';


// export default combineReducers({
//     auth:auth_reducer  ,
//     app: app_reducer 
//     // main:reducer
// })