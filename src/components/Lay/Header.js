import { useContext, useEffect, useState } from 'react';
import Success from '../UI/Success';
import styles from './Header.module.css';
import Cart from '../Cart/Cart';
import asset from '../../assets/sushi.jpg';
import HeaderButton from './HeaderButton';
import Backdrop from '../UI/Backdrop';
import Form from '../Form/Form';
import CartContext from '../store/CartContext';

const Header = () => {
  const context = useContext(CartContext);
  const [finished, setFinished] = useState(false);
  const [firstdModal, setFirstModal] = useState(false);
  const [SecondModal, setSecondModal] = useState(false);
  const toggleModalHandler = () => {
    setFirstModal((prevState) => {
      return !prevState;
    });
  };
  const switchModalsHandler = () => {
    setFirstModal((prevState) => {
      return !prevState;
    });
    setSecondModal((prevState) => {
      return !prevState;
    });
  };
  const resetModalsHandler = () => {
    setFirstModal(false);
    setSecondModal(false);
  };

  useEffect(() => {
    console.log(context.orderFinished);
    if (context.orderFinished === false) {
      return;
    }
    setFinished(true);
    const timer = setTimeout(() => {
      setFinished(false);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [context.orderFinished]);

  return (
    <>
      {(firstdModal || SecondModal) && (
        <Backdrop closeModal={resetModalsHandler} />
      )}
      {firstdModal && !SecondModal && (
        <Cart
          closeModalHandler={toggleModalHandler}
          switchModals={switchModalsHandler}
        />
      )}
      {!firstdModal && SecondModal && (
        <Form
          switchModals={switchModalsHandler}
          closeModal={resetModalsHandler}
        />
      )}
      <header className={styles.header}>
        <h1>Японо кухня</h1>
        <HeaderButton onClickHanler={toggleModalHandler} />
      </header>

      <div className={styles.div_img}>
        <img src={asset} alt="sushi" className={styles['main-img']}></img>
      </div>
      {finished && <Success />}
    </>
  );
};
export default Header;
