//https://www.linguee.com/english-french/

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "./ProductDetails.css"
import { useTranslation } from "react-i18next";
import { CartContext } from "../components/CartProvider";

export function ProductDetails(){
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const navigate = useNavigate();
  
    const { t, i18n } = useTranslation(); //for translations
    const { cart, setCart } = useContext(CartContext)

    const errorTextStyling = {
        textAlign:"center",
        color:"#722549",
        padding: "20px",
        fontSize: "30px",
        fontWeight: "bold",
        fontStyle: "italic"
    };

    async function fetchItem() {
        const response = await fetch (`http://localhost:5001/item/${id}`);
        const data = await response.json();
        setItem(data["item"]);
    }

    useEffect(() => {
        fetchItem();
    }, [id]);

    if (!item) {
        return (
            <div>
                <h1 style={errorTextStyling}>{t("noItem")}</h1>
                <button onClick={() => navigate(`../`)}>{t("buttons.back")}</button>
            </div>
        )
    }

    //hypothetically checks if an item is in stock or not (unsure if it works as we dont have any out of stock dummy data)
    const getStockMessage = (item) => {
        if (item.count === 0) {
            return <p style={{ color: "red" }}>{item[`name_${i18n.language}`]} {t("outofStock")}</p>;
        }
        return (
            <p>
                {/* if count=1, name will be singular, if more than 1, name will be plural */}
                {t("inStock")}: {item.count} {item.count === 1 ? item[`name_${i18n.language}`] : `${item[`name_${i18n.language}`]}s`}
            </p>
        );
    };

    const addItemToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          setCart((prevCart) =>
            prevCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          );
        } else {
          setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
        }
        console.log("Updated cart:", cart);
        alert(`${item.name} has been added to your cart!`);
      }

    return(
        <div>
            <div className="details-panel">
                <div className="item-image">
                    <button onClick={() => navigate(`../`)} className="backBtn">{t("buttons.back")}</button>
                    <img src="https://blocks.astratic.com/img/general-img-square.png" style={{height: "350px"}}/> {/* place holder */}
                </div>
                <div className="item-details">
                    <h1>{item[`name_${i18n.language}`]}</h1>
                    <br />
                    <div className="specifications">
                        {getStockMessage(item)}
                    </div>
                    <button onClick={() => addItemToCart(item)} className="addToCart">{t("addToCart")}</button>
                </div>
            </div>
        </div>
        
    )
}
export default ProductDetails;