import React from 'react';
import './Styles.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Если модальное окно не открыто, ничего не рендерим

  // Обработчик для закрытия модального окна при клике на оверлей
  const handleOverlayClick = (e) => {
    // Закрываем, только если клик был непосредственно на оверлее, а не на содержимом модального окна
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Кнопка закрытия (крестик) */}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children} {/* Здесь будет наш SignInForm */}
      </div>
    </div>
  );
};

export default Modal;