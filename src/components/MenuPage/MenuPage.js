import React, { Component } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import MenuSection from "../MenuSection/MenuSection";
import "./MenuPage.css";
import mainLogo from "../../assets/cukor-logo.png";
import marusiaLogo from "../../assets/marusia-logo.png";
import titleImage from "../../assets/cukor-red-title-photo.png";
import feedbackForsqareImg from "../../assets/feedback-forsquare.png";
import feedbackGoogleImg from "../../assets/feedback-google.png";
import feedbackTripAdvImg from "../../assets/feedback-tripadvisor.png";
import socialInstagram from "../../assets/social-instagram.png";
import socialFacebook from "../../assets/social-facebook.png";
import socialYoutube from "../../assets/social-youtube.png";

class MenuPage extends Component {
  componentWillUnmount() {
    this.isCancelled = true;
  }
  render() {
    return (
      <div>
        <header className="cukor-red-header" id="header">
          <div className="title-header">
            <div className="cukor-red-section main-cukor-red-section justify-center">
              <div className="welcome-page-title">
                <h1>ЦУКОР Red</h1>
                <h3>БРАТІВ РОГАТИНЦІВ 21</h3>
              </div>
              <img src={mainLogo} className="main-logo-welcome" alt="" />
              <h1 className="meal-title">CREPES & BREAKFAST</h1>
              <AnchorLink className="button button-black" href="#menu">
                МЕНЮ
              </AnchorLink>
            </div>
          </div>
          <div className="photo-header">
            <img src={titleImage} alt="" />
          </div>
        </header>
        <MenuSection
          productsList={this.props.productsList}
          searchTerm={this.props.term}
          addToCart={this.props.addToCart}
          productQuantity={this.props.productQuantity}
          updateQuantity={this.props.updateQuantity}
          isEmpty={this.props.isEmpty}
          totalItems={this.props.totalItems}
          category={this.props.category}
          toggleCheckout={this.props.toggleCheckout}
          currentPage={this.props.currentPage}
          handleClick={this.props.handleClick}
          resetCounter={this.props.resetCounter}
          handleRemoveProduct={this.props.handleRemoveProduct}
        />
        <section className="visit-placing">
          <div className="visit-cukor-black">
            <img src={mainLogo} alt="" />
            <h1>ЦУКОР Black</h1>
            <h3>КРИВА ЛИПА 3</h3>
            <AnchorLink
              href="#header"
              onClick={this.props.toBlackPage}
              className="button button-red"
            >
              ВІДВІДАТИ
            </AnchorLink>
          </div>
          <div className="visit-marusia">
            <h1>НАША МАРУСЯ</h1>
            <img src={marusiaLogo} alt="" />
            <div className="marusia-addresses-list">
              <h3>КРИВА ЛИПА 3</h3>
              <h3>ПРОСП. ШЕВЧЕНКА 5</h3>
            </div>
            <a
              href="http://marusia.lviv.ua/"
              target="_blank"
              className="button button-black"
            >
              ВІДВІДАТИ
            </a>
          </div>
        </section>
        <section className="leave-feedback">
          <h1>ЗАЛИШИТИ ВІДГУК МОЖНА ТУТ</h1>
          <ul className="feedback-link-list">
            <li>
              <a
                href="https://www.tripadvisor.ru/Restaurant_Review-g295377-d9566168-Reviews-Cukor-Lviv_Lviv_Oblast.html?m=19905"
                target="_blank"
              >
                <img src={feedbackTripAdvImg} alt="" />
              </a>
            </li>
            <li>
              <a href="http://4sq.com/1SEzTbx" target="_blank">
                <img src={feedbackForsqareImg} alt="" />
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com.ua/search?rlz=1C2OKWM_ukUA771UA771&source=hp&ei=akKZW8rtBImpsgGwk6NQ&q=%D1%86%D1%83%D0%BA%D0%BE%D1%80+%D0%B1%D1%80%D0%B0%D1%82%D1%96%D0%B2+%D1%80%D0%BE%D0%B3%D0%B0%D1%82%D0%B8%D0%BD%D1%86%D1%96%D0%B2&oq=%D1%86%D1%83%D0%BA%D0%BE%D1%80+%D0%B1%D1%80&gs_l=psy-ab.3.0.0i19k1l2j0i22i30i19k1l8.3053.8085.0.9103.10.9.0.0.0.0.215.1242.0j7j1.8.0..2..0...1.1.64.psy-ab..2.8.1239.0..0j35i39k1j0i131k1j0i203k1.0.wWxnPzZ3cZA#lrd=0x473add6c3c031067:0x33f3d725457d5df0,3,,,"
                target="_blank"
              >
                <img src={feedbackGoogleImg} alt="" />
              </a>
            </li>
          </ul>
        </section>
        <footer>
          <div className="container">
            <div className="info-footer">
              <div className="socials-footer">
                <a href="">Умови доставки</a>
                <ul className="socials-list">
                  <li>
                    <a
                      href="https://www.facebook.com/cukor.ua/"
                      target="_blank"
                    >
                      <img src={socialFacebook} alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/cukor.lviv/"
                      target="_blank"
                    >
                      <img src={socialInstagram} alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCRFhfEKqqHYpxs8GJb47IMA"
                      target="_blank"
                    >
                      <img src={socialYoutube} alt="" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mail-footer">
                <p>cukor.lviv@gmail.com</p>
              </div>
              <div className="addresses-footer">
                <ul>
                  <li>м. Львів, вул. Крива Липа, 3</li>
                  <li>м. Львів, вул. Братів Рогатинців, 21</li>
                </ul>
              </div>
              <div className="phones-footer">
                <ul>
                  <li>+380 (98) 679 82 25 (вул. Крива Липа),</li>
                  <li>+380 (98) 350 42 51 (вул. Братів Рогатинців)</li>
                </ul>
              </div>
            </div>
            <div className="copyright-footer">
              <div className="copyright-info-footer">
                <p>Copyright © 2018 ЦУКОР</p>
              </div>
              <div className="developed-by-footer">
                <p>
                  Сайт для Цукру зроблено з любов’ю в{" "}
                  <a
                    href="http://sandia.studio/ref?=cukor"
                    target="_blank"
                    className="sandia-link"
                  >
                    Sandia
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default MenuPage;
