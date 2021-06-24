import {combineReducers, createStore} from 'redux';
import darkModeReducer from './redux/reducers/darkModeReducer';

const reducers = combineReducers({darkModeReducer});

const store = createStore(reducers);

export default store;
