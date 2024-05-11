import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');
const documentHTML = document.getElementsByTagName('HTML')[0];

const Modal = ({ children, close }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    documentHTML.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', closeModal);
      documentHTML.style.overflow = null;
    };
  }, []);

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };
  return createPortal(
    <div onClick={closeModal} className={styles.overlay}>
      <div className={styles.modal}>
        {children}
        <button onClick={close} className={styles.closeButton} type="button"></button>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
