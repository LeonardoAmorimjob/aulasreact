import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import * as CartActions from '../../store/modules/carrinho/actions';
import { Container, TabeladeProdutos, Total } from './estilo';
import { precoformatado } from '../../util/format';

export default function Carrinho() {
  const total = useSelector((state) =>
    precoformatado(
    state.carrinho.reduce(
      (totalSum, produto) => totalSum + produto.price * produto.amount,
      0
    )
  )
  );
  const carrinho = useSelector((state) =>
    state.carrinho.map((produto) => ({
    ...produto,
    subTotal: precoformatado(produto.price * produto.amount),
  }))
  );
  const dispatch = useDispatch();
  function increment(produto) {
    dispatch(CartActions.updateAmountRequest(produto.id, produto.amount + 1));
  }
  function decrement(produto) {
    dispatch(CartActions.updateAmountRequest(produto.id, produto.amount - 1));
  }
  return (
    <Container>
      <TabeladeProdutos>
        <thead>
          <tr>
            <th />
            <th>produto</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {carrinho.map((produto) => (
            <tr>
              <td>
                <img src={produto.image} alt={produto.title} />
              </td>
              <td>
                <strong>{produto.title}</strong>
                <span>{produto.precoFormatado}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(produto)}>
                    <MdRemoveCircleOutline size={20} color="#22c90c" />
                  </button>
                  <input type="number" value={produto.amount} />
                  <button type="button" onClick={() => increment(produto)}>
                    <MdAddCircleOutline size={20} color="#22c90c" />
                  </button>
                </div>
              </td>

              <td>
                <strong>{produto.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(CartActions.removefromCart(produto.id))
                  }
                >
                  <MdDelete size={20} color="#22c90c" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TabeladeProdutos>
      <footer>
        <button type="button">Finalizar Pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
