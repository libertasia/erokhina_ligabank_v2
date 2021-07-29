import {ActionType} from './action';
import {TabTypes} from '../const';

const initialState = {
  isThanksPopupVisible: false,
  activeTab: TabTypes.DEPOSITS,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_IS_THANKS_POPUP_VISIBLE:
      return {
        ...state,
        isThanksPopupVisible: action.payload,
      };
    case ActionType.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
  }

  return state;
};

export {dataReducer};
