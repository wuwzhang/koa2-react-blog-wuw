import React from "react";
import { Route, Switch } from "react-router-dom";

import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import { view as Home } from "./pages/Home/";
import About from "./pages/About/index.js";
import NotFound from "./pages/NotFound.js";
import VerifyMail from "./pages/VerifyMail/index.js";
import VerifyGithub from "./pages/VerifyGithub/index.js";
import { view as Tags } from "./pages/Tags/";
import { view as Login } from "./pages/Login/";
import { view as Register } from "./pages/Register/";
import { view as ArticlePost } from "./pages/ArticlePost/";
import { view as ArticleEdit } from "./pages/ArticleEdit/";
import { view as ArticleDetails } from "./pages/ArticleDetails/";
import { view as ArticleList } from "./pages/ArticleList/";
import { view as CommentAdmin } from "./pages/CommentAdmin/";
import { view as MessageAdmin } from "./pages/MessageAdmin/";
import { view as SettingAdmin } from "./pages/SettingAdmin/";
import { view as KeepOnFileList } from "./pages/keepOnFileList/";
import { view as ArticleByTag } from "./pages/ArticleByTag/";
import { view as ArticleByCatalog } from "./pages/ArticleByCatalog/";
import { view as ArticleBySearch } from "./pages/ArticleBySearch/";

const history = createHistory();

// const getArticlePostPage = (nextState, callback) => {
//   require.ensure([], function(require) {
//     callback(null, require('./pages/ArticlePost/view/articlePost.js').default);
//   }, 'articlePost');
// };

// const getArticleEditPage = (nextState, callback) => {
//   require.ensure([], function(require) {
//     callback(null, require('./pages/ArticleEdit/view/articleEdit.js').default);
//   }, 'articleEdit');
// };

// const getArticleDetailsPage = (nextState, callback) => {
//   require.ensure([], function(require) {
//     callback(null, require('./pages/ArticleDetails/views/articleDetials.js').default);
//   }, 'articelDetails');
// };
//
//

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/tags_cloud" component={Tags} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signOut" component={Login} />
      <Route path="/regist" component={Register} />
      <Route path="/article_post" component={ArticlePost} />
      <Route path="/article_edit/:articleId" component={ArticleEdit} />
      <Route path="/article_details/:articleId" component={ArticleDetails} />
      <Route path="/article_admin" component={ArticleList} />
      <Route path="/comment_admin" component={CommentAdmin} />
      <Route path="/message_admin" component={MessageAdmin} />
      <Route path="/setting_admin" component={SettingAdmin} />
      <Route path="/Keep_On_File" component={KeepOnFileList} />
      <Route path="/article_by_tag" component={ArticleByTag} />
      <Route path="/article_by_catalog" component={ArticleByCatalog} />
      <Route path="/article_by_search/:value" component={ArticleBySearch} />
      {/* <Route path="article_post" getComponent={ getArticlePostPage }></Route>
      <Route path="article_edit/:articleId" getComponent={ getArticleEditPage }></Route>
      <Route path="article_details/:articleId" getComponent={ getArticleDetailsPage }></Route> */}
      <Route path="/verifyemail/:verifyemail" component={VerifyMail} />
      <Route path="/github/oauth/callback" component={VerifyGithub} />
      <Route component={NotFound} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
