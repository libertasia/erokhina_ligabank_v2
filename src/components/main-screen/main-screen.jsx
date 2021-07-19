import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import logo from '../../img/logo.svg';
import sprite from '../../img/sprite.svg';
import {AppRoute} from '../../const';
import MainMap from '../main-map/main-map';
import LoginPopup from '../login-popup/login-popup';

const ESC_KEY_CODE = 27;

const KEY_DOWN = `keydown`;

const MainScreen = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const hiddenCloseBtnClassName = isMenuOpened ? `header__navigation-btn-close--showed` : ``;
  const hiddenNavigationWrapperClassName = isMenuOpened ? `header__navigation-wrapper--opened` : ``;
  const hiddenSiteNavListClassName = isMenuOpened ? `site-navigation--opened` : ``;
  const hiddenUserNavListClassName = isMenuOpened ? `user-navigation--opened` : ``;
  const hiddenUserNavItemClassName = isMenuOpened ? `user-navigation__item--opened` : ``;
  const hiddenUserNavTextClassName = isMenuOpened ? `user-navigation__text--opened` : ``;
  const hiddenHeaderClassName = isMenuOpened ? `header__navigation--menu-opened` : ``;

  const handleOpenMenuBtnClick = () => {
    if (!isMenuOpened) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  };

  const handleCloseMenuBtnClick = () => {
    setIsMenuOpened(false);
  };

  const handleEscPress = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      setIsMenuOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener(KEY_DOWN, handleEscPress);

    return () => {
      document.removeEventListener(KEY_DOWN, handleEscPress);
    };
  }, []);

  return (
    <React.Fragment>
      <header className="header">
        <nav className={`header__navigation ${hiddenHeaderClassName} container`}>
          <button className="header__navigation-btn" type="button" onClick={handleOpenMenuBtnClick}>
            <span className="visually-hidden">Открыть меню</span>
            <svg width={16} height={10}>
              <use href={sprite + `#menu`} />
            </svg>
          </button>
          <button className={`header__navigation-btn-close ${hiddenCloseBtnClassName}`} type="button" onClick={handleCloseMenuBtnClick}>
            <span className="visually-hidden">Закрыть меню</span>
            <svg width={13} height={13}>
              <use href={sprite + `#menu-close`} />
            </svg>
          </button>
          <a className="logo" href="#">
            <img className="logo__image" src={logo} width={150} height={27} alt="Логотип Лига Банк»" />
          </a>
          <div className={`header__navigation-wrapper ${hiddenNavigationWrapperClassName}`}>
            <ul className={`site-navigation ${hiddenSiteNavListClassName}`}>
              <li className="site-navigation__item"><Link className="site-navigation__link" to={AppRoute.SERVICES}>Услуги</Link></li>
              <li className="site-navigation__item"><Link className="site-navigation__link" to={AppRoute.LOAN}>Рассчитать кредит</Link></li>
              <li className="site-navigation__item"><Link className="site-navigation__link" to={AppRoute.CONVERTER}>Конвертер валют</Link></li>
              <li className="site-navigation__item"><Link className="site-navigation__link" to={AppRoute.CONTACTS}>Контакты</Link></li>
            </ul>
            <ul className={`user-navigation ${hiddenUserNavListClassName}`}>
              <li className={`user-navigation__item ${hiddenUserNavItemClassName}`}>
                <a className="user-navigation__link" href="#" aria-label="Войти в Интернет-банк">
                  <svg className="user-navigation__icon" width={20} height={22}>
                    <use href={sprite + `#icon-login`} />
                  </svg>
                  <span className={`user-navigation__text ${hiddenUserNavTextClassName}`}>Войти в Интернет-банк</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="main">
        {/* <div className="promo">
          <div className="container promo__container">
            <p className="promo__bank-title">Лига Банк</p>
            <p className="promo__text">Кредиты на любой случай</p>
            <Link className="promo__link" to={AppRoute.LOAN}>Рассчитать кредит</Link>
          </div>
        </div>
        <div className="container">
          <h1 className="main__header">Конвертер валют</h1>
          <ConversionForm />
          <ConversionHistory />
        </div> */}
        <MainMap />
      </main>
      <footer className="footer">
        <div className="container footer__container">
          <a className="logo footer__logo" href="#">
            <img className="logo__image" src={logo} width={150} height={27} alt="Логотип Лига Банк»" />
          </a>
          <p className="footer__copyright">150015, г. Москва, ул. Московская, д. 32 Генеральная лицензия Банка России №1050<br />© Лига Банк, 2019</p>
          <ul className="footer__navigation footer-navigation">
            <li className="footer-navigation__item"><Link className="footer-navigation__link" to={AppRoute.SERVICES}>Услуги</Link></li>
            <li className="footer-navigation__item"><Link className="footer-navigation__link" to={AppRoute.LOAN}>Рассчитать кредит</Link></li>
            <li className="footer-navigation__item"><Link className="footer-navigation__link" to={AppRoute.CONTACTS}>Контакты</Link></li>
            <li className="footer-navigation__item"><Link className="footer-navigation__link" to={AppRoute.QUESTION}>Задать вопрос</Link></li>
          </ul>
          <div className="footer__contacts-mobile contacts">
            <a className="contacts__number" href="tel:*0904">*0904</a>
            <p className="contacts__text">Бесплатно для абонентов<br />МТС, Билайн, Мегафон, Теле2</p>
          </div>
          <div className="footer__contacts contacts">
            <a className="contacts__number" href="tel:+78001112233">8 800 111 22 33</a>
            <p className="contacts__text">Бесплатный для всех<br />городов России</p>
          </div>
          <section className="footer__social social">
            <h2 className="visually-hidden">Ссылки на соцсети</h2>
            <ul className="social__list">
              <li className="social__item">
                <a className="social__link social__link--facebook" href="https://www.facebook.com/" aria-label="Мы в Фейсбуке">
                  <span className="visually-hidden">Фейсбук</span>
                  <svg className="social__icon" width={9} height={16}>
                    <use href={sprite + `#icon-facebook`} />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a className="social__link social__link--instagram" href="https://www.instagram.com/" aria-label="Мы в Инстаграме">
                  <span className="visually-hidden">Инстаграм</span>
                  <svg className="social__icon" width={16} height={16}>
                    <use href={sprite + `#icon-instagram`} />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a className="social__link social__link--twitter" href="https://twitter.com/" aria-label="Мы в Твиттере">
                  <span className="visually-hidden">Твиттер</span>
                  <svg className="social__icon" width={16} height={13}>
                    <use href={sprite + `#icon-twitter`} />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a className="social__link social__link--youtube" href="https://www.youtube.com/" aria-label="Мы на Ютюб">
                  <span className="visually-hidden">Ютюб</span>
                  <svg className="social__icon" width={16} height={13}>
                    <use href={sprite + `#icon-youtube`} />
                  </svg>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </footer>
      <LoginPopup />
    </React.Fragment>
  );
};

export default MainScreen;
