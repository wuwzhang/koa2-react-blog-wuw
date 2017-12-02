import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// import { loginOut } from '../action.js'
import { actions as loginActions, fetchs as loginFetchs } from '../../../pages/Login/';

import './style.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Badge, Icon, Menu, Dropdown, message } from 'antd';

class Topmenu extends Component {

  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    let token = window.localStorage.getItem('token');

    if (token && !this.props.user) {
      this.loginByToken(token);
    }
  }

  async handleSignOut(event) {
    event.preventDefault();
    let { user } = this.props;

    let result = await loginFetchs.logout(user._id);
    if (result.code === '1') {
      message.success('注销成功');
    } else {
      message.error('啊呀妈呀，失败了')
    }

    this.props.loginOut(user);
    window.localStorage.removeItem('token')
  }

  async loginByToken(token) {
    let result = await loginFetchs.getUserByToken(token);

    if (result.code === '1') {
      this.props.loginByToken(result.user);
    } else {

    }
  }

  render() {
    let { commentcommentNotCheckedCount, messagecommentNotCheckedCount } = this.props;

    return (
      <Grid>

        <Row>
          <nav className="top-menu">
            <Col md={8} sm={12} xs={12}>
              <ul className="base-option">
                <li className="base-item">
                  <Link to='/home'>
                    <FontAwesome name='home'/>
                    <FormattedMessage
                      id="Home"
                      defaultMessage="Home"
                    />
                  </Link>
                </li>
                <li className="base-item">
                  <Link to='/Keep_On_File'>
                    <FontAwesome name='pencil'/>
                    <FormattedMessage
                      id="Article"
                      defaultMessage="Article"
                    />
                  </Link>
                </li>
                <li className="base-item">
                  <Link to='/About'>
                    <FontAwesome name='pagelines'/>
                    <FormattedMessage
                      id="About"
                      defaultMessage="About Me"
                    />
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={3} sm={4} xs={9}>
              {
                this.props.user ? <ul className="base-option">
                                    <li className="base-item">
                                      <p className = "base-item"
                                        onClick = { this.handleSignOut }
                                      >
                                        <FontAwesome
                                          style={{color: '#FF7E67'}}
                                          name='user-circle-o'
                                        />
                                        <FormattedMessage
                                          id="Logout"
                                          defaultMessage="Sign Out"
                                        />
                                      </p>
                                    </li>
                                    {
                                      this.props.user.level === 0
                                        ? <li className="base-item">
                                          {
                                            commentcommentNotCheckedCount > 0 || messagecommentNotCheckedCount > 0
                                              ? <Dropdown overlay={menu}>
                                                  <Link className="ant-dropdown-link" to='/article_admim'>
                                                    <Badge dot>
                                                      <Icon type="bell" style={{ color: '#FAFAFA' }}/>
                                                    </Badge>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <Icon type="down" />
                                                  </Link>
                                                </Dropdown>
                                              :  <Dropdown overlay={menu}>
                                                  <Link className="ant-dropdown-link" to='/Keep_On_File'>
                                                    <Icon type="bell" style={{ color: '#FAFAFA' }}/>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <Icon type="down" />
                                                  </Link>
                                                </Dropdown>
                                          }
                                        </li>
                                      : <li className="login-tip" style={{fontWight: 100}}>Hi! {this.props.user.username}~</li>
                                    }
                                  </ul>
                                : <ul className="base-option">
                                    <li className="base-item">
                                      <Link to={{
                                        pathname: '/login',
                                        state: { from: this.props.location }
                                      }}>
                                        <FontAwesome name='user-circle'/>
                                        <FormattedMessage
                                          id="Login"
                                          defaultMessage="Sign In"
                                        />
                                      </Link>
                                    </li>
                                    <li className="base-item">
                                      <Link to='/regist'>
                                        <FontAwesome name='user-plus'/>
                                        <FormattedMessage
                                          id="Regist"
                                          defaultMessage="Sign Up"
                                        />
                                      </Link>
                                    </li>
                                  </ul>
              }
            </Col>
            <Col md={1} sm={2} xs={3}>
              <section className='languageToggle base-option TopMenu-language'>
                <ul>
                  <li>
                    <p>
                      <a href="?locale=zh-CN"><FormattedMessage
                        id="Chinses"
                        defaultMessage='Zn'
                      /></a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="?locale=en-US"><FormattedMessage
                        id="English"
                        defaultMessage='En'
                      /></a>
                    </p>
                  </li>
                </ul>
              </section>

            </Col>
          </nav>
        </Row>
      </Grid>
    );
  }
}
const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/article_admin'>
        <FormattedMessage
          id="ArticleList"
          defaultMessage="Article List"
        />
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to='/comment_admin'>
        <FormattedMessage
          id="Comment"
          defaultMessage="Comment"
        />
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to='/message_admin'>
        <FormattedMessage
          id="Message"
          defaultMessage="Message"
        />
      </Link>
    </Menu.Item>
  </Menu>
);

Topmenu.propTypes = {
  user: PropTypes.object,
  loginOut: PropTypes.func
}


const mapStateToProps = (state)=> (
  {
    user: state.login.user,
    location: state.routing.location,
    commentcommentNotCheckedCount: state.comment.NotCheckedCount,
    messagecommentNotCheckedCount: state.message.NotCheckedCount
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    loginByToken: async(user) => {
      dispatch(loginActions.finishLogin(user));
    },
    loginOut: async(user) => {
      dispatch(loginActions.loginOut(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topmenu);
