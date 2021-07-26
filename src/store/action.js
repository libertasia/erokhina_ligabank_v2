export const ActionType = {
  SET_IS_THANKS_POPUP_VISIBLE: `data/setIsThanksPopupVisible`,
  // SET_ACTIVE_TAB: `view/setActiveTab`,
  // ADD_REVIEW: `view/addReview`,
  // GET_REVIEWS: `view/getReviews`,
};

export const ActionCreator = {
  setIsThanksPopupVisible: (isVisible) => ({
    type: ActionType.SET_IS_THANKS_POPUP_VISIBLE,
    payload: isVisible,
  }),
  // setActiveTab: (activeTab) => ({
  //   type: ActionType.SET_ACTIVE_TAB,
  //   payload: activeTab,
  // }),
  // addReview: (review) => ({
  //   type: ActionType.ADD_REVIEW,
  //   payload: review,
  // }),
  // getReviews: (reviews) => ({
  //   type: ActionType.GET_REVIEWS,
  //   payload: reviews,
  // }),
};
