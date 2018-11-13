import React, { Component } from "react";
import "./WelcomePage.css";
import mainLogo from "../../assets/cukor-logo.png";
import AppRed from "../../App.js";
import AppBlack from "../../App-black.js";

class WelcomePage extends Component {
  constructor() {
    super();
    this.state = {
      redPage: false,
      blackPage: false
    };

    this.toRedPage = this.toRedPage.bind(this);
    this.toBlackPage = this.toBlackPage.bind(this);
  }
  componentWillUnmount() {
    this.isCancelled = true;
  }

  toRedPage() {
    this.setState({
      redPage: true,
      blackPage: false
    });
    window.scrollTo(0, 0);

  }

  toBlackPage() {
    this.setState({
      blackPage: true,
      redPage: false
    });
    window.scrollTo(0, 0);
  }

  render() {
    let toReturn;

    if (this.state.redPage) {
      toReturn = <AppRed toBlackPage={this.toBlackPage} />;
    } else if (this.state.blackPage) {
      toReturn = <AppBlack toRedPage={this.toRedPage} />;
    } else {
      toReturn = (
        <section className="welcome-page-section">
          <div className="cukor-red-section welcome-cukor-red-section justify-center">
            <div className="welcome-page-title">
              <h1>ЦУКОР Red</h1>
              <h3>БРАТІВ РОГАТИНЦІВ 21</h3>
            </div>
            <img src={mainLogo} className="main-logo-welcome" alt="" />
            <a onClick={this.toRedPage} className="button button-black">
              ЗАМОВИТИ
            </a>
            <h1 className="meal-title">CREPES & BREAKFAST</h1>
            <h2>+380 (98) 350 42 51</h2>
          </div>
          <div className="cukor-black-section welcome-cukor-black-section justify-center">
            <div className="welcome-page-title">
              <h1>ЦУКОР Black</h1>
              <h3>КРИВА ЛИПА 3</h3>
            </div>
            <img src={mainLogo} className="main-logo-welcome" alt="" />
            <a onClick={this.toBlackPage} className="button button-red">
              ЗАМОВИТИ
            </a>
            <h1 className="meal-title">BREAKFAST & BURGERS</h1>
            <h2>+380 (98) 679 82 25</h2>
          </div>
        </section>
      );
    }
    return toReturn;
  }
}

export default WelcomePage;
