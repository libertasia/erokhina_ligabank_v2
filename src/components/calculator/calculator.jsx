import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {ClassName} from '../../const';
import sprite from '../../img/sprite.svg';
import {ActionCreator} from '../../store/action';
import {sendApplication} from '../../store/api-actions';

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

const SliderOptions = {
  Mortgage: {
    InitialPayment: {
      MIN_VALUE: 10,
      MAX_VALUE: 100,
      STEP: 5
    },
    Duration: {
      MIN_VALUE: 5,
      MAX_VALUE: 30,
      STEP: 1
    }
  },
  Auto: {
    InitialPayment: {
      MIN_VALUE: 20,
      MAX_VALUE: 100,
      STEP: 5
    },
    Duration: {
      MIN_VALUE: 1,
      MAX_VALUE: 5,
      STEP: 1
    }
  }
}

const DEFAULT_LOCALE = `ru`;

const RADIX = 10;

const MULTIPLIER = 100;

const LoanType = {
  NONE: `none`,
  MORTGAGE: `mortgage`,
  AUTO: `auto`,
};

const InputType = {
  TEXT: `text`,
  NUMBER: `number`,
};

const UserApplicationData = {
  NAME: `name`,
  TEL: `tel`,
  EMAIL: `email`,
};

const SliderLevelLineStyle = {
  height: `1px`,
  backgroundColor: `#C1C2CA`,
};

const SliderToggleStyle = {
  borderColor: 'blue',
  height: 14,
  width: 14,
  marginLeft: 7,
  left: `100%`,
  right: `auto`,
  transform: `translateX(-50%)`,
  borderRadius: `50%`,
  backgroundColor: '#2C36F2',
};

const getMinInitialPaymentValue = (loanType, totalCost) => {
  const initialPaymentPercentage = loanType === LoanType.MORTGAGE ? MIN_MORTGAGE_INITIAL_PAYMENT_PERCENTAGE : MIN_AUTO_INITIAL_PAYMENT_PERCENTAGE;
  return (totalCost * initialPaymentPercentage) / MULTIPLIER;
};

const getMinLoanDuration = (loanType) => {
  return loanType === LoanType.MORTGAGE ? MIN_MORTGAGE_LOAN_DURATION_YEARS : MIN_AUTO_LOAN_DURATION_YEARS;
};

const getMaxLoanDuration = (loanType) => {
  return loanType === LoanType.MORTGAGE ? MAX_MORTGAGE_LOAN_DURATION_YEARS : MAX_AUTO_LOAN_DURATION_YEARS;
};

const Calculator = (props) => {
  const {onSubmitBtnClick, onApplicationFormSubmit} = props;

  const [loanType, setLoanType] = useState(LoanType.NONE);
  const [isSelectListShowed, setIsSelectListShowed] = useState(false);
  const [isSecondStepShowed, setIsSecondStepShowed] = useState(false);
  const [isThirdStepShowed, setIsThirdStepShowed] = useState(false);

  const [totalCost, setTotalCost] = useState(DEFAULT_TOTAL_COST);
  const [totalCostValue, setTotalCostValue] = useState(`${totalCost.toLocaleString(DEFAULT_LOCALE)} рублей`);
  const [totalCostInputType, setTotalCostInputType] = useState(InputType.TEXT);
  const [isTotalCostInvalid, setIsTotalCostInvalid] = useState(false);

  const [initialPayment, setInitialPayment] = useState(getMinInitialPaymentValue(loanType, totalCost));
  const [initialPaymentValue, setInitialPaymentValue] = useState(`${initialPayment.toLocaleString(DEFAULT_LOCALE)} рублей`);
  const [initialPaymentInputType, setInitialPaymentInputType] = useState(InputType.TEXT);

  const [loanDuration, setloanDuration] = useState(getMinLoanDuration(LoanType.MORTGAGE));
  const [loanDurationValue, setloanDurationValue] = useState(`${loanDuration.toLocaleString(DEFAULT_LOCALE)} лет`);
  const [loanDurationInputType, setloanDurationInputType] = useState(InputType.TEXT);

  const [isMaternalDiscountChecked, setIsMaternalDiscountChecked] = useState(false);
  const [isCascoInsuranceChecked, setIsCascoInsuranceChecked] = useState(false);
  const [isLifeInsuranceChecked, setIsLifeInsuranceChecked] = useState(false);

  const [isErrorinUserData, setIsErrorinUserData] = useState(false);

  const [initialPaymentSliderValue, setInitialPaymentSliderValue] = useState(0);
  const [loanDurationSliderValue, setLoanDurationSliderValue] = useState(0);

  const [userData, setUserData] = useState({
    userName: ``,
    userTel: ``,
    userEmail: ``,
  });

  const closeForm = () => {
    setLoanType(LoanType.NONE);
    setIsSelectListShowed(false);
    setIsSecondStepShowed(false);
    setIsThirdStepShowed(false);

    setTotalCost(DEFAULT_TOTAL_COST);
    setTotalCostValue(`${totalCost.toLocaleString(DEFAULT_LOCALE)} рублей`);
    setTotalCostInputType(InputType.TEXT);
    setIsTotalCostInvalid(false);
  };

  const inputNameEl = useRef(null);

  const closeListBtnClassName = isSelectListShowed ? `calculator__loan-purpose-btn--close` : ``;
  const hiddenSelectListClassName = isSelectListShowed ? ClassName.DISPLAY_BLOCK : ClassName.DISPLAY_NONE;
  const hiddenSecondStepClassName = isSecondStepShowed ? ClassName.DISPLAY_BLOCK : ClassName.DISPLAY_NONE;
  const hiddenThirdStepClassName = isThirdStepShowed ? ClassName.DISPLAY_BLOCK : ClassName.DISPLAY_NONE;
  const hiddenErrorMessageClassName = isErrorinUserData ? `` : ClassName.VISUALLY_HIDDEN;


  let loanSelectButtonText = `Выберите цель кредита`;
  let loanParametersLabelText = ``;
  let purchaseValueText = ``;
  let hiddenCheckboxForMortgageClassName = ``;
  let hiddenCheckboxForAutoClassName = ``;
  let offerDescriptionText = ``;
  let loanTooSmallText = ``;
  let loanPurposeText = ``;
  let loanPriceText = ``;
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

    const minPayment = getMinInitialPaymentValue(selectedLoanType, totalCost);
    setInitialPayment(minPayment);
    updateInitialPayment(minPayment, totalCost, selectedLoanType);

    const minLoanDuration = getMinLoanDuration(selectedLoanType);
    setloanDuration(minLoanDuration);
    updateLoanDuration(minLoanDuration, selectedLoanType);

    setIsMaternalDiscountChecked(false);
    setIsCascoInsuranceChecked(false);
    setIsLifeInsuranceChecked(false);
  };

  const handleOfferBtnClick = () => {
    setIsThirdStepShowed(true);
  };

  const handleTotalCostFocus = () => {
    setTotalCostInputType(InputType.NUMBER);
    setTotalCostValue(totalCost);
  };

  const handleTotalCostBlur = () => {
    setTotalCostInputType(InputType.TEXT);
    setTotalCostValue(`${totalCost.toLocaleString(DEFAULT_LOCALE)} рублей`);
    const newSliderValue = Math.round((initialPayment / totalCost) * MULTIPLIER);
    setInitialPaymentSliderValue(newSliderValue);
  };

  const updateTotalCost = (newTotalCost, currentLoanType) => {
    setTotalCost(newTotalCost);
    const minPayment = getMinInitialPaymentValue(currentLoanType, newTotalCost);
    updateInitialPayment(minPayment, newTotalCost, currentLoanType);
    if (totalCostInputType === InputType.NUMBER) {
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
    let newTotalCost = parseInt(evt.target.value, RADIX);
    if (!newTotalCost) {
      newTotalCost = 0;
    }
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

  const handleInitialPaymentFocus = () => {
    setInitialPaymentInputType(InputType.NUMBER);
    setInitialPaymentValue(initialPayment);
  };

  const handleInitialPaymentBlur = () => {
    setInitialPaymentInputType(InputType.TEXT);
    const newInitialPayment = validateInitialPayment(initialPayment, loanType, totalCost);
    const newSliderValue = Math.round((newInitialPayment / totalCost) * MULTIPLIER);
    setInitialPaymentSliderValue(newSliderValue);
    setInitialPayment(newInitialPayment);
    setInitialPaymentValue(`${newInitialPayment.toLocaleString(DEFAULT_LOCALE)} рублей`);
  };

  const validateInitialPayment = (newInitialPayment, currentLoanType, totalCost) => {
    const minPayment = getMinInitialPaymentValue(currentLoanType, totalCost);
    return newInitialPayment < minPayment ? minPayment : newInitialPayment;
  };

  const updateInitialPayment = (newInitialPayment, totalCost, currentLoanType, validate = true) => {
    const updatedInitialPayment = validate ? validateInitialPayment(newInitialPayment, currentLoanType, totalCost) : newInitialPayment;
    setInitialPayment(updatedInitialPayment);

    if (initialPaymentInputType === InputType.NUMBER) {
      setInitialPaymentValue(updatedInitialPayment);
    } else {
      setInitialPaymentValue(`${updatedInitialPayment.toLocaleString(DEFAULT_LOCALE)} рублей`);
    }
  };

  const handleInitialPaymentChange = (evt) => {
    let newInitialPayment = parseInt(evt.target.value, RADIX);
    if (!newInitialPayment) {
      newInitialPayment = 0;
    }
    updateInitialPayment(newInitialPayment, totalCost, loanType, false);
  };

  const handleLoanDurationFocus = () => {
    setloanDurationInputType(InputType.NUMBER);
    setloanDurationValue(loanDuration);
  };

  const handleLoanDurationBlur = () => {
    setloanDurationInputType(InputType.TEXT);
    const newLoanDuration = validateLoanDuration(loanDuration, loanType);
    setloanDuration(newLoanDuration);
    setloanDurationValue(`${newLoanDuration.toLocaleString(DEFAULT_LOCALE)} лет`);
    setLoanDurationSliderValue(newLoanDuration);
  };

  const validateLoanDuration = (newLoanDuration, currentLoanType) => {
    let validatedDuration = newLoanDuration;
    if (!validatedDuration) {
      validatedDuration = 0;
    }
    const minLoanDuration = getMinLoanDuration(currentLoanType);
    const maxLoanDuration = getMaxLoanDuration(currentLoanType);
    if (validatedDuration < minLoanDuration) {
      validatedDuration = minLoanDuration;
    } else if (validatedDuration > maxLoanDuration) {
      validatedDuration = maxLoanDuration;
    }
    return validatedDuration;
  };

  const updateLoanDuration = (newLoanDuration, currentLoanType, validate = true) => {
    let updatedDuration = validate ? validateLoanDuration(newLoanDuration, currentLoanType) : newLoanDuration;
    setloanDuration(updatedDuration);
    if (loanDurationInputType === InputType.NUMBER) {
      if (!updatedDuration) {
        updatedDuration = ``;
      }
      setloanDurationValue(updatedDuration);
    } else {
      setloanDurationValue(`${updatedDuration.toLocaleString(DEFAULT_LOCALE)} лет`);
    }
  };

  const handleLoanDurationChange = (evt) => {
    let newLoanDuration = parseInt(evt.target.value, RADIX);
    updateLoanDuration(newLoanDuration, loanType, false);
  };

  const handleMaternalDiscountChange = () => {
    if (!isMaternalDiscountChecked) {
      setIsMaternalDiscountChecked(true);
    } else {
      setIsMaternalDiscountChecked(false);
    }
  };

  const handleCascoInsuranceChange = () => {
    if (!isCascoInsuranceChecked) {
      setIsCascoInsuranceChecked(true);
    } else {
      setIsCascoInsuranceChecked(false);
    }
  };

  const handleLifeInsuranceChange = () => {
    if (!isLifeInsuranceChecked) {
      setIsLifeInsuranceChecked(true);
    } else {
      setIsLifeInsuranceChecked(false);
    }
  };

  const handleInitialPaymentSliderValueChange = (newValue) => {
    setInitialPaymentSliderValue(newValue);
    const newInitialPayment = totalCost * newValue / MULTIPLIER;
    updateInitialPayment(newInitialPayment, totalCost, loanType)
  };

  const handleLoanDurationSliderValueChange = (newValue) => {
    setLoanDurationSliderValue(newValue);
    updateLoanDuration(newValue, loanType)
  };

  const setUserName = (evt) => {
    setUserData({...userData, userName: evt.target.value});
    localStorage.setItem(UserApplicationData.NAME, evt.target.value);
  };

  const setUserTel = (evt) => {
    setUserData({...userData, userTel: evt.target.value});
    localStorage.setItem(UserApplicationData.TEL, evt.target.value);
  };

  const setUserEmail = (evt) => {
    setUserData({...userData, userEmail: evt.target.value});
    localStorage.setItem(UserApplicationData.EMAIL, evt.target.value);
  };

  useEffect(() => {
    if (isThirdStepShowed) {
      inputNameEl.current.focus();
    }
    const nameFromLocalStorage = localStorage.getItem(UserApplicationData.NAME);
    const telFromLocalStorage = localStorage.getItem(UserApplicationData.TEL);
    const emailFromLocalStorage = localStorage.getItem(UserApplicationData.EMAIL);

    setUserData({
      ...userData,
      userName: nameFromLocalStorage !== null ? nameFromLocalStorage : ``,
      userTel: telFromLocalStorage !== null ? telFromLocalStorage : ``,
      userEmail: emailFromLocalStorage !== null ? emailFromLocalStorage : ``,
    });
  }, [isThirdStepShowed]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    let hasError = false;
    if (!userData.userName || !userData.userName.trim() || !userData.userTel || !userData.userTel.trim() || !userData.userEmail || !userData.userEmail.trim()) {
      setIsErrorinUserData(true);
      hasError = true;
    } else {
      setIsErrorinUserData(false);
    }

    if (hasError) {
      return;
    }
    onApplicationFormSubmit(userData);
    closeForm();
    onSubmitBtnClick(true);
  };

  return (
    <section className="calculator container">
      <h2 className="calculator__title">Кредитный калькулятор</h2>
      <form className="calculator__form" action="#" method="post" onSubmit={handleFormSubmit}>
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
                <input className={`loan-parameters__input ${isTotalCostInvalid ? `loan-parameters__input-invalid` : ``}`} id="purchase-value" name="purchase-value" type={totalCostInputType} value={totalCostValue} onFocus={handleTotalCostFocus} onBlur={handleTotalCostBlur} onChange={handleTotalCostChange}/>
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
              <input className="loan-parameters__input" id="itinial-payment" name="itinial-payment" type={initialPaymentInputType} value={initialPaymentValue} onFocus={handleInitialPaymentFocus} onBlur={handleInitialPaymentBlur} onChange={handleInitialPaymentChange}/>
              <div className="loan-parameters__slider">
                <Slider
                  min={loanType === LoanType.MORTGAGE ? SliderOptions.Mortgage.InitialPayment.MIN_VALUE : SliderOptions.Auto.InitialPayment.MIN_VALUE}
                  max={loanType === LoanType.MORTGAGE ? SliderOptions.Mortgage.InitialPayment.MAX_VALUE : SliderOptions.Auto.InitialPayment.MAX_VALUE}
                  step={loanType === LoanType.MORTGAGE ? SliderOptions.Mortgage.InitialPayment.STEP : SliderOptions.Auto.InitialPayment.STEP}
                  value={initialPaymentSliderValue}
                  onChange={handleInitialPaymentSliderValueChange}
                  trackStyle={SliderLevelLineStyle}
                  handleStyle={SliderToggleStyle}
                  railStyle={SliderLevelLineStyle}
                />
                <span className="loan-parameters__slider-min-value">{initialPaymentSliderValue}%</span>
              </div>
            </div>

            <div className="loan-parameters__item">
              <label className="loan-parameters__label" htmlFor="loan-duration">Срок кредитования</label>
              <input className="loan-parameters__input" id="loan-duration" name="loan-duration" type={loanDurationInputType} value={loanDurationValue} onFocus={handleLoanDurationFocus} onBlur={handleLoanDurationBlur} onChange={handleLoanDurationChange}/>
              <div className="loan-parameters__slider">
                <Slider
                    min={loanType === LoanType.MORTGAGE ? SliderOptions.Mortgage.Duration.MIN_VALUE : SliderOptions.Auto.Duration.MIN_VALUE}
                    max={loanType === LoanType.MORTGAGE ? SliderOptions.Mortgage.Duration.MAX_VALUE : SliderOptions.Auto.Duration.MAX_VALUE}
                    step={loanType === LoanType.MORTGAGE ? SliderOptions.Mortgage.Duration.STEP : SliderOptions.Auto.Duration.STEP}
                    value={loanDurationSliderValue}
                    onChange={handleLoanDurationSliderValueChange}
                    trackStyle={SliderLevelLineStyle}
                    handleStyle={SliderToggleStyle}
                    railStyle={SliderLevelLineStyle}
                  />
                <span className="loan-parameters__slider-min-value">{loanMinDurationText} лет</span>
                <span className="loan-parameters__slider-max-value">{loanMaxDurationText} лет</span>
              </div>
            </div>

            <div className="loan-parameters__item loan-parameters__item--additional">
              <ul className="loan-parameters__additional-list">
                <li className={`loan-parameters__additional-item ${hiddenCheckboxForMortgageClassName}`}>
                  <input className="loan-parameters__additional-item-checkbox visually-hidden" type="checkbox" id="maternal-discount" name="maternal-discount" checked={isMaternalDiscountChecked} onChange={handleMaternalDiscountChange}/>
                  <label className="loan-parameters__additional-item-label" htmlFor="maternal-discount">Использовать материнский капитал</label>
                </li>
                <li className={`loan-parameters__additional-item ${hiddenCheckboxForAutoClassName}`}>
                  <input className="loan-parameters__additional-item-checkbox visually-hidden" type="checkbox" id="casco-insurance" name="casco-insurance" checked={isCascoInsuranceChecked} onChange={handleCascoInsuranceChange}/>
                  <label className="loan-parameters__additional-item-label" htmlFor="casco-insurance">Оформить КАСКО в нашем банке</label>
                </li>
                <li className={`loan-parameters__additional-item ${hiddenCheckboxForAutoClassName}`}>
                  <input className="loan-parameters__additional-item-checkbox visually-hidden" type="checkbox" id="life-insurance" name="life-insurance" checked={isLifeInsuranceChecked} onChange={handleLifeInsuranceChange}/>
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
              <span className={hiddenErrorMessageClassName}>Все поля обязательны для заполнения</span>
              <label className="visually-hidden" htmlFor="name">Укажите ваше имя</label>
              <input className="application__field-name" type="text" id="name" name="name" placeholder="ФИО" minLength="1" ref={inputNameEl} autoFocus={true} value={userData.userName} onChange={setUserName} />
              <label className="visually-hidden" htmlFor="tel">Укажите ваш телефон</label>
              <InputMask
                mask="+7 (999) 999-99-99"
                className="application__field-tel"
                type="tel"
                id="tel"
                name="tel"
                placeholder="Телефон"
                value={userData.userTel}
                onChange={setUserTel}
              />
              <label className="visually-hidden" htmlFor="email">Укажите ваш адрес электронной почты</label>
              <input className="application__field-email" type="email" id="email" name="email" placeholder="E-mail" value={userData.userEmail} onChange={setUserEmail} />
            </div>
            <button type="submit" disabled className={ClassName.DISPLAY_NONE} aria-hidden="true"></button>
            <button className="application__submit-btn" type="submit">Отправить</button>
          </div>
        </div>
      </form>
    </section>
  );
};

Calculator.propTypes = {
  onSubmitBtnClick: PropTypes.func.isRequired,
  onApplicationFormSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmitBtnClick(payload) {
    dispatch(ActionCreator.setIsThanksPopupVisible(payload));
  },
  onApplicationFormSubmit(userData) {
    dispatch(sendApplication(userData));
  },
});

export {Calculator};
export default connect(null, mapDispatchToProps)(Calculator);
