import { createStore, combineReducers, compose } from 'redux';

import { routerReducer } from 'react-router-redux';
import { reducer as loginReducer } from './pages/Login/';
import { reducer as articleReducer } from './pages/ArticlePostOrEdit/';

import Perf from 'react-addons-perf';

const reducer = combineReducers({
  login: loginReducer,
  article: articleReducer,
  routing: routerReducer
});

const win = window;
win.Perf = Perf;

const storeEnhancers = compose(
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const initialState = {

};

export default createStore(reducer, initialState, storeEnhancers);
