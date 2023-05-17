import { useReducer } from 'react';
import CartContext from './CartContext';

function reducer(prevState, action) {
  let updatedCart = [...prevState.cart];
  switch (action.type) {
    case 'ADD_TO_CART': {
      console.log(action.value);
      const index = prevState.cart.findIndex(
        (value) => value.id === action.value.id
      );
      console.log(index);
      const updatedTotal =
        prevState.totalAmount + action.value.amount * action.value.price;
      if (index !== -1) {
        const updatedItem = {
          ...updatedCart[index],
          amount: updatedCart[index].amount + action.value.amount,
        };

        updatedCart[index] = updatedItem;
      } else {
        updatedCart.push({ ...action.value });
      }
      return {
        totalAmount: Number(updatedTotal.toFixed(2)),
        cart: updatedCart,
        orderFinished: false,
      };
    }

    case 'REMOVE_ITEM': {
      const index = prevState.cart.findIndex(
        (value) => value.id === action.value
      );
      const updatedTotal = prevState.totalAmount - 1 * updatedCart[index].price;

      if (updatedCart[index].amount !== 1) {
        const updatedItem = {
          ...updatedCart[index],
          amount: updatedCart[index].amount - 1,
        };

        updatedCart[index] = updatedItem;
      } else {
        updatedCart = updatedCart.filter((value) => value.id !== action.value);
      }
      return {
        totalAmount: Number(updatedTotal.toFixed(2)),
        cart: updatedCart,
        orderFinished: false,
      };
    }
    case 'RESET_AND_FINISH': {
      return { totalAmount: 0, cart: [], orderFinished: true };
    }
    case 'RESET': {
      return { totalAmount: 0, cart: [], orderFinished: false };
    }
    default:
      return { totalAmount: 0, cart: [], orderFinished: false };
  }
}

const CartContextProvider = (props) => {
  const [store, dispatch] = useReducer(reducer, {
    totalAmount: 0,
    cart: [],
    orderFinished: false,
  });

  const addItem = (item) => {
    dispatch({ type: 'ADD_TO_CART', value: item });
  };
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', value: id });
  };
  const resetAndFinishCart = () => {
    dispatch({ type: 'RESET_AND_FINISH' });
  };
  const resetCart = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <CartContext.Provider
      value={{
        totalAmount: store.totalAmount,
        cart: store.cart,
        orderFinished: store.orderFinished,
        addItem,
        removeItem,
        resetAndFinishCart,
        resetCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
