import {combineReducers, createStore} from 'redux';
import darkModeReducer from './redux/reducers/darkModeReducer';
import searchedSurahReducer from './redux/reducers/searchedSurahReducer';
import networkErrorReducer from './redux/reducers/networkErrorReducer';

const reducers = combineReducers({
  darkModeReducer,
  searchedSurahReducer,
  networkErrorReducer,
});

const store = createStore(reducers);

export default store;
