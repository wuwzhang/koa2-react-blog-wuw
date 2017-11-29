import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { verifyGithub } from './fetch.js';
import { actions as loginAction } from '../Login';

class VerifyGithub extends Component {

  constructor(props) {
    super(props);

    let fromPath = sessionStorage.getItem('fromPath');

    this.state = {
      fromPath: fromPath,
      isRedirect: false,
      loginState: 0
    }
  }

  async componentDidMount() {
    let { location } = this.props;

    if (location && location.pathname === '/github/oauth/callback') {

      let url = location.pathname + location.search,
          result = await verifyGithub(url);
          console.log(result.user)

      if (result.code === '1') {
        this.props.successLogin(result.user)

        this.setState({
          isRedirect: true
        })
      } else {
        this.setState({
          loginState: 1
        })
      }
    }
  }

  render() {

    let { isRedirect, fromPath, loginState } = this.state;

    if (isRedirect) {
      return <Redirect to={{
                pathname: fromPath
              }}/>
    }

    if (loginState === 1) {
      return (
        <section>
          <p>他大概是病了，试试联系注册君</p>
          <Link to='/'>首页</Link>
          <Link to='/register'>注册</Link>
        </section>
      )
    }

    return (
      <section>
        <p>浏览器君在发呆，等等我去叫醒他</p>
      </section>
    );
  }
}

const mapStateToProps = (state)=> ({
  location: state.routing.location
});

const mapDispatchToProps = (dispatch) => {
  return {
    successLogin: (user, message) => {
      dispatch(loginAction.finishLogin(user));
      dispatch(loginAction.loginSuccess(message));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyGithub);
