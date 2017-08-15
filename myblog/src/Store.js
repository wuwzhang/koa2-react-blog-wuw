import { createStore, combineReducers, compose } from 'redux';

import { routerReducer } from 'react-router-redux';
import { reducer as loginReducer } from './pages/Login/';
import { reducer as articleEditReducer } from './pages/ArticlePostOrEdit/';
import { reducer as articleListReducer } from './pages/ArticleList/';

import Perf from 'react-addons-perf';

const reducer = combineReducers({
  login: loginReducer,
  articleEdit: articleEditReducer,
  articleList: articleListReducer,
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
