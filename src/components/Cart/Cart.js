import { useContext } from 'react';
import styles from './Cart.module.css';
import CartContext from '../store/CartContext';
import CartItems from './CartItems';
import Modal from '../UI/Modal';

const Cart = (props) => {
  const context = useContext(CartContext);
  const total = context.totalAmount.toFixed(2);
  return (
    <Modal closeModal={props.closeModalHandler}>
      {context.cart.length !== 0 && <CartItems />}
      <div className={styles.all}>
        <div className={styles.total}>
          <h2>Итого</h2>
          <h2>${total}</h2>
        </div>
        <div className={styles.actions}>
          <button className={styles.back} onClick={props.closeModalHandler}>
            Закрыть
          </button>

          {context.cart.length !== 0 && (
            <button className={styles.next} onClick={props.switchModals}>
              Продолжить
            </button>
          )}
          {context.cart.length !== 0 && (
            <button className={styles.next} onClick={context.resetCart}>
              Очистить корзину
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
