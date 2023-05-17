import { useContext, useEffect, useState } from 'react';
import CartContext from '../store/CartContext';
import CartIcon from './CartIcon';
import styles from './HeaderButton.module.css';
const HeaderButton = (props) => {
  const context = useContext(CartContext);
  const totalAmount = context.cart.reduce(
    (sum, value) => (sum = sum + value.amount),
    0
  );
  const [buttonBounce, setButtonBounce] = useState(false);
  useEffect(() => {
    if (context.cart.length === 0) {
      return;
    }
    setButtonBounce(true);
    const bounce = setTimeout(() => {
      setButtonBounce(false);
    }, 300);
    return () => {
      clearTimeout(bounce);
    };
  }, [context.cart]);

  return (
    <button
      className={styles.cart + ` ${buttonBounce ? styles.bump : ''}`}
      onClick={props.onClickHanler}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.cartName}>Корзина</span>
      <span className={styles.badge}>{totalAmount}</span>
    </button>
  );
};

export default HeaderButton;
