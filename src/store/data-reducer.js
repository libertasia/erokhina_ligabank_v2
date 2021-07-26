import {ActionType} from './action';
// import {Rating, TabTypes} from '../const';

const initialState = {
  isThanksPopupVisible: false,
  // activeTab: TabTypes.CHARACTERISTICS,
  // reviews: [
  //   {
  //     name: `Борис Иванов`,
  //     pros: `мощность, внешний вид`,
  //     cons: `Слабые тормозные колодки (пришлось заменить)`,
  //     rating: Rating.THREE,
  //     comment: `Взяли по трейд-ин, на выгодных условиях у дилера. Стильная внешка и крут по базовым характеристикам. Не думал, что пересяду на китайский автопром, но сейчас гоняю и понимаю, что полностью доволен.`,
  //   },
  //   {
  //     name: `Марсель Исмагилов`,
  //     pros: `Cтиль, комфорт, управляемость`,
  //     cons: `Дорогой ремонт и обслуживание`,
  //     rating: Rating.THREE,
  //     comment: `Дизайн отличный, управление просто шикарно, ощущения за рулём такой машины особые. Но ремонт очень дорогой. Пару месяцев назад пришлось менять двигатель. По стоимости вышло как новый автомобиль. Так что, если покупать эту машину, надо быть готовым к большим расходам на обслуживание.`,
  //   },
  // ],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_IS_THANKS_POPUP_VISIBLE:
      return {
        ...state,
        isThanksPopupVisible: action.payload,
      };
    // case ActionType.SET_ACTIVE_TAB:
    //   return {
    //     ...state,
    //     activeTab: action.payload,
    //   };
    // case ActionType.ADD_REVIEW:
    //   return {
    //     ...state,
    //     reviews: [...state.reviews, action.payload],
    //   };
    // case ActionType.GET_REVIEWS:
    //   return {
    //     ...state,
    //     reviews: action.payload,
    //   };
  }

  return state;
};

export {dataReducer};
