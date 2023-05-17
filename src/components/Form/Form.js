import { useContext } from 'react';
import CartContext from '../store/CartContext';
import Modal from '../UI/Modal';
import useInput from '../hooks/useInput';
import styles from './Form.module.css';
const Form = (props) => {
  const context = useContext(CartContext);
  const {
    value: name,
    formValid: nameValid,
    inputClasses: nameClass,
    changeHandler: nameOnChange,
    blurHandler: nameOnBlur,
    resetHandler: resetName,
  } = useInput((name) => name.trim().length !== 0);

  const {
    value: address,
    formValid: addressValid,
    inputClasses: addressClass,
    changeHandler: addressOnChange,
    blurHandler: addressOnBlur,
    resetHandler: resetAddress,
  } = useInput((address) => address.trim().length !== 0);

  const {
    value: number,
    formValid: numberValid,
    inputClasses: numberClass,
    changeHandler: numberOnChange,
    blurHandler: numberOnBlur,
    resetHandler: resetNumber,
  } = useInput(
    (number) =>
      (number.startsWith('+7') && number.trim().length === 12) ||
      (number.startsWith('8') && number.trim().length === 11) ||
      number.trim().length === 10
  );

  let formValid = false;
  if (nameValid && addressValid && numberValid) {
    formValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const order = {
      name,
      address,
      number,
      cart: context.cart,
      total: context.totalAmount,
    };
    fetch(
      'https://react-practicing-776b5-default-rtdb.firebaseio.com/Order.json',
      {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-type': 'application/json' },
      }
    );
    resetAddress();
    resetName();
    resetNumber();
    context.resetAndFinishCart();
    props.closeModal();
  };

  return (
    <Modal>
      <form className={styles.all} onSubmit={submitHandler}>
        <div className={styles.form}>
          <div className={nameClass}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={nameOnChange}
              onBlur={nameOnBlur}
            />
          </div>
          <div className={addressClass}>
            <label htmlFor="address">Адрес</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={addressOnChange}
              onBlur={addressOnBlur}
            />
          </div>
          <div className={numberClass}>
            <label htmlFor="number">Телефон</label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={numberOnChange}
              onBlur={numberOnBlur}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.back} onClick={props.switchModals}>
            Закрыть
          </button>

          <button className={styles.order} type="submit" disabled={!formValid}>
            Заказать
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
