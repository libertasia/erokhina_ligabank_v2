import {combineReducers} from 'redux';
import {dataReducer} from './data-reducer';

export const NameSpace = {
  DATA: `DATA`,
};

export default combineReducers({
  [NameSpace.DATA]: dataReducer,
});
