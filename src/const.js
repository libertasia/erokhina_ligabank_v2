const ESC_KEY_CODE = 27;

const ENTER_KEY_CODE = 13;

const DEFAULT_LOCALE = `ru`;

const RADIX = 10;

const MULTIPLIER = 100;

const AppRoute = {
  ROOT: `/`,
  CONVERTER: `/converter`,
  SERVICES: `/services`,
  LOAN: `/loan`,
  CONTACTS: `/contacts`,
  QUESTION: `/question`,
};

const APIRoute = {
  ROOT: `/`,
};

const ClassName = {
  DISPLAY_BLOCK: `display-block`,
  DISPLAY_NONE: `display-none`,
  VISUALLY_HIDDEN: `visually-hidden`,
};

const TabTypes = {
  DEPOSITS: `deposits`,
  LOANS: `loans`,
  INSURANCE: `insurance`,
  ONLINE_SERVICES: `onlineServices`,
};

const Event = {
  WHEEL: `wheel`,
  KEY_DOWN: `keydown`,
};

const YearsString = {
  TYPE1: `год`,
  TYPE2: `года`,
  TYPE3: `лет`,
};

const YearsNumber = {
  FOUR: 4,
  ONE: 1,
  TWENTY_FOUR: 24,
  TWENTY_ONE: 21,
  TWENTY_TWO: 22,
  TWO: 2,
};

export {AppRoute, APIRoute, ClassName, ESC_KEY_CODE, ENTER_KEY_CODE, DEFAULT_LOCALE, RADIX, MULTIPLIER, TabTypes, Event, YearsNumber, YearsString};
