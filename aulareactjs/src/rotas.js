import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Principal from './paginas/principal/index';
import Repositorio from './paginas/repositorio/index';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Principal} />
        <Route path="/repositorio/:repositorio" component={Repositorio} />
      </Switch>
    </BrowserRouter>
  );
}
