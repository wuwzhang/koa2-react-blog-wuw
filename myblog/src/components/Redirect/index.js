import { Component } from 'react';
import { Redirect } from 'react-router-dom';

const redirect = (WrappedComponent) => (props) => {
  class InnerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        path: '',
        redirectState: null
      }
    }

    _redirect(path, state) {
      this.setState({
        path,
        redirectState: state
      })
    }

    render() {
      const {
        redirectState,
        path
      } = this.state;

      return(
        (redirectState && path) ? (<Redirect
                                    to = {{pathname: path, state: redirectState}}
                                  />)
                                : (<WrappedComponent
                                    {...props}
                                    redirect={(path, state) => (this._redirect(path, state))}
                                  />)
      )
    }
  }

  return <InnerComponent />
}


export default redirect;
