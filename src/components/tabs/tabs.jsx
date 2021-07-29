import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TabTypes} from '../../const';
import {getActiveTab} from '../../store/selectors';
import {ActionCreator} from '../../store/action';

const TabDetails = [
  {
    type: TabTypes.DEPOSITS,
    title: `Вклады`
  },
  {
    type: TabTypes.LOANS,
    title: `Кредиты`
  },
  {
    type: TabTypes.INSURANCE,
    title: `Страхование`
  },
  {
    type: TabTypes.ONLINE_SERVICES,
    title: `Онлайн-сервисы`
  },
];

const TabDescriptionData = {
  DEPOSITS: {
    title: `Вклады Лига Банка – это выгодная инвестиция в свое будущее`,
    details: [
      `Проценты по вкладам до 7%`,
      `Разнообразные условия`,
      `Возможность ежемесячной капитализации или вывод процентов на банковскую карту`
    ],
    hasButton: true,
  },
  LOANS: {
    title: `Лига Банк выдает кредиты под любые цели`,
    details: [
      `Ипотечный кредит`,
      `Автокредит`,
      `Потребительский кредит`
    ],
    hasButton: false,
  },
  INSURANCE: {
    title: `Лига Страхование — застрахуем все что захотите`,
    details: [
      `Автомобильное страхование`,
      `Страхование жизни и здоровья`,
      `Страхование недвижимости`
    ],
    hasButton: true,
  },
  ONLINE_SERVICES: {
    title: `Лига Банк — это огромное количество онлайн-сервисов для вашего удобства`,
    details: [
      `Мобильный банк, который всегда под рукой`,
      `Приложение Лига-проездной позволит вам оплачивать билеты по всему миру`,
    ],
    hasButton: true,
  },
};

const getButtonTemplate = (hasButton) => {
  if (hasButton) {
    return (
      <button className="tab__description-btn" type="button">Узнать подробнее</button>
    );
  } else {
    return (<p className="tab__description-text">Рассчитайте ежемесячный платеж<br /> и ставку по кредиту воспользовавшись<br /> нашим <a href="">кредитным калькулятором</a></p>);
  }
};

const Tabs = (props) => {
  const {activeTab, setActiveTab} = props;

  let tabContent = null;

  const handleTabClick = (evt) => {
    evt.preventDefault();
    setActiveTab(evt.currentTarget.dataset.id);
  };

  switch (activeTab) {
    case TabTypes.DEPOSITS:
      tabContent = (
        <div className="tab__description tab__description--deposits">
          <p>{TabDescriptionData.DEPOSITS.title}</p>
          <ul className="tab__description-list">
            {TabDescriptionData.DEPOSITS.details.map(
                (detail, index) => (
                  <li key={`detail-${index}`} className="tab__description-list-item">
                    <p>{detail}</p>
                  </li>
                ))
            }
          </ul>
          {getButtonTemplate(TabDescriptionData.DEPOSITS.hasButton)}
        </div>
      );
      break;
    case TabTypes.LOANS:
      tabContent = (
        <div className="tab__description tab__description--deposits">
          <p>{TabDescriptionData.LOANS.title}</p>
          <ul className="tab__description-list">
            {TabDescriptionData.LOANS.details.map(
                (detail, index) => (
                  <li key={`detail-${index}`} className="tab__description-list-item">
                    <p>{detail}</p>
                  </li>
                ))
            }
          </ul>
          {getButtonTemplate(TabDescriptionData.LOANS.hasButton)}
        </div>
      );
      break;
    case TabTypes.INSURANCE:
      tabContent = (
        <div className="tab__description tab__description--deposits">
          <p>{TabDescriptionData.INSURANCE.title}</p>
          <ul className="tab__description-list">
            {TabDescriptionData.INSURANCE.details.map(
                (detail, index) => (
                  <li key={`detail-${index}`} className="tab__description-list-item">
                    <p>{detail}</p>
                  </li>
                ))
            }
          </ul>
          {getButtonTemplate(TabDescriptionData.INSURANCE.hasButton)}
        </div>
      );
      break;
    case TabTypes.ONLINE_SERVICES:
      tabContent = (
        <div className="tab__description tab__description--deposits">
          <p>{TabDescriptionData.ONLINE_SERVICES.title}</p>
          <ul className="tab__description-list">
            {TabDescriptionData.ONLINE_SERVICES.details.map(
                (detail, index) => (
                  <li key={`detail-${index}`} className="tab__description-list-item">
                    <p>{detail}</p>
                  </li>
                ))
            }
          </ul>
          {getButtonTemplate(TabDescriptionData.ONLINE_SERVICES.hasButton)}
        </div>
      );
      break;
  }

  return (
    <section className="tabs">
      <h2 className="visually-hidden">Услуги</h2>
      <div className="tabs__desktop container">
        <ul className="tabs__list">
          {
            TabDetails.map((tab) =>
              (
                <li key={tab.type} data-id={tab.type} onClick={handleTabClick} className={`tab__item ${tab.type === activeTab ? `tab__item--active` : ``}`}>
                  <a href="#" className={`tab__link ${tab.type === activeTab ? `tab__link--active` : ``}`}>{tab.title}</a>
                </li>
              ))
          }
        </ul>
        {tabContent}
      </div>
      <div className="tabs__swiper">

      </div>
    </section>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func,
};

const mapStateToProps = (state) => ({
  activeTab: getActiveTab(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveTab(tabId) {
    dispatch(ActionCreator.setActiveTab(tabId));
  },
});

export {Tabs};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

