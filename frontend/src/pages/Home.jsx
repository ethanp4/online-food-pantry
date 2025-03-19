import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export function Home() {
  const [items, setItems] = useState([]);  // display all items on database
  const [searchTerm, setSearchTerm] = useState("");  // filtering items with search bar
  const [filteredItems, setFilteredItems] = useState([]);  // displayed items once filtered in searchbar

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:5001/item");
        const data = await response.json();
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setItems(data);
          setFilteredItems(data); 
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchItems();
  }, []);

  // updatse filteredItems whenever searchTerm changes
  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseSearch)
      )
    );
  }, [searchTerm, items]);

  return (
    <div className="home-container">
      {/* Filter (DOES NOT WORK YET) */}
      <aside className="sidebar">
        <h3>Filter by</h3>
        <button>Dietary Preferences ⌄</button>
        <button>Cultural Preferences ⌄</button>
        <button>Food Type ⌄</button>
      </aside>

      {/* Main Content */}
      <div className="content">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>

        {/* Product Grid */}
        <div className="grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="card" key={item.id}>
                <div className="image"></div> {/* place holder */}
                 {/* image */}
                <img
                  src="https://blocks.astratic.com/img/general-img-square.png"
                  alt="Placeholder"
                  className="product-image"
                />
                <h4>{item.name}</h4>
                {/* details button */}
                <Link to={`/details/${item.id}`}>
                  <button className="details-btn">Details</button>
                </Link>
                {/* add to cart button (non functional) */}
                <button className="cart-btn">🛒</button>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}