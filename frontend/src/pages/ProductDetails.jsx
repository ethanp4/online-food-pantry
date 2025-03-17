import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

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
        const response = await fetch (`http:localhost:5173/api/item/${id}`);
        const data = await response.json();
        setItem(data);
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

    return(
        // <>
        //     <h1>Product name</h1>
        //     <h3>Quantity</h3>
        //     <p>Specifications</p>
        // </>

        //code currently isn't returning data... (03/17/25)
        <div>
            <h1>{item.name}</h1>
            <p>{item.count}</p>
        </div>
    )
}