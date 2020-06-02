export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}
export function addToCartsucesso(produto) {
  return {
    type: '@cart/ADD_SUCESSO',
    produto,
  };
}

export function removefromCart(id) {
  return { type: '@cart/REMOVE', id };
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  };
}
export function updateAmountSucesso(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCESSO',
    id,
    amount,
  };
}
