import { useRef, useState } from 'react';
import styles from './Mealform.module.css';
const Mealform = (props) => {
  const inputRef = useRef();
  const [error, setError] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      inputRef.current.value.length === 0 ||
      inputRef.current.value > 10 ||
      inputRef.current.value < 1
    ) {
      setError(true);
      return;
    }
    setError(false);
    props.formAdd(inputRef.current.value);
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <div>
          <label htmlFor={props.id} className={styles.label}>
            Количество
          </label>
          <input
            ref={inputRef}
            className={styles.input}
            id={props.id}
            type="number"
            step="1"
            defaultValue="1"
          />
        </div>
        <button type="submit" className={styles.add}>
          Добавить
        </button>
        {error && <p className={styles.error}>Неправильное значение</p>}
      </form>
    </>
  );
};

export default Mealform;
