import React, {useState} from 'react';
import {ClassName} from '../../const';

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
  if (loanType === LoanType.MORTGAGE) {
    loanSelectButtonText = `Ипотечное кредитование`;
  } else if (loanType === LoanType.AUTO) {
    loanSelectButtonText = `Автомобильное кредитование`;
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

          <div className={`calculator__second-step ${hiddenSecondStepClassName}`}>
            <h3 className="calculator__step-title">Шаг 2. Введите параметры кредита</h3>
          </div>

          <div className={`calculator__third-step ${hiddenThirdStepClassName}`}>
            <h3 className="calculator__step-title calculator__step-title--third">Шаг 3. Оформление заявки</h3>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Calculator;
