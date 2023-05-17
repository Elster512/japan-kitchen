import ReactDom from 'react-dom';

import styles from './Modal.module.css';

const ModalCart = (props) => {
  return (
    <div className={styles.modalCart}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <ModalCart>{props.children}</ModalCart>,
        document.getElementById('modal')
      )}
    </>
  );
};
export default Modal;
