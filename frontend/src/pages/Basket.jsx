import './Basket.css';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../components/CartProvider';

const Basket = () => {
  const { t, i18n } = useTranslation();
  const { cartItems = [], removeFromCart } = useContext(CartContext);  // Ensuring cartItems is always an array

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="basket-container">
      <header className="basket-header">
        <div className="basket-title">{t('basket.title')}</div>
        <div className="basket-buttons">
          <button onClick={handleLanguageToggle} className="lang-btn">{i18n.language === 'en' ? 'Français' : 'English'}</button>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="basket-items">
        {cartItems.length === 0 ? (
          <p>{t('basket.empty')}</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="basket-item" key={index}>
              <p>
                {item.name} - {t('quantity')}: {item.quantity}
              </p>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                {t('remove')}
              </button>
            </div>
          ))
        )}
      </div>

      <button className="checkout-btn">{t('basket.checkout')}</button>
    </div>
  );
};

export default Basket;
