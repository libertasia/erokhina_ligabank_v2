import {NameSpace} from './root-reducer';

export const getIsThanksPopupVisibleStatus = (state) => state[NameSpace.DATA].isThanksPopupVisible;
export const getActiveTab = (state) => state[NameSpace.DATA].activeTab;
