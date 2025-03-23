import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [url] = useState("https://ck-food-webapp-backend.onrender.com");
    const [token, setToken] = useState("");
    const [userRole, setUserRole] = useState(""); // Add user role state
    const [food_list, setFoodlist] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            updatedCart[itemId] = (updatedCart[itemId] || 0) + 1; // Increment item count
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            updatedCart[itemId] = Math.max(0, updatedCart[itemId] - 1); // Prevent negative count
            return updatedCart;
        });

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, item) => {
            const itemInfo = food_list.find((product) => product._id === item);
            return total + (itemInfo ? itemInfo.price * cartItems[item] : 0);
        }, 0);
    };

    const getTotalCartQuantity = () => {
        return Object.values(cartItems).reduce((total, count) => total + count, 0);
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodlist(response.data.data);
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.get(url + "/api/cart/get", { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    const resetCart = () => {
        console.log("Resetting cart...");
        setCartItems({});
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            const storedRole = localStorage.getItem("userRole");
            if (storedToken) {
                setToken(storedToken);
                setUserRole(storedRole || ""); // Set user role
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
        getTotalCartQuantity,
        resetCart,
        url,
        token,
        setToken,
        userRole, // Provide userRole in context
        setUserRole // Provide setUserRole in context
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;