import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TabTypes, AppRoute} from '../../const';
import {getActiveTab} from '../../store/selectors';
import {ActionCreator} from '../../store/action';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination} from 'swiper';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/swiper.scss';
SwiperCore.use([Pagination]);

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

const Tabs = (props) => {
  const {activeTab, setActiveTab, onLoanLinkClick} = props;

  const handleLoanLinkClick = (evt) => {
    evt.preventDefault();
    onLoanLinkClick();
  };

  let tabContent = null;

  const handleTabClick = (evt) => {
    evt.preventDefault();
    setActiveTab(evt.currentTarget.dataset.id);
  };

  const getButtonTemplate = (hasButton) => {
    if (hasButton) {
      return (
        <Link className="tabs__description-btn" to={AppRoute.SERVICES}>Узнать подробнее</Link>
      );
    } else {
      return (<p className="tabs__description-text">Рассчитайте ежемесячный платеж<br /> и ставку по кредиту воспользовавшись<br /> нашим <a href="" onClick={handleLoanLinkClick}>кредитным калькулятором</a></p>);
    }
  };

  const tabContentDeposits = (
    <div className="tabs__description tabs__description--deposits">
      <p>{TabDescriptionData.DEPOSITS.title}</p>
      <ul className="tabs__description-list">
        {TabDescriptionData.DEPOSITS.details.map(
            (detail, index) => (
              <li key={`detail-${index}`} className="tabs__description-list-item">
                <p>{detail}</p>
              </li>
            ))
        }
      </ul>
      {getButtonTemplate(TabDescriptionData.DEPOSITS.hasButton)}
    </div>
  );

  const tabContentLoans = (
    <div className="tabs__description tabs__description--deposits">
      <p>{TabDescriptionData.LOANS.title}</p>
      <ul className="tabs__description-list">
        {TabDescriptionData.LOANS.details.map(
            (detail, index) => (
              <li key={`detail-${index}`} className="tabs__description-list-item">
                <p>{detail}</p>
              </li>
            ))
        }
      </ul>
      {getButtonTemplate(TabDescriptionData.LOANS.hasButton)}
    </div>
  );

  const tabContentInsurance = (
    <div className="tabs__description tabs__description--deposits">
      <p>{TabDescriptionData.INSURANCE.title}</p>
      <ul className="tabs__description-list">
        {TabDescriptionData.INSURANCE.details.map(
            (detail, index) => (
              <li key={`detail-${index}`} className="tabs__description-list-item">
                <p>{detail}</p>
              </li>
            ))
        }
      </ul>
      {getButtonTemplate(TabDescriptionData.INSURANCE.hasButton)}
    </div>
  );

  const tabContentOnlineServices = (
    <div className="tabs__description tabs__description--deposits">
      <p>{TabDescriptionData.ONLINE_SERVICES.title}</p>
      <ul className="tabs__description-list">
        {TabDescriptionData.ONLINE_SERVICES.details.map(
            (detail, index) => (
              <li key={`detail-${index}`} className="tabs__description-list-item">
                <p>{detail}</p>
              </li>
            ))
        }
      </ul>
      {getButtonTemplate(TabDescriptionData.ONLINE_SERVICES.hasButton)}
    </div>
  );

  switch (activeTab) {
    case TabTypes.DEPOSITS:
      tabContent = tabContentDeposits;
      break;
    case TabTypes.LOANS:
      tabContent = tabContentLoans;
      break;
    case TabTypes.INSURANCE:
      tabContent = tabContentInsurance;
      break;
    case TabTypes.ONLINE_SERVICES:
      tabContent = tabContentOnlineServices;
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
                <li key={tab.type} data-id={tab.type} onClick={handleTabClick} className={`tabs__list-item ${tab.type === activeTab ? `tabs__list-item--active` : ``}`}>
                  <a href="#">{tab.title}</a>
                </li>
              ))
          }
        </ul>
        {tabContent}
      </div>
      <div className="tabs__swiper display-none">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={
            {clickable: false, bulletClass: `main-swiper__bullet`, bulletActiveClass: `main-swiper__bullet-active`}
          }
        >
          <SwiperSlide>
            <div className="container">
              {tabContentDeposits}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="container">
              {tabContentLoans}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="container">
              {tabContentInsurance}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="container">
              {tabContentOnlineServices}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func,
  onLoanLinkClick: PropTypes.func.isRequired,
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

