import React from 'react';

const Modal = ({ imageUrl, onClose }) => {
  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
