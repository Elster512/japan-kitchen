import { useContext } from 'react';
import styles from './CartItems.module.css';
import CartContext from '../store/CartContext';
import CartItem from './CartItem';

const CartItems = () => {
  const context = useContext(CartContext);

  const onAddHandler = (value) => {
    context.addItem({
      id: value.id,
      name: value.name,
      price: value.price,
      amount: 1,
    });
  };
  const onRemoveHandler = (id) => {
    context.removeItem(id);
  };
  const meals = context.cart.map((value) => (
    <CartItem
      key={value.id}
      {...value}
      onAdd={onAddHandler.bind(null, value)}
      onRemove={onRemoveHandler.bind(null, value.id)}
    />
  ));
  return (
    <div className={styles.cartItems}>
      {meals.length !== 0 && <ul>{meals}</ul>}
    </div>
  );
};

export default CartItems;
