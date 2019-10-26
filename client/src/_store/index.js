import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import toons from '../_reducers/toons';
import favorites from '../_reducers/favorites';
import episodes from '../_reducers/episodes';
import pages from '../_reducers/pages';

// The Global state
const rootReducer = combineReducers({
  toons,
  favorites,
  episodes,
  pages,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
