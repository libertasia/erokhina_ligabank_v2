import React from 'react';
import PropTypes from 'prop-types';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/swiper.scss';
SwiperCore.use([Autoplay, Pagination]);

const SLIDER_DELAY = 4000;

const MainSwiper = (props) => {
  const {onLoanBtnClick, onBranchesBtnClick} = props;

  const handleLoanBtnClick = () => {
    onLoanBtnClick();
  };

  const handleBranchesBtnClick = () => {
    onBranchesBtnClick();
  };

  return (
    <section className="main-swiper">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={
          {clickable: false, bulletClass: `main-swiper__bullet`, bulletActiveClass: `main-swiper__bullet-active`}
        }
        autoplay={{
          "delay": SLIDER_DELAY,
          "disableOnInteraction": false
        }}
      >
        <SwiperSlide className="main-swiper__slide main-swiper__slide--first">
          <div className="main-swiper__slide-info main-swiper__slide-info--first container">
            <h2>Лига Банк</h2>
            <p>Кредиты на любой случай</p>
            <button className="main-swiper__button main-swiper__button--loan" type="button" onClick={handleLoanBtnClick}>Рассчитать кредит</button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="main-swiper__slide main-swiper__slide--second">
          <div className="main-swiper__slide-info main-swiper__slide-info--second container">
            <h2>Лига Банк</h2>
            <p>Ваша уверенность<br /> в завтрашнем дне</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="main-swiper__slide main-swiper__slide--third">
          <div className="main-swiper__slide-info main-swiper__slide-info--third container">
            <h2>Лига Банк</h2>
            <p>Всегда рядом</p>
            <button className="main-swiper__button main-swiper__button--branches" type="button" onClick={handleBranchesBtnClick}>Найти отделение</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

MainSwiper.propTypes = {
  onLoanBtnClick: PropTypes.func.isRequired,
  onBranchesBtnClick: PropTypes.func.isRequired,
};

export default MainSwiper;
