import React, {useRef, useEffect, useState} from 'react';
import logoLogin from '../../img/logo-login.svg';
import sprite from '../../img/sprite.svg';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {onOverlayClick} from '../../utils';
// import {ActionCreator} from '../../store/action';
import {login} from "../../store/api-actions";

const ENTER_KEY_CODE = 13;

const PasswordType = {
  PASSWORD: `password`,
  TEXT: `text`,
};

const UserLoginData = {
  LOGIN: `login`,
  PASSWORD: `password`,
};

const LoginPopup = (props) => {
  const {isVisible, handleClose, onLoginFormSubmit} = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginMissing, setIsLoginMissing] = useState(false);
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
  const [userData, setUserData] = useState({
    login: ``,
    password: ``,
  });

  const hiddenClassName = isVisible ? `popup-wrapper--display-block` : `popup-wrapper--display-none`;
  const hiddenMessageLoginClassName = isLoginMissing ? `` : `visually-hidden`;
  const hiddenMessagePasswordClassName = isPasswordMissing ? `` : `visually-hidden`;

  const passwordInput = document.getElementById(`user-password`);

  const setLogin = (evt) => {
    setUserData({...userData, login: evt.target.value});
    localStorage.setItem(UserLoginData.LOGIN, evt.target.value);
  };
  const setPassword = (evt) => {
    console.log(`setting password to ${evt.target.value}`)
    setUserData({...userData, password: evt.target.value});
    localStorage.setItem(UserLoginData.PASSWORD, evt.target.value);
  };

  const ref = useRef();

  const inputEl = useRef(null);

  onOverlayClick(ref, () => handleClose(false));

  useEffect(() => {
    if (isVisible) {
      inputEl.current.focus();
      hidePassword();
    }
    const userLogin = localStorage.getItem(UserLoginData.LOGIN);
    const userPassword = localStorage.getItem(UserLoginData.PASSWORD);

    setUserData({
      ...userData,
      login: userLogin !== null ? userLogin : ``,
      password: userPassword !== null ? userPassword : ``,
    });
  }, [isVisible]);

  const showPassword = () => {
    passwordInput.type = PasswordType.TEXT;
    setIsPasswordVisible(true);
  };

  const hidePassword = () => {
    passwordInput.type = PasswordType.PASSWORD;
    setIsPasswordVisible(false);
  };

  const handleEnterKeyPress = (evt) => {
    if (evt.keyCode === ENTER_KEY_CODE) {
      if (isPasswordVisible) {
        hidePassword();
      } else {
        showPassword();
      }
    }
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    let hasError = false;
    if (!userData.login || !userData.login.trim()) {
      setIsLoginMissing(true);
      hasError = true;
    } else {
      setIsLoginMissing(false);
    }
    if (!userData.password || !userData.password.trim()) {
      setIsPasswordMissing(true);
      hasError = true;
    } else {
      setIsPasswordMissing(false);
    }
    if (hasError) {
      return;
    }
    onLoginFormSubmit(userData);
    handleClose();
  };

  return (
    <div className={`popup-wrapper ${hiddenClassName}`}>
      <section ref={ref} className="popup-wrapper__section login-popup">
        <h2 className="visually-hidden">Вход в интернет-банк</h2>
        <div className="login-popup__header">
          <a className="login-popup__logo" href="#">
            <img className="login-popup__image" src={logoLogin} width={150} height={27} alt="Логотип Лига Банк»" />
          </a>
          <button className="login-popup__btn-close" type="button" onClick={handleClose}>
            <span className="visually-hidden">Закрыть попап</span>
            <svg width={16} height={16}>
              <use href={sprite + `#popup-close`} />
            </svg>
          </button>
        </div>

        <form className="login-popup__form" action="#" method="post" onSubmit={handleFormSubmit}>
          <div className="login-popup__form-field">
            <label className="login-popup__form-label" htmlFor="user-login">Логин<span className={hiddenMessageLoginClassName}>Пожалуйста, заполните поле</span></label>
            <input className="login-popup__form-input" type="text" id="user-login" name="user-login" ref={inputEl} autoFocus={true} minLength="1" onChange={setLogin} value={userData.login}/>
          </div>
          <div className="login-popup__form-field login-popup__form-field--password">
            <label className="login-popup__form-label" htmlFor="user-password">Пароль<span className={hiddenMessagePasswordClassName}>Пожалуйста, заполните поле</span></label>
            <input className="login-popup__form-input" type="password" id="user-password" name="user-password" onChange={setPassword} value={userData.password}/>
            <button className="login-popup__show-password-btn" type="button" onMouseDown={showPassword} onMouseUp={hidePassword} onKeyDown={handleEnterKeyPress}>
              <span className="visually-hidden">Показать пароль</span>
              <svg width={22} height={12}>
                <use href={sprite + `#password-show`} />
              </svg>
            </button>
          </div>
          <a className="login-popup__password-link" href="#">Забыли пароль?</a>
          <button className="login-popup__submit-btn" type="submit">Войти</button>
        </form>
      </section>
    </div>
  );
};

LoginPopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onLoginFormSubmit: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onLoginFormSubmit(userData) {
    dispatch(login(userData));
  },
});

export {LoginPopup};
export default connect(null, mapDispatchToProps)(LoginPopup);
