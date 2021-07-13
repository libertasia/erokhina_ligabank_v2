import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import MainScreen from '../main-screen/main-screen';
import '../../scss/style.scss';

const App = () => {
  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <MainScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
};

export default App;
