import { useReducer } from 'react';
import styles from '../Form/Form.module.css';
const initialState = { value: '', wasTouched: false };

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'INPUT': {
      return { ...prevState, value: action.value };
    }
    case 'TOUCHED': {
      return { ...prevState, wasTouched: true };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return initialState;
  }
};
const useInput = (validation) => {
  const [valueState, dispatcher] = useReducer(reducer, initialState);
  const formValid = validation(valueState.value);
  const validAndTouched = !formValid && valueState.wasTouched;
  const inputClasses = validAndTouched
    ? styles.input + ' ' + styles.error
    : styles.input;
  const changeHandler = (event) => {
    dispatcher({ type: 'INPUT', value: event.target.value });
  };
  const blurHandler = (event) => {
    dispatcher({ type: 'TOUCHED' });
  };

  const resetHandler = (event) => {
    dispatcher({ type: 'RESET' });
  };
  return {
    value: valueState.value,
    formValid,
    inputClasses,
    changeHandler,
    blurHandler,
    resetHandler,
  };
};

export default useInput;
