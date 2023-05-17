import { createContext } from 'react';

const CartContext = createContext({
  totalAmount: 0,
  cart: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  resetCart: () => {},
  orderFinished: false,
});

export default CartContext;
