import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Principal from './paginas/Principal';
import Carrinho from './paginas/Carrinho';

export default function Rotas() {
  return (
    <Switch>
      <Route path="/" exact component={Principal} />
      <Route path="/carrinho" exact component={Carrinho} />
    </Switch>
  );
}
