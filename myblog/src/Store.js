import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import thunk from 'redux-thunk';

import { reducer as loginReducer } from './pages/Login/';
import { reducer as registReducer } from './pages/Register/';
import { reducer as articleEditReducer } from './pages/ArticlePostOrEdit/';
import { reducer as articleListReducer } from './pages/ArticleList/';
import { reducer as articleDetailsReducer } from './pages/ArticleDetails/';
import { reducer as commentReducer } from './components/Comment/';

import Perf from 'react-addons-perf';

const history = createHistory();
const histroyMiddleware = routerMiddleware(history);

const reducer = combineReducers({
  login: loginReducer,
  register: registReducer,
  articleEdit: articleEditReducer,
  articleList: articleListReducer,
  articleDetails: articleDetailsReducer,
  comment: commentReducer,
  routing: routerReducer
});

const win = window;
win.Perf = Perf;

const middlewares = [thunk, histroyMiddleware];

// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant').default());
// }


const storeEnhancers = compose(
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
  applyMiddleware(...middlewares)
);

const initialState = {

};

export default createStore(reducer, initialState, storeEnhancers);
