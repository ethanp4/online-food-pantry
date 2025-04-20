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
    dietary: -1,
    cultural: -1,
    foodType: -1
  });

  const [dropdownValues, setDropdownValues] = useState({
    dietary: [],
    cultural: [],
    foodType: []
  });

  const { t, i18n } = useTranslation();

  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:5001/item");
        const data = await response.json();

        if (Array.isArray(data)) {
          setItems(data);
          setFilteredItems(data);

          // const dietary = [...new Set(data.map(item => ({ id: item.dietary_preference_id, name_en: item.dietary_preference_en, name_fr: item.dietary_preference_fr })).filter(Boolean))];
          // const cultural = [...new Set(data.map(item => ({ id: item.cultural_preference_id, name_en: item.cultural_preference_en, name_fr: item.cultural_preference_fr })).filter(Boolean))];
          // const foodType = [...new Set(data.map(item => ({ id: item.food_type_id, name_en: item.food_type_en, name_fr: item.food_type_fr })).filter(Boolean))];

          const dietaryMap = new Map();
          data.forEach(item => {
            if (item.dietary_preference_id) {
              dietaryMap.set(item.dietary_preference_id, {
                id: item.dietary_preference_id,
                name_en: item.dietary_preference_en,
                name_fr: item.dietary_preference_fr
              });
            }
          });
          const dietary = Array.from(dietaryMap.values());
          const culturalMap = new Map();
          data.forEach(item => {
            if (item.cultural_preference_id) {
              culturalMap.set(item.cultural_preference_id, {
                id: item.cultural_preference_id,
                name_en: item.cultural_preference_en,
                name_fr: item.cultural_preference_fr
              });
            }
          });
          const cultural = Array.from(culturalMap.values());
          const foodTypeMap = new Map();
          data.forEach(item => {
            if (item.food_type_id) {
              foodTypeMap.set(item.food_type_id, {
                id: item.food_type_id,
                name_en: item.food_type_en,
                name_fr: item.food_type_fr
              });
            }
          });
          const foodType = Array.from(foodTypeMap.values());

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
      const matchesSearch = item[`name_${i18n.language}`].toLowerCase().includes(lowerCaseSearch);
      const matchesDietary = filters.dietary != -1 ? item.dietary_preference_id == filters.dietary : true;
      const matchesCultural = filters.cultural != -1 ? item.cultural_preference_id == filters.cultural : true;
      const matchesFoodType = filters.foodType != -1 ? item.food_type_id == filters.foodType : true;
      // console.log(filters.dietary)
      return matchesSearch && matchesDietary && matchesCultural && matchesFoodType;
    });

    setFilteredItems(result);
  }, [searchTerm, filters, items]);

  function handleFilterChange(type, value) {
    setFilters(prev => ({ ...prev, [type]: value }));
  }

  function resetFilters() {
    setSearchTerm("");
    setFilters({ dietary: -1, cultural: -1, foodType: -1 });
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
    alert(`${item[`name_${i18n.language}`]} has been added to your cart!`);
  }

  return (
    <div className="home-container">
      {/* filters */}
      <aside className="sidebar">
        <h3>{t("filter")}</h3>

        <select onChange={(e) => handleFilterChange("dietary", e.target.value)} value={filters.dietary}>
          <option value="-1">{t("dietary")}</option>
          {dropdownValues.dietary.map(option => (
            <option key={option.id} value={option.id}>{option[`name_${i18n.language}`]}</option>
          ))}
        </select>

        <select onChange={(e) => handleFilterChange("cultural", e.target.value)} value={filters.cultural}>
          <option value="-1">{t("cultural")}</option>
          {dropdownValues.cultural.map(option => (
            <option key={option.id} value={option.id}>{option[`name_${i18n.language}`]}</option>
          ))}
        </select>

        <select onChange={(e) => handleFilterChange("foodType", e.target.value)} value={filters.foodType}>
          <option value="-1">{t("foodtype")}</option>
          {dropdownValues.foodType.map(option => (
            <option key={option.id} value={option.id}>{option[`name_${i18n.language}`]}</option>
          ))}
        </select>

        <button onClick={resetFilters} className="reset-btn"> {t("buttons.undo")}</button>
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
                <h4>{item[`name_${i18n.language}`]}</h4>
                <Link to={`/details/${item.id}`}>
                  <button className="details-btn">{t("buttons.details")}</button>
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
