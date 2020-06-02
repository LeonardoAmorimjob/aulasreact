import { all } from 'redux-saga/effects';

import cart from './carrinho/sagas';

export default function* rootSaga() {
  return yield all([cart]);
}
