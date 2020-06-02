import {
 call, select, put, all, takeLatest
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { precoformatado } from '../../../util/format';
import { addToCartsucesso, updateAmountSucesso } from './actions';

function* addToCart({ id }) {
  const produtoExist = yield select((state) => state.carrinho.find((p) => p.id === id),
  );
  const estoque = yield call(api.get, `/stock/${id}`);
  const estoqueQtd = estoque.data.amount;
  const estoqueAtual = produtoExist ? produtoExist.amount : 0;
  const amount = estoqueAtual + 1;
  if (amount > estoqueQtd) {
    toast.error('estoque insuficiente');
    return;
  }
  if (produtoExist) {
    yield put(updateAmountSucesso(id, amount));
  } else {
    const res = yield call(api.get, `/products/${id}`);
    const data = {
      ...res.data,
      amount: 1,
      precoFormatado: precoformatado(res.data.price),
    };
    yield put(addToCartsucesso(data));
    history.push('/carrinho');
  }
}
function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const estoque = yield call(api.get, `stock/${id}`);
  const estoqueQtd = estoque.data.amount;
  if (amount > estoqueQtd) {
    toast.error('estoque insuficiente');
    return;
  }
  yield put(updateAmountSucesso(id, amount));
}
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
