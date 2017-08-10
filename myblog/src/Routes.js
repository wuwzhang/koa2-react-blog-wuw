import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import {Grid} from 'react-bootstrap';
import {view as TopMenu} from './components/TopMenu';
import Home from './pages/Home.js';
import About from './pages/About.js';
import NotFound from './pages/NotFound.js';
import {view as Login} from './pages/Login/';
import {view as Register} from './pages/Register/';

// const createElement = (Component, props) => {
//   return (
//     <Provider store={store}>
//       <Component {...props} />
//     </Provider>
//   );
// };

// const PrivateRouter = ({Component: Component, auth, ...rest}) => {
//   return (
//     <Route
//       {...rest}
//       render = {props => (
//         auth.user ? (<Component {...props} />)
//                   : (<Redirect
//                       to={{pathname: '/login', state: {from: props.location}}}
//                     />)
//       )}
//     />
//   );
// };

const RedirectFromServer = ({match}) => {
  let url = window.location.search;
  return url.substring(1) ? <Redirect to={{pathname:url.substring(1), state: {from: '/'}}} />
                          : <NotFound />
}

// let auth = this.props.login;
const Routes = () => (
  <Router>
    <Grid>
      <TopMenu />
      <Switch>
        <Route exact path="/" component={ Home } ></Route>
        <Route path="/home" component={ Home } ></Route>
        <Route path="/about" component={ About }></Route>
        <Route path="/login" component={ Login }></Route>
        <Route path="/regist" component={ Register }></Route>
        <Route component={ NotFound }></Route>
        <Route  path="/" component={RedirectFromServer}/>
      </Switch>
    </Grid>
  </Router>
);

export default Routes;
