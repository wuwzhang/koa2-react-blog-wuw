import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

import { Grid } from 'react-bootstrap';
import { view as TopMenu } from './components/TopMenu';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Article from './pages/Article.js';
import NotFound from './pages/NotFound.js';
import { view as Tags } from './pages/Tags/';
import { view as Login } from './pages/Login/';
import { view as Register } from './pages/Register/';
import { view as ArticlePostOrEdit } from './pages/ArticlePostOrEdit/';
import { view as ArticleList } from './pages/ArticleList/';
import { view as ArticleDetails } from './pages/ArticleDetails/';
import { view as KeepOnFileList } from './pages/KeepOnFileList/';
import { view as ArticleByTag } from './pages/ArticleByTag/'

const history = createHistory();
const Routes = () => (
  <ConnectedRouter history={ history }>
    <Grid>
      <TopMenu />
      <Switch>
        <Route exact path="/" component={ Home } ></Route>
        <Route path="/home" component={ Home } ></Route>
        <Route path="/article" component={ Article } ></Route>
        <Route path="/tags_cloud" component={ Tags } ></Route>
        <Route path="/about" component={ About }></Route>
        <Route path="/login" component={ Login }></Route>
        <Route path="/signOut" component={ Login }></Route>
        <Route path="/regist" component={ Register }></Route>
        <Route path="/article_post" component={ ArticlePostOrEdit }></Route>
        <Route path="/article_edit/:articleId" component={ ArticlePostOrEdit }></Route>
        <Route path="/article_list" component={ ArticleList }></Route>
        <Route path="/Keep_On_File" component={ KeepOnFileList }></Route>
        <Route path="/article_by_tag" component={ ArticleByTag }></Route>
        <Route path="/article_details/:articleId" component={ ArticleDetails }></Route>
        <Route component={ NotFound }></Route>
      </Switch>

    </Grid>
  </ConnectedRouter>
);

export default Routes;
