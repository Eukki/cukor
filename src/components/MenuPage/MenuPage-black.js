import React, { Component } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import MenuSection from "../MenuSection/MenuSection-black";
import "./MenuPage-black.css";
import mainLogo from "../../assets/cukor-logo.png";
import marusiaLogo from "../../assets/marusia-logo.png";
import titleImage from "../../assets/cukor-black-title-photo.jpg";
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
        <header className="cukor-black-header" id="header">
          <div className="title-header">
            <div className="cukor-black-section main-cukor-red-section justify-center">
              <div className="welcome-page-title">
                <h1>ЦУКОР Black</h1>
                <h3>КРИВА ЛИПА 3</h3>
              </div>
              <img src={mainLogo} className="main-logo-welcome" alt="" />
              <h1 className="meal-title">BREAKFAST & BURGERS</h1>
              <AnchorLink className="button button-red" href="#menu">
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
        <section className="visit-placing-black">
          <div className="visit-cukor-red">
            <img src={mainLogo} alt="" />
            <h1>ЦУКОР Red</h1>
            <h3>БРАТІВ РОГАТИНЦІВ 21</h3>
            <AnchorLink
              href="#header"
              onClick={this.props.toRedPage}
              className="button button-black"
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
                href="https://www.tripadvisor.ru/Restaurant_Review-g295377-d12860902-Reviews-Cukor-Lviv_Lviv_Oblast.html"
                target="_blank"
              >
                <img src={feedbackTripAdvImg} alt="" />
              </a>
            </li>
            <li>
              <a href="http://4sq.com/2ot72Pp" target="_blank">
                <img src={feedbackForsqareImg} alt="" />
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com.ua/search?rlz=1C2OKWM_ukUA771UA771&ei=hfbGW6WbPILvrgSPwqEY&q=%D1%86%D1%83%D0%BA%D0%BE%D1%80+%D0%BA%D1%80%D0%B8%D0%B2%D0%B0+%D0%BB%D0%B8%D0%BF%D0%B0&oq=%D1%86%D1%83%D0%BA%D0%BE%D1%80+%D0%BA%D1%80%D0%B8%D0%B2%D0%B0+&gs_l=psy-ab.3.0.0j0i22i10i30k1j38l2.208569.209463.0.210933.6.6.0.0.0.0.167.521.0j4.4.0....0...1c.1.64.psy-ab..2.4.519...0i22i30k1.0.yhWrWFwjwnw#lrd=0x473add71fe468c6b:0x879cc19d9ee261d2,3,,,"
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
