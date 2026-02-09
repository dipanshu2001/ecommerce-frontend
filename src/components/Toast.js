// src/components/Toast.js
import React, { useState, useEffect } from 'react';
import { toast } from '../utils/toast';
import './Toast.css';

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe(setToasts);
    return unsubscribe;
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((toastItem) => (
        <div
          key={toastItem.id}
          className={`toast toast-${toastItem.type}`}
          onClick={() => toast.remove(toastItem.id)}
        >
          <span className="toast-message">{toastItem.message}</span>
          <button className="toast-close" aria-label="Close">×</button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
