import {combineReducers, createStore} from 'redux';
import darkModeReducer from './redux/reducers/darkModeReducer';
import searchedSurahReducer from './redux/reducers/searchedSurahReducer';

const reducers = combineReducers({darkModeReducer, searchedSurahReducer});

const store = createStore(reducers);

export default store;
