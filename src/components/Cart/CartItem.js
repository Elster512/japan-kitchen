import styles from './CartItem.module.css';

const CartItem = (props) => {
  const total = `$${(props.price * props.amount).toFixed(2)}`;
  return (
    <div className={styles.item}>
      <div className={styles.description}>
        <div className={styles.name}>
          <h3>{props.name}</h3>
        </div>
        <div className={styles.ldesc}>
          <h4 className={styles.price}>{total}</h4>
          <div className={styles.amount}>
            <p>x {props.amount}</p>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onRemove}>
          −
        </button>
        <button className={styles.button} onClick={props.onAdd}>
          +
        </button>
      </div>
    </div>
  );
};
export default CartItem;
