import './config/reactotron'

import React from 'react';

import { StatusBar } from 'react-native';

import Rotas from './rotas'

export default function App() {
  return (<>
    <StatusBar  barStyle="light-content" backgroundColor="#22c90c"/>
   <Rotas/>
   </>
  );
};


