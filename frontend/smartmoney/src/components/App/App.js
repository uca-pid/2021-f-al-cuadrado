import React from 'react';
import { Route, Switch } from "react-router-dom";
import Landing from '../landing';
import Home from '../home';

const App = () => {

  return (
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        {/* #TODO: Validar que el usuario haya iniciado sesion*/}
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
  );
};

export default App;