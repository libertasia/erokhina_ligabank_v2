export const login = ({username, password}) => (dispatch, _getState, api) => (
  api.post(`/`, {username, password})
);
