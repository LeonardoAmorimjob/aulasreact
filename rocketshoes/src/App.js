import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './config/ReactotronConfig';
import Rotas from './rotas';
import EstiloGlobal from './estilos/global';
import Header from './componentes/header';
import store from './store';
import history from './services/history';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Rotas />
        <EstiloGlobal />
        <ToastContainer autoclose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
