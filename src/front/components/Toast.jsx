import React, { useEffect } from 'react';

export const Toast = ({ id, type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000); // Se cierra automáticamente después de 3 segundos

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '✓';
    }
  };

  const getStyles = () => {
    const baseStyles = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 20px',
      borderRadius: '8px',
      marginBottom: '12px',
      minWidth: '300px',
      maxWidth: '500px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      animation: 'slideIn 0.3s ease-out',
      fontWeight: '500',
      fontSize: '0.95rem',
    };

    const typeStyles = {
      success: {
        background: '#000',
        color: '#fff',
      },
      error: {
        background: '#dc3545',
        color: '#fff',
      },
      warning: {
        background: '#ffc107',
        color: '#000',
      },
      info: {
        background: '#0dcaf0',
        color: '#000',
      },
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  return (
    <div style={getStyles()}>
      <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        {getIcon()}
      </span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={() => onClose(id)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '0',
          marginLeft: '8px',
          opacity: 0.7,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.target.style.opacity = '1')}
        onMouseLeave={(e) => (e.target.style.opacity = '0.7')}
      >
        ✕
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;