import { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:5001/item");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchItems();
  }, []);

  return (
    <div className="itemContainer">
      {items.length > 0 ? (
        items.map((item) => (
          <div className="itemCard" key={item.id}>
            <h4>{item.name}</h4>
          </div>
        ))
      ) : (
        <p>Loading items...</p>
      )}
    </div>
  );
}
