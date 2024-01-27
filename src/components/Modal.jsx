import React from 'react';

const Modal = ({ imageUrl, onClose, onClick }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.target.classList.contains('Overlay')) {
      onClose();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal" onClick={onClick}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
