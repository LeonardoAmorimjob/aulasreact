import produce from 'immer';

export default function carrinho(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCESSO':
      return produce(state, (draft) => {
        const { produto } = action;
        draft.push(produto);
      });
    case '@cart/REMOVE':
      return produce(state, (draft) => {
        const produtoIndice = draft.findIndex((prod) => prod.id === action.id);
        if (produtoIndice >= 0) {
          draft.splice(produtoIndice, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCESSO': {
      return produce(state, (draft) => {
        const produtoIndice = draft.findIndex((prod) => prod.id === action.id);
        if (produtoIndice >= 0) {
          draft[produtoIndice].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
