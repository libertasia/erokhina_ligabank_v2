import {APIRoute} from "../const";

export const login = ({username, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.ROOT, {username, password})
);

export const sendApplication = ({name, phone, email}) => (dispatch, _getState, api) => (
  api.post(APIRoute.ROOT, {name, phone, email})
);
