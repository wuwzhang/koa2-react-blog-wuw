import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { reducer as loginReducer } from './pages/Login/';
import { reducer as articleEditReducer } from './pages/ArticlePostOrEdit/';
import { reducer as articleListReducer } from './pages/ArticleList/';
import { reducer as articleDetailsReducer } from './pages/ArticleDetails/';

import Perf from 'react-addons-perf';

const history = createHistory();
const middleware = routerMiddleware(history);

const reducer = combineReducers({
  login: loginReducer,
  articleEdit: articleEditReducer,
  articleList: articleListReducer,
  articleDetails: articleDetailsReducer,
  routing: routerReducer
});

const win = window;
win.Perf = Perf;

const storeEnhancers = compose(
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
  applyMiddleware(middleware)
);

const initialState = {

};

export default createStore(reducer, initialState, storeEnhancers);
