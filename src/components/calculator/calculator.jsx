import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import {ClassName} from '../../const';
import sprite from '../../img/sprite.svg';
import {ActionCreator} from '../../store/action';

const DEFAULT_TOTAL_COST = 2000000;
const MIN_MORTGAGE_TOTAL_COST = 1200000;
const MAX_MORTGAGE_TOTAL_COST = 25000000;
const MIN_AUTO_TOTAL_COST = 500000;
const MAX_AUTO_TOTAL_COST = 5000000;
const MIN_MORTGAGE_INITIAL_PAYMENT_PERCENTAGE = 10;
const MIN_AUTO_INITIAL_PAYMENT_PERCENTAGE = 20;
const MIN_MORTGAGE_LOAN_DURATION_YEARS = 5;
const MAX_MORTGAGE_LOAN_DURATION_YEARS = 30;
const MIN_AUTO_LOAN_DURATION_YEARS = 1;
const MAX_AUTO_LOAN_DURATION_YEARS = 5;
const MORTGAGE_STEP = 100000;
const AUTO_STEP = 50000;

const DEFAULT_LOCALE = `ru`;

const RADIX = 10;

const LoanType = {
  NONE: `none`,
  MORTGAGE: `mortgage`,
  AUTO: `auto`,
};

const InputType = {
  TEXT: `text`,
  NUMBER: `number`,
};

const Calculator = (props) => {
  const {onSubmitBtnClick} = props;

  const [loanType, setLoanType] = useState(LoanType.NONE);
  const [isSelectListShowed, setIsSelectListShowed] = useState(false);
  const [isSecondStepShowed, setIsSecondStepShowed] = useState(false);
  const [isThirdStepShowed, setIsThirdStepShowed] = useState(false);

  const [totalCost, setTotalCost] = useState(DEFAULT_TOTAL_COST);
  const [totalCostValue, setTotalCostValue] = useState(`${totalCost.toLocaleString(DEFAULT_LOCALE)} рублей`);
  const [totalCostType, setTotalCostType] = useState(InputType.TEXT);
  const [isTotalCostInvalid, setIsTotalCostInvalid] = useState(false);

  const inputNameEl = useRef(null);

  const closeListBtnClassName = isSelectListShowed ? `calculator__loan-purpose-btn--close` : ``;
  const hiddenSelectListClassName = isSelectListShowed ? ClassName.DISPLAY_BLOCK : ClassName.DISPLAY_NONE;
  const hiddenSecondStepClassName = isSecondStepShowed ? ClassName.DISPLAY_BLOCK : ClassName.DISPLAY_NONE;
  const hiddenThirdStepClassName = isThirdStepShowed ? ClassName.DISPLAY_BLOCK : ClassName.DISPLAY_NONE;


  let loanSelectButtonText = `Выберите цель кредита`;
  let loanParametersLabelText = ``;
  let purchaseValueText = ``;
  let hiddenCheckboxForMortgageClassName = ``;
  let hiddenCheckboxForAutoClassName = ``;
  let offerDescriptionText = ``;
  let loanTooSmallText = ``;
  let loanPurposeText = ``;
  let loanPriceText = ``;
  let loanInitialPaymentPercentText = ``;
  let loanMinDurationText = ``;
  let loanMaxDurationText = ``;

  if (loanType === LoanType.MORTGAGE) {
    loanSelectButtonText = `Ипотечное кредитование`;
    loanParametersLabelText = `Стоимость недвижимости`;
    purchaseValueText = `От 1 200 000  до 25 000 000 рублей`;
    hiddenCheckboxForMortgageClassName = ClassName.DISPLAY_BLOCK;
    hiddenCheckboxForAutoClassName = ClassName.DISPLAY_NONE;
    offerDescriptionText = `Сумма ипотеки`;
    loanTooSmallText = `Наш банк не выдаёт ипотечные кредиты меньше 500 000 рублей.`;
    loanPurposeText = `Ипотека`;
    loanPriceText = `Стоимость недвижимости`;
    loanInitialPaymentPercentText = `${MIN_MORTGAGE_INITIAL_PAYMENT_PERCENTAGE}`;
    loanMinDurationText = `${MIN_MORTGAGE_LOAN_DURATION_YEARS}`;
    loanMaxDurationText = `${MAX_MORTGAGE_LOAN_DURATION_YEARS}`;
  } else if (loanType === LoanType.AUTO) {
    loanSelectButtonText = `Автомобильное кредитование`;
    loanParametersLabelText = `Стоимость автомобиля`;
    purchaseValueText = `От 500 000  до 5 000 000 рублей`;
    hiddenCheckboxForMortgageClassName = ClassName.DISPLAY_NONE;
    hiddenCheckboxForAutoClassName = ClassName.DISPLAY_BLOCK;
    offerDescriptionText = `Сумма автокредита`;
    loanTooSmallText = `Наш банк не выдаёт автокредиты меньше 200 000 рублей.`;
    loanPurposeText = `Автокредит`;
    loanPriceText = `Стоимость автомобиля`;
    loanInitialPaymentPercentText = `${MIN_AUTO_INITIAL_PAYMENT_PERCENTAGE}`;
    loanMinDurationText = `${MIN_AUTO_LOAN_DURATION_YEARS}`;
    loanMaxDurationText = `${MAX_AUTO_LOAN_DURATION_YEARS}`;
  }

  const handleLoanPurposeBtnClick = () => {
    if (!isSelectListShowed) {
      setIsSelectListShowed(true);
    } else {
      setIsSelectListShowed(false);
    }
  };

  const handleLoanListItemClick = (evt) => {
    evt.preventDefault();
    const selectedLoanType = evt.target.dataset.loantype;
    setLoanType(selectedLoanType);
    setIsSelectListShowed(false);
    if (selectedLoanType !== LoanType.NONE) {
      setIsSecondStepShowed(true);
    }
    updateTotalCost(totalCost, selectedLoanType);
  };

  const handleOfferBtnClick = () => {
    setIsThirdStepShowed(true);
  };

  useEffect(() => {
    if (isThirdStepShowed) {
      inputNameEl.current.focus();
    }
  }, [isThirdStepShowed]);

  const handleTotalCostFocus = () => {
    setTotalCostType(InputType.NUMBER);
    setTotalCostValue(totalCost);
  };

  const handleTotalCostBlur = () => {
    setTotalCostType(InputType.TEXT);
    setTotalCostValue(`${totalCost.toLocaleString(DEFAULT_LOCALE)} рублей`);
  };

  const updateTotalCost = (newTotalCost, currentLoanType) => {
    setTotalCost(newTotalCost);
    if (totalCostType === InputType.NUMBER) {
      setTotalCostValue(newTotalCost);
    } else {
      setTotalCostValue(`${newTotalCost.toLocaleString(DEFAULT_LOCALE)} рублей`);
    }
    switch (currentLoanType) {
      case LoanType.MORTGAGE:
        if (newTotalCost < MIN_MORTGAGE_TOTAL_COST || newTotalCost > MAX_MORTGAGE_TOTAL_COST) {
          setIsTotalCostInvalid(true);
        } else {
          setIsTotalCostInvalid(false);
        }
        break;
      case LoanType.AUTO:
        if (newTotalCost < MIN_AUTO_TOTAL_COST || newTotalCost > MAX_AUTO_TOTAL_COST) {
          setIsTotalCostInvalid(true);
        } else {
          setIsTotalCostInvalid(false);
        }
        break;
      default:
        break;
    }
  };

  const handleTotalCostChange = (evt) => {
    const newTotalCost = parseInt(evt.target.value, RADIX);
    updateTotalCost(newTotalCost, loanType);
  };

  const handleTotalCostMinusClick = () => {
    const step = loanType === LoanType.MORTGAGE ? MORTGAGE_STEP : AUTO_STEP;
    let newTotalCost = totalCost - step;
    if (newTotalCost < 0) {
      newTotalCost = 0;
    }
    updateTotalCost(newTotalCost, loanType);
  };

  const handleTotalCostPlusClick = () => {
    const step = loanType === LoanType.MORTGAGE ? MORTGAGE_STEP : AUTO_STEP;
    updateTotalCost(totalCost + step, loanType);
  };

  const handleSubmitBtnClick = (evt) => {
    evt.preventDefault();
    onSubmitBtnClick(true);
  };

  return (
    <section className="calculator container">
      <h2 className="calculator__title">Кредитный калькулятор</h2>
      <form className="calculator__form" action="#" method="post">
        <div className="calculator__first-step">
          <h3 className="calculator__step-title">Шаг 1. Цель кредита</h3>
          <div className="calculator__loan-purpose-wrapper">
            <button className={`calculator__loan-purpose-btn ${closeListBtnClassName}`} type="button" onClick={handleLoanPurposeBtnClick}>{loanSelectButtonText}</button>
            <ul className={`calculator__select-list ${hiddenSelectListClassName}`}>
              <li className="calculator__select-list-item" ><a href="" data-loantype={LoanType.MORTGAGE} onClick={handleLoanListItemClick}>Ипотечное кредитование</a></li>
              <li className="calculator__select-list-item" ><a href="" data-loantype={LoanType.AUTO} onClick={handleLoanListItemClick}>Автомобильное кредитование</a></li>
            </ul>
          </div>
        </div>

        <div className={`calculator__second-step ${hiddenSecondStepClassName}`}>
          <h3 className="calculator__step-title">Шаг 2. Введите параметры кредита</h3>
          <div className="calculator__loan-parameters-wrapper loan-parameters">
            <div className="loan-parameters__item">
              <label className="loan-parameters__label" htmlFor="purchase-value">{loanParametersLabelText}</label>
              <div className="loan-parameters__purchase-value-input-wrapper">
                <span className={`loan-parameters__wrong-value ${isTotalCostInvalid ? ClassName.DISPLAY_BLOCK : ClassName.DISPLAY_NONE}`}>Некорректное значение</span>
                <input className={`loan-parameters__input ${isTotalCostInvalid ? `loan-parameters__input-invalid` : ``}`} id="purchase-value" name="purchase-value" type={totalCostType} value={totalCostValue} onFocus={handleTotalCostFocus} onBlur={handleTotalCostBlur} onChange={handleTotalCostChange}/>
                <button className="loan-parameters__purchase-value-btn loan-parameters__purchase-value-btn--minus" type="button" aria-label="Уменьшить стоимость" onClick={handleTotalCostMinusClick}>
                  <svg className="loan-parameters__purchase-value-btn-icon" width={16} height={2}>
                    <use href={sprite + `#icon-minus`} />
                  </svg>
                </button>
                <button className="loan-parameters__purchase-value-btn loan-parameters__purchase-value-btn--plus" type="button" aria-label="Увеличить стоимость" onClick={handleTotalCostPlusClick}>
                  <svg className="loan-parameters__purchase-value-btn-icon" width={16} height={16}>
                    <use href={sprite + `#icon-plus`} />
                  </svg>
                </button>
              </div>
              <span className="loan-parameters__purchase-value-text">{purchaseValueText}</span>
            </div>

            <div className="loan-parameters__item">
              <label className="loan-parameters__label" htmlFor="itinial-payment">Первоначальный взнос</label>
              <input className="loan-parameters__input" id="itinial-payment" name="itinial-payment" defaultValue="200 000 рублей" />
              <div className="loan-parameters__slider">
                <div className="loan-parameters__level-line">
                  <button className="loan-parameters__level-btn" type="button" aria-label="Изменить сумму первоначального взноса"></button>
                </div>
                <span className="loan-parameters__slider-min-value">{loanInitialPaymentPercentText}%</span>
              </div>
            </div>

            <div className="loan-parameters__item">
              <label className="loan-parameters__label" htmlFor="loan-duration">Срок кредитования</label>
              <input className="loan-parameters__input" id="loan-duration" name="loan-duration" defaultValue="5 лет" />
              <div className="loan-parameters__slider">
                <div className="loan-parameters__level-line">
                  <button className="loan-parameters__level-btn" type="button" aria-label="Изменить срок кредитования"></button>
                </div>
                <span className="loan-parameters__slider-min-value">{loanMinDurationText} лет</span>
                <span className="loan-parameters__slider-max-value">{loanMaxDurationText} лет</span>
              </div>
            </div>

            <div className="loan-parameters__item loan-parameters__item--additional">
              <ul className="loan-parameters__additional-list">
                <li className={`loan-parameters__additional-item ${hiddenCheckboxForMortgageClassName}`}>
                  <input className="loan-parameters__additional-item-checkbox visually-hidden" type="checkbox" id="maternal-discount" name="maternal-discount" defaultChecked/>
                  <label className="loan-parameters__additional-item-label" htmlFor="maternal-discount">Использовать материнский капитал</label>
                </li>
                <li className={`loan-parameters__additional-item ${hiddenCheckboxForAutoClassName}`}>
                  <input className="loan-parameters__additional-item-checkbox visually-hidden" type="checkbox" id="casco-insurance" name="casco-insurance" defaultChecked/>
                  <label className="loan-parameters__additional-item-label" htmlFor="casco-insurance">Оформить КАСКО в нашем банке</label>
                </li>
                <li className={`loan-parameters__additional-item ${hiddenCheckboxForAutoClassName}`}>
                  <input className="loan-parameters__additional-item-checkbox visually-hidden" type="checkbox" id="life-insurance" name="life-insurance" defaultChecked/>
                  <label className="loan-parameters__additional-item-label" htmlFor="life-insurance">Оформить Страхование жизни в нашем банке</label>
                </li>
              </ul>
            </div>
          </div>

          <div className="display-block">
            <div className="calculator__offer">
              <h3 className="calculator__offer-title">Наше предложение</h3>
              <ul className="calculator__offer-list">
                <li className="calculator__offer-item">
                  <p className="calculator__offer-amount">1 330 000 рублей</p>
                  <p className="calculator__offer-description-text">{offerDescriptionText}</p>
                </li>
                <li className="calculator__offer-item calculator__offer-item--percent">
                  <p className="calculator__offer-amount">9,40%</p>
                  <p className="calculator__offer-description-text">Процентная ставка</p>
                </li>
                <li className="calculator__offer-item">
                  <p className="calculator__offer-amount">27 868 рублей</p>
                  <p className="calculator__offer-description-text">Ежемесячный платеж</p>
                </li>
                <li className="calculator__offer-item calculator__offer-item--income">
                  <p className="calculator__offer-amount">61 929 рублей</p>
                  <p className="calculator__offer-description-text">Необходимый доход</p>
                </li>
              </ul>
              <button className="calculator__offer-btn" type="button" onClick={handleOfferBtnClick}>Оформить заявку</button>
            </div>
          </div>

          <div className="display-none">
            <div className="calculator__message">
              <p className="calculator__message-loan-too-small">{loanTooSmallText}</p>
              <p className="calculator__message-change-calc-params">Попробуйте использовать другие <br />параметры для расчёта.</p>
            </div>
          </div>
        </div>

        <div className={`calculator__third-step ${hiddenThirdStepClassName}`}>
          <h3 className="calculator__step-title calculator__step-title--third">Шаг 3. Оформление заявки</h3>
          <div className="calculator__application-wrapper application">
            <ul className="application__list">
              <li className="application__list-item">
                <p className="application__list-item-title">Номер заявки</p>
                <p className="application__list-item-value">№ 0010</p>
              </li>
              <li className="application__list-item">
                <p className="application__list-item-title">Цель кредита</p>
                <p className="application__list-item-value">{loanPurposeText}</p>
              </li>
              <li className="application__list-item">
                <p className="application__list-item-title">{loanPriceText}</p>
                <p className="application__list-item-value">2 000 000 рублей</p>
              </li>
              <li className="application__list-item">
                <p className="application__list-item-title">Первоначальный взнос</p>
                <p className="application__list-item-value">200 000 рублей</p>
              </li>
              <li className="application__list-item">
                <p className="application__list-item-title">Срок кредитования</p>
                <p className="application__list-item-value">5 лет</p>
              </li>
            </ul>

            <div className="application__fields-wrapper">
              <label className="visually-hidden" htmlFor="name">Укажите ваше имя</label>
              <input className="application__field-name" type="text" id="name" name="name" placeholder="ФИО" minLength="1" ref={inputNameEl} autoFocus={true}/>
              <label className="visually-hidden" htmlFor="tel">Укажите ваш телефон</label>
              <InputMask
                mask="+7 (999) 999-99-99"
                className="application__field-tel"
                type="tel"
                id="tel"
                name="tel"
                placeholder="Телефон"
              />
              <label className="visually-hidden" htmlFor="email">Укажите ваш адрес электронной почты</label>
              <input className="application__field-email" type="email" id="email" name="email" placeholder="E-mail"/>
            </div>
            <button className="application__submit-btn" type="submit" onClick={handleSubmitBtnClick}>Отправить</button>
          </div>
        </div>
      </form>
    </section>
  );
};

Calculator.propTypes = {
  onSubmitBtnClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmitBtnClick(payload) {
    dispatch(ActionCreator.setIsThanksPopupVisible(payload));
  },
});

export {Calculator};
export default connect(null, mapDispatchToProps)(Calculator);
