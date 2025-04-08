import { useState, useEffect, useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartContext } from "../components/CartProvider";

export function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    dietary: "",
    cultural: "",
    foodType: ""
  });

  const [dropdownValues, setDropdownValues] = useState({
    dietary: [],
    cultural: [],
    foodType: []
  });

  const { t } = useTranslation();
  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:5001/item");
        const data = await response.json();

        if (Array.isArray(data)) {
          setItems(data);
          setFilteredItems(data);

          const dietary = [...new Set(data.map(item => item.dietary_preferences).filter(Boolean))];
          const cultural = [...new Set(data.map(item => item.cultural_preferences).filter(Boolean))];
          const foodType = [...new Set(data.map(item => item.food_type).filter(Boolean))];

          setDropdownValues({ dietary, cultural, foodType });
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchItems();
  }, []);

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();

    const result = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(lowerCaseSearch);
      const matchesDietary = filters.dietary ? item.dietary_preferences === filters.dietary : true;
      const matchesCultural = filters.cultural ? item.cultural_preferences === filters.cultural : true;
      const matchesFoodType = filters.foodType ? item.food_type === filters.foodType : true;

      return matchesSearch && matchesDietary && matchesCultural && matchesFoodType;
    });

    setFilteredItems(result);
  }, [searchTerm, filters, items]);

  function handleFilterChange(type, value) {
    setFilters(prev => ({ ...prev, [type]: value }));
  }

  function resetFilters() {
    setSearchTerm("");
    setFilters({ dietary: "", cultural: "", foodType: "" });
  }

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

  return (
    <div className="home-container">
      {/* filters */}
      <aside className="sidebar">
        <h3>{t("filter")}</h3>

        <select onChange={(e) => handleFilterChange("dietary", e.target.value)} value={filters.dietary}>
          <option value="">{t("dietary")}</option>
          {dropdownValues.dietary.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select onChange={(e) => handleFilterChange("cultural", e.target.value)} value={filters.cultural}>
          <option value="">{t("cultural")}</option>
          {dropdownValues.cultural.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select onChange={(e) => handleFilterChange("foodType", e.target.value)} value={filters.foodType}>
          <option value="">{t("foodtype")}</option>
          {dropdownValues.foodType.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <button onClick={resetFilters} className="reset-btn"> {t("Undo Filters")}</button>
      </aside>

      {/* Main Content */}
      <div className="content">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder={t("searchBar")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">{t("search")}</button>
        </div>

        {/* Product Grid */}
        <div className="grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="card" key={item.id}>

                {/*image placeholder*/}
                <div className="image"></div>
                <img
                  src="https://blocks.astratic.com/img/general-img-square.png"
                  alt="Placeholder"
                  className="product-image"
                />
                <h4>{item.name}</h4>
                <Link to={`/details/${item.id}`}>
                  <button className="details-btn">{t("details")}</button>
                </Link>
                <button className="cart-btn" onClick={() => addItemToCart(item)}>🛒</button>
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

export default Home;
