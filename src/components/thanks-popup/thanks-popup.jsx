import React, {useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import sprite from '../../img/sprite.svg';
import PropTypes from 'prop-types';
import {onOverlayClick} from '../../utils';
import {ClassName, Event} from '../../const';
import {ActionCreator} from '../../store/action';

const ThanksPopup = (props) => {
  const {isVisible, handleClose} = props;

  const hiddenClassName = isVisible ? ClassName.DISPLAY_BLOCK : ClassName.DISPLAY_NONE;

  const ref = useRef();

  onOverlayClick(ref, () => handleClose(false));

  const handleOverlayScroll = (evt) => {
    evt.preventDefault();
  };

  const handleClosePopupBtnClick = () => {
    handleClose(false);
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener(Event.WHEEL, handleOverlayScroll, {passive: false});
    }
    return () => {
      window.removeEventListener(Event.WHEEL, handleOverlayScroll);
    };
  }, [isVisible]);

  return (
    <div className={`popup-wrapper ${hiddenClassName}`}>
      <section ref={ref} className="popup-wrapper__section thanks-popup">
        <h2 className="visually-hidden">Попап Спасибо за обращение</h2>
        <button className="thanks-popup__btn-close" type="button" onClick={handleClosePopupBtnClick}>
          <span className="visually-hidden">Закрыть попап</span>
          <svg width={16} height={16}>
            <use href={sprite + `#popup-close`} />
          </svg>
        </button>
        <p className="thanks-popup__title">Спасибо за обращение в&nbsp;наш банк.</p>
        <p className="thanks-popup__text">Наш менеджер скоро свяжется с вами <br />по указанному номеру телефона.</p>
      </section>
    </div>
  );
};

ThanksPopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  handleClose(payload) {
    dispatch(ActionCreator.setIsThanksPopupVisible(payload));
  },
});

export {ThanksPopup};
export default connect(null, mapDispatchToProps)(ThanksPopup);
