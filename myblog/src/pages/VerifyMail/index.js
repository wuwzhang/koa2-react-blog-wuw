import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchs as registFetch } from '../Register/';
// import { Link } from 'react-router-dom';

class VerifyMail extends Component {
  async _checkRegistActive() {
    var result = await registFetch.registActive(this.props.pathname);

    if (result) {

      setTimeout(setTimeout(() => {
        window.location.href = '/login'
      }, 3000))

    } else {

    }
  }

  render() {
    return (
      <section>
        <button onClick={()=>this._checkRegistActive()}>点击确认</button>
      </section>
    );
  }
}

const mapStateToProps = (state)=> ({
  pathname: state.routing.location.pathname
});

export default connect(mapStateToProps, null)(VerifyMail);
