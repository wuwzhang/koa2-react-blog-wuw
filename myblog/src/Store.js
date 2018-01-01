import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";

import thunk from "redux-thunk";
import resetEnhancer from "./enhancers/reset.js";

import { reducer as loginReducer } from "./pages/Login/";
import { reducer as registReducer } from "./pages/Register/";
import { reducer as articlePostReducer } from "./pages/ArticlePost/";
import { reducer as articleEditReducer } from "./pages/ArticleEdit/";
import { reducer as articleListReducer } from "./pages/ArticleList/";
import { reducer as articleDetailsReducer } from "./pages/ArticleDetails/";
import { reducer as commentReducer } from "./components/Comment/";
import { reducer as messageReducer } from "./components/Contact/";
import { reducer as catalogReducer } from "./components/CatalogAside/";
import { reducer as tagsReducer } from "./components/TagsCloud/";
// import { reducer as localesReducer } from './components/ConnectedIntlProvider/';
import { reducer as articleSearchReducer } from "./components/ArticleSearch/";
import { reducer as rankReducer } from "./components/Rank/";
import { reducer as configReducer } from "./pages/SettingAdmin/";

import Perf from "react-addons-perf";

const history = createHistory();
const histroyMiddleware = routerMiddleware(history);

const reducer = combineReducers({
  login: loginReducer,
  register: registReducer,
  articlePost: articlePostReducer,
  articleEdit: articleEditReducer,
  articleList: articleListReducer,
  articleDetails: articleDetailsReducer,
  articleSearch: articleSearchReducer,
  comment: commentReducer,
  message: messageReducer,
  catalog: catalogReducer,
  tag: tagsReducer,
  routing: routerReducer,
  rank: rankReducer,
  blog: configReducer
  // locales: localesReducer
});

const win = window;
win.Perf = Perf;

const middlewares = [thunk, histroyMiddleware];

if (process.env.NODE_ENV !== "production") {
  middlewares.push(require("redux-immutable-state-invariant").default());
}

const storeEnhancers = compose(
  resetEnhancer,
  applyMiddleware(...middlewares),
  win && win.devToolsExtension ? win.devToolsExtension() : f => f
);

const store = createStore(reducer, storeEnhancers);
store._reducers = { routing: routerReducer };

export default store;
