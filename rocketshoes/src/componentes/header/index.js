import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { Container, Carrinho } from './estilo';

export default function Header() {
  const carrinho = useSelector((state) => state.carrinho.length);
  return (
    <Container>
      <Link
        style={{
          textDecoration: 'none',
          color: '#fff',
        }}
        to="/"
      >
        <img src="" alt="rocketshoes " />
      </Link>
      <Carrinho to="/carrinho">
        <div>
          <strong>Meu carrinho</strong>
          <span>{carrinho} itens</span>
          <MdShoppingBasket size={36} color="#fff" />
        </div>
      </Carrinho>
    </Container>
  );
}
