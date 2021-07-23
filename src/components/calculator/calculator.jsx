import React, {useState} from 'react';
import {ClassName} from '../../const';
import sprite from '../../img/sprite.svg';

const LoanType = {
  NONE: `none`,
  MORTGAGE: `mortgage`,
  AUTO: `auto`,
};

const Calculator = () => {
  const [loanType, setLoanType] = useState(LoanType.NONE);
  const [isSelectListShowed, setIsSelectListShowed] = useState(false);
  const [isSecondStepShowed, setIsSecondStepShowed] = useState(false);
  const [isThirdStepShowed, setIsThirdStepShowed] = useState(false);

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

  if (loanType === LoanType.MORTGAGE) {
    loanSelectButtonText = `Ипотечное кредитование`;
    loanParametersLabelText = `Стоимость недвижимости`;
    purchaseValueText = `От 1 200 000  до 25 000 000 рублей`;
    hiddenCheckboxForMortgageClassName = ClassName.DISPLAY_BLOCK;
    hiddenCheckboxForAutoClassName = ClassName.DISPLAY_NONE;
    offerDescriptionText = `Сумма ипотеки`;
    loanTooSmallText = `Наш банк не выдаёт ипотечные кредиты меньше 500 000 рублей.`;
  } else if (loanType === LoanType.AUTO) {
    loanSelectButtonText = `Автомобильное кредитование`;
    loanParametersLabelText = `Стоимость автомобиля`;
    purchaseValueText = `От 500 000  до 5 000 000 рублей`;
    hiddenCheckboxForMortgageClassName = ClassName.DISPLAY_NONE;
    hiddenCheckboxForAutoClassName = ClassName.DISPLAY_BLOCK;
    offerDescriptionText = `Сумма автокредита`;
    loanTooSmallText = `Наш банк не выдаёт автокредиты меньше 200 000 рублей.`;
  }

  const handleLoanPurposeBtnClick = (evt) => {
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
  };

  const handleOfferBtnClick = () => {
    setIsThirdStepShowed(true);
  };

  const handleSubmitBtnClick = (evt) => {
    evt.preventDefault();
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
                <input className="loan-parameters__input" id="purchase-value" name="purchase-value" defaultValue="2 000 000 рублей" />
                <button className="loan-parameters__purchase-value-btn loan-parameters__purchase-value-btn--minus" type="button" aria-label="Уменьшить стоимость">
                  <svg className="loan-parameters__purchase-value-btn-icon" width={16} height={2}>
                    <use href={sprite + `#icon-minus`} />
                  </svg>
                </button>
                <button className="loan-parameters__purchase-value-btn loan-parameters__purchase-value-btn--plus" type="button" aria-label="Увеличить стоимость">
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
            </div>

            <div className="loan-parameters__item">
              <label className="loan-parameters__label" htmlFor="loan-duration">Срок кредитования</label>
              <input className="loan-parameters__input" id="loan-duration" name="loan-duration" defaultValue="5 лет" />
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
                <p className="application__list-item-value">Ипотека</p>
              </li>
              <li className="application__list-item">
                <p className="application__list-item-title">Стоимость недвижимости</p>
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
              <input className="application__field-name" type="text" id="name" name="name" placeholder="ФИО"/>
              <label className="visually-hidden" htmlFor="tel">Укажите ваш телефон</label>
              <input className="application__field-tel" type="tel" id="tel" name="tel" placeholder="Телефон"/>
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

export default Calculator;
