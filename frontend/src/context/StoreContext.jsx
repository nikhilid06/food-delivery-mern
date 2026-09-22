import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list as defaultFoodList } from "../assets/assets"; // Fallback static data

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // 1. Add to Cart with backend sync
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to sync cart add:", error);
      }
    }
  };

  // 2. Remove from Cart with backend sync
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      if (prev[itemId] === 1) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to sync cart remove:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => String(product._id || product.id) === String(item));
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // 3. Fetch Food List with Fallback
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      const listData = response.data?.data || response.data;
      
      // Agar backend se list empty ya null aaye, assets ka data use karein
      if (Array.isArray(listData) && listData.length > 0) {
        setFoodList(listData);
      } else {
        setFoodList(defaultFoodList);
      }
    } catch (error) {
      console.warn("Backend connect nahi hua, local assets use ho rahe hain:", error.message);
      setFoodList(defaultFoodList);
    }
  };

  // 4. Load Saved Cart
  const loadCartData = async (userToken) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: userToken } });
      if (response.data && response.data.success && response.data.cartData) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;