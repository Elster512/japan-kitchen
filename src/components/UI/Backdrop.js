import ReactDom from 'react-dom';

import styles from './Modal.module.css';
const Backdrop = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <div className={styles.backdrop} onClick={props.closeModal}></div>,
        document.getElementById('modal')
      )}
    </>
  );
};
export default Backdrop;
