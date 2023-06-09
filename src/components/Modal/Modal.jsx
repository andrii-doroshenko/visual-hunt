import { useEffect } from 'react';
import PropTypes from 'prop-types';
import CSS from './Modal.module.css';

const Modal = ({ onClose, image, tags }) => {
  const onOverlayModalClose = e => {
    if (e.target !== e.currentTarget) {
      return;
    } else {
      onClose();
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const onHandleKeyDown = () => {
    window.addEventListener('keydown', handleKeyDown);
  };

  useEffect(() => {
    onHandleKeyDown();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className={CSS.overlay} onClick={onOverlayModalClose}>
      <div className={CSS.modal}>
        <img src={image} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
