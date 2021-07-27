export const login = ({username, password}) => (dispatch, _getState, api) => (
  api.post(`/`, {username, password})
);

export const sendApplication = ({name, phone, email}) => (dispatch, _getState, api) => (
  api.post(`/`, {name, phone, email})
);
