import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import "./ProductDetails.css"

export function ProductDetails(){
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const navigate = useNavigate();

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
                <h1 style={errorTextStyling}>Item not found...</h1>
                <button onClick={() => navigate(`../`)}>Back</button>
            </div>
        )
    }

    //hypothetically checks if an item is in stock or not (unsure if it works as we dont have any out of stock dummy data)
    const getStockMessage = (item) => {
        if (item.count === 0) {
            return <p style={{ color: "red" }}>{item.name} is out of stock</p>;
        }
        return (
            <p>
                {/* if count=1, name will be singular, if more than 1, name will be plural */}
                In stock: {item.count} {item.count === 1 ? item.name : `${item.name}s`}
            </p>
        );
    };

    return(
        <div>
            <button onClick={() => navigate(`../`)}>Back</button>

            <div className="details-panel">
                <div className="item-image">
                    <img src="https://blocks.astratic.com/img/general-img-square.png" style={{height: "400px"}}/> {/* place holder */}
                </div>
                <div className="item-details">
                    <h1>{item.name}</h1>
                    <br />
                    <div className="specifications">
                        {getStockMessage(item)}
                        {/* dummy data for the specification/nutrition facts/description/whatever else idk */}
                        <h4><b>Calories</b> XXX cal</h4>
                        <p><b>Fat</b> XX g</p>
                        <p><b>Carbohydrate</b> XX g</p>
                        <p><b>Protein</b> XX g</p>
                        <p><b>Cholesterol</b> XX mg</p>
                        <p>Potassium XX mg</p>
                        <p>Calcium XX mg</p>
                        <p>Iron XX mg</p>
                        <p>Vitamin A XX mg</p>
                        <p>Vitamin C XX mg</p>
                        <hr />
                        <h4>Ingredients</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <button onClick={null}>Add To Cart</button> {/* no functionality yet */}
                </div>
            </div>
        </div>
        
    )
}