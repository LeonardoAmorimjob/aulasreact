import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { ListadeProdutos } from './estilo';
import { precoformatado } from '../../util/format';
import api from '../../services/api';

import * as cartActions from '../../store/modules/carrinho/actions';

export default function Principal() {
  const [produtos, setProdutos] = useState([]);
  const amount = useSelector((state) =>
    state.carrinho.reduce((sumAmount, produto) => {
    sumAmount[produto.id] = produto.amount;
    return sumAmount;
  }, {})
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function carregarProduto() {
      const res = await api.get('products');
      const data = res.data.map((produto) => ({
        ...produto,
        precoFormatado: precoformatado(produto.price),
      }));

      setProdutos(data);
    }

    carregarProduto();
  }, []);

  function addProduto(id) {
    dispatch(cartActions.addToCartRequest(id));
  }

  return (
    <ListadeProdutos>
      {produtos.map((produto) => (
        <li key={produto.id}>
          <img src={produto.image} alt={produto.title} />
          <strong>{produto.titulo}</strong>
          <span>{produto.precoFormatado}</span>
          <button type="button" onClick={() => addProduto(produto.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />
              {amount[produto.id] || 0}
            </div>
            <span>add ao carrinho</span>
          </button>
        </li>
      ))}
    </ListadeProdutos>
  );
}
