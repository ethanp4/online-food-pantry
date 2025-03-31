import './OrderConfirmation.css';
import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginContext } from '../components/TokenProvider';

const OrderConfirmation = () => {
  const { t, i18n } = useTranslation();
  const { token } = useContext(LoginContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const [option, setOption] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleOptionClick = (selectedOption) => {
    setOption(selectedOption);
    setShowCalendar(selectedOption === 'pickup' || selectedOption === 'delivery');
  };

  const handleSubmitOrder = async () => {
    try {
      const response = await fetch('http://localhost:5001/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          type: option,
          date: date,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(t('order.success'));
      } else {
        setMessage(t('order.failed') + ': ' + data.message);
      }
    } catch (error) {
      setMessage(t('order.failed') + ': ' + error.message);
    }
  };

  return (
    <div className="order-confirmation-container">
      <header className="order-header">
        <div className="header-left">
          <button className="back-button" onClick={() => window.history.back()}>⬅️</button>
          <h1>{t('orderConfirmation')}</h1>
        </div>
        <div className="header-right">
          <button className="language-button" onClick={handleLanguageToggle}>
            {i18n.language === 'en' ? 'Français' : 'English'}
          </button>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      <div className="options">
        <button
          className={`order-btn ${option === 'checkout' ? 'active' : ''}`}
          onClick={() => handleOptionClick('checkout')}
        >
          {t('order.checkout')}
        </button>
        <button
          className={`order-btn ${option === 'pickup' ? 'active' : ''}`}
          onClick={() => handleOptionClick('pickup')}
        >
          {t('order.pickup')}
        </button>
        <button
          className={`order-btn ${option === 'delivery' ? 'active' : ''}`}
          onClick={() => handleOptionClick('delivery')}
        >
          {t('order.delivery')}
        </button>
      </div>

      {showCalendar && (
        <div className="calendar">
          <p>{t('order.selectDate')}</p>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      )}

      <button className="submit-order-btn" onClick={handleSubmitOrder}>
        {t('order.submit')}
      </button>

      {message && <p className="order-message">{message}</p>}
    </div>
  );
};

export default OrderConfirmation;
