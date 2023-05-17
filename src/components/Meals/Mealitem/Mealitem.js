import { useContext } from 'react';
import CartContext from '../../store/CartContext';
import Mealform from './Mealform';
import styles from './Mealitem.module.css';
const Mealitem = (props) => {
  const context = useContext(CartContext);

  const addItemHandler = (amount) => {
    context.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: Number(amount),
    });
  };
  return (
    <div className={styles.meal}>
      <div>
        <div className={styles.name}>
          <h3>{props.name}</h3>
        </div>

        <div className={styles.description}>
          <p>{props.description}</p>
        </div>

        <div className={styles.price}>
          <h3>${props.price}</h3>
        </div>
      </div>

      <div>
        <Mealform id={props.id} formAdd={addItemHandler} />
      </div>
    </div>
  );
};
export default Mealitem;
