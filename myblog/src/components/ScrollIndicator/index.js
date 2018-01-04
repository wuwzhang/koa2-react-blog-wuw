import React, { Component } from "react";

import utils from "../../utils/utils";

import "./style.css";

class ScrollIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollbarContainer: {},
      scrollbar: { width: "0px" }
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;

      let pageHeight = utils._getPageHeight(),
        docHeight = utils._getDocHeight();

      if (scrollTop < 54) {
        this.setState({
          scrollbarContainer: { position: "relative" }
        });
      } else {
        this.setState({
          scrollbarContainer: { position: "fixed", top: "0px" }
        });
      }

      let scrolled = scrollTop / (docHeight - pageHeight) * 100;

      this.setState({
        scrollbar: {
          width: `${scrolled}%`
        }
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.scrollbarContainer !== nextState.scrollbarContainer ||
      this.state.scrollbar !== nextState.scrollbar
    );
  }

  render() {
    let { scrollbarContainer, scrollbar } = this.state;
    return (
      <section
        className="ArticleDetials-scrollbar-control"
        style={scrollbarContainer}
      >
        <div className="ArticleDetials-scrollbar" style={scrollbar} />
      </section>
    );
  }
}
export default ScrollIndicator;
