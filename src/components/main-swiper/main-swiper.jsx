import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/swiper.scss';
SwiperCore.use([Autoplay, Pagination]);

const SLIDER_DELAY = 4000;

const MainSwiper = () => {
  return (
    <section className="main-swiper">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{clickable: false}}
        autoplay={{
          "delay": SLIDER_DELAY,
          "disableOnInteraction": false
        }}
      >
        <SwiperSlide className="main-swiper__slide main-swiper__slide--first">
          <div className="main-swiper__slide-info main-swiper__slide-info--first container">
            <h2>Лига Банк</h2>
            <p>Кредиты на любой случай</p>
            <button className="main-swiper__button main-swiper__button--loan" type="button">Рассчитать кредит</button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="main-swiper__slide main-swiper__slide--second">
          <div className="main-swiper__slide-info main-swiper__slide-info--second container">
            <h2>Лига Банк</h2>
            <p>Ваша уверенность в завтрашнем дне</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="main-swiper__slide main-swiper__slide--third">
          <div className="main-swiper__slide-info main-swiper__slide-info--third container">
            <h2>Лига Банк</h2>
            <p>Всегда рядом</p>
            <button className="main-swiper__button main-swiper__button--branches" type="button">Найти отделение</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default MainSwiper;
