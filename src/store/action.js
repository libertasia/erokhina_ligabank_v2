export const ActionType = {
  SET_IS_THANKS_POPUP_VISIBLE: `data/setIsThanksPopupVisible`,
  SET_ACTIVE_TAB: `data/setActiveTab`,
};

export const ActionCreator = {
  setIsThanksPopupVisible: (isVisible) => ({
    type: ActionType.SET_IS_THANKS_POPUP_VISIBLE,
    payload: isVisible,
  }),
  setActiveTab: (activeTab) => ({
    type: ActionType.SET_ACTIVE_TAB,
    payload: activeTab,
  }),
};
