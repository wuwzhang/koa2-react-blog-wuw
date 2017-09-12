import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

// import { loginOut } from '../action.js'
import { actions as loginActions } from '../../../pages/Login/'

import './style.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class Topmenu extends Component {

  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(event) {
    event.preventDefault();
    this.props.loginOut(this.props.user);
  }

  render() {
    // console.log(this.props.user)
    return (
      <Row>
        <nav className="top-menu">
          <Col md={9} xs={8}>
            <ul className="base-option">
              <li className="base-item"><Link to='/home'><FontAwesome name='home'/><span>Home</span></Link></li>
              <li className="base-item"><Link to='/article'><FontAwesome name='pencil'/><span>Article</span></Link></li>
              <li className="base-item"><Link to='/about'><FontAwesome name='pagelines'/><span>About Me</span></Link></li>
            </ul>
          </Col>
          <Col md={3} xs={4}>
            <ul className="base-option">
              {
                (!this.props.user)? <li className="base-item"><Link to='/login'><FontAwesome name='user-circle'/><span>Login</span></Link></li>
                                  : <li className="base-item">
                                      <p
                                        className = "base-item logout"
                                        onClick = { this.handleSignOut }
                                      ><FontAwesome name='user-circle-o'/><span>Logout</span></p>
                                    </li>
              }
              <li className="base-item"><Link to='/regist'><FontAwesome name='user-plus'/><span>Regist</span></Link></li>
            </ul>
          </Col>
        </nav>
      </Row>
    );
  }
}

Topmenu.propTypes = {
  user: PropTypes.object,
  loginOut: PropTypes.func
}


const mapStateToProps = (state)=> (
  {
    user: state.login.user
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    loginOut: async(user) => {
      dispatch(loginActions.loginOut(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topmenu);
